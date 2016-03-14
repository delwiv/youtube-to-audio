import redis from 'redis';
import mongoose from 'mongoose';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';
import User from '../api/users/user';

const SEVEN_DAY_MIN = 10080;
const SEVEN_DAYS_SEC = SEVEN_DAY_MIN * 60;

const TokenSchema = mongoose.Schema({
    createdAt: Date,
    secret: String
});

TokenSchema.statics.getSecret = function() {
    return this.find().exec()
    .then(data => Promise.resolve(data[0].secret))
}

const Token = mongoose.model('Token', Token);

console.log('Search secret in Mongo...');
Token.find().exec().then(data => !data ? Token.create({ secret: shortid.generate() }) : Promise.resolve(data[0]))
    .then(token => console.log(`Token was created on ${token.createdAt}`));

const redisClient = redis.createClient();

export default function security(app) {
    if (!app.secret) {
        Token.getSecret.then(secret => {
            app.secret = secret;
        });
    }

    return (req, res, next) => {
        console.log(req.route, req.body.token);
        if (!req.body.token) {
            if (req.route === '/api/v1/touch') {
                User.createAnonymous().then(user => {
                    const token = jwt.sign({ email: 'anonymous', date: new Date() }, app.secret, {
                        expiresInMinutes: SEVEN_DAY_MIN
                    });
                    redisClient.hset(`token:${token}`, user._id);
                    redisClient.expire(`token:${token}`, SEVEN_DAYS_SEC);
                    return res.json({ token, user });
                });
            } else
                return res.status(401).end();
        } else {
            redisClient.get(`token:${req.token}`, (err, id) => {
                if (err)
                    console.log(err);
                if (!id)
                    return res.status(401).end();
                jwt.verify(req.token, app.secret, (errVerify, decoded) => {
                    if (errVerify)
                        return res.status(401).end();
                    return User.findById(id).exec()
                    .then(user => {
                        if (!user)
                            return res.status(404).end();
                        req.user = user;
                        redisClient.expire(`token:${req.token}`, SEVEN_DAYS_SEC);
                        return next();
                    });
                });
            });
        }
    };
}
