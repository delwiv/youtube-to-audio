import redis from 'redis';
import mongoose from 'mongoose';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';
import User from '../api/users/user';

const SEVEN_DAYS = 604800;

const TokenSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    secret: String
});

TokenSchema.statics.getSecret = function() {
    return this.find().exec()
    .then(data => Promise.resolve(data[0].secret))
}

const Token = mongoose.model('Token', TokenSchema);

Token.find().exec().then(data => !data.length ? Token.create({ secret: shortid.generate() }) : Promise.resolve(data[0]))
    .then(token => console.log(`Token was created on ${token.createdAt}`));

const redisClient = redis.createClient();

export default function security(app) {
    if (!app.secret) {
        Token.getSecret().then(secret => {
            app.secret = secret;
        });
    }

    return (req, res, next) => {
        console.log('');
        console.log(`${req.path} -- ${new Date()}`);
        if (!req.headers || !req.headers.authorization) {
            if (req.path === '/api/v1/touch') {
                User.createAnonymous().then(user => {
                    const token = jwt.sign({ email: 'anonymous', date: new Date() }, app.secret, {
                        expiresIn: SEVEN_DAYS
                    });
                    const key = `token:${token}`;
                    const userId = JSON.stringify(user._id);
                    console.log('saving token in redis...');
                    redisClient.set(key, userId, () => {
                        redisClient.expire(key, SEVEN_DAYS, () => {
                            res.json({ token, user });
                        });
                    });
                });
            } else {
                return res.status(401).end();
            }
        } else {
            const token = req.token = req.headers.authorization;
            redisClient.get(`token:${req.token}`, (err, id) => {
                if (!id) {
                    console.log('id not found in redis : ' + req.token);
                    return res.status(401).end();
                }
                jwt.verify(req.token, app.secret, (errVerify, decoded) => {
                    if (errVerify) {
                        console.log('token failed to verify with jwt ' + errVerify);
                        return res.status(401).end();
                    }
                    return User.findById(JSON.parse(id)).exec()
                    .then(user => {
                        console.log('user found: ' + user.name + ' ' + user._id);
                        req.user = user;
                        redisClient.expire(`token:${req.token}`, SEVEN_DAYS, () => {
                            if (req.path === '/api/v1/touch')
                                return res.json({ token, user });
                            return next();
                        });
                    });
                });
            });
        }
    };
}
