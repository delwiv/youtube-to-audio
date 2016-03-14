import express from 'express';
import User from './user';
import bcrypt from 'bcrypt';

const router = express.Router();

// Promise.promisifyAll(bcrypt);

router.post('/login', (req, res) => {
    User.login(req.body)
        .then(user => {
            req.session.user = user;
            // console.log(req.session);
            return res.json(user)
        })
        .catch(err => res.status(401).json(err.message));
});

router.post('/logout', (req, res) => {
    delete req.session.user;
    return res.status(203).end();
});

router.post('/me', (req, res) => {
    // console.log(req.session);
    if (req.session.user)
        return res.json(req.session.user);
    return res.status(401).end();
})


router.post('/encrypt', (req, res, next) => {
    bcrypt.genSaltAsync(10, Promise.resolve)
        .then((err, salt) => bcrypt.hashAsync(req.body.pw, salt))
        .then(hash => res.json({
            password: hash
        }))
        .catch(err => next(err));
});

export default router;
