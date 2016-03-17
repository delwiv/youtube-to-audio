import mongoose, { Schema } from 'mongoose';
import Hash from './hash';
import bcrypt from 'bcrypt';
// import Promise from 'bluebird';

// Promise.promisifyAll(bcrypt);

const User = mongoose.Schema({
    email: String,
    name: String,
    playlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    anonymous: Boolean
});

User.statics.login = function(creds) {
    // console.log(creds);
    const { email, password } = creds;
    let user = null;
    return new Promise((resolve, reject) => !email || !password ?
        reject(new Error('missing_creds')) :
        this.findOne({ email }).exec()
        .then(found => {
            if (!found)
                return reject(new Error(`user_not_found: ${email}`));
            user = found;
            return Hash.findOne({ user: user._id }).exec();
        })
        .then(hash => bcrypt.compare(password, hash.hash, Promise.resolve))
        .then((err, success) => resolve({ ...user.toObject(), loginStatus: success })));
};

User.statics.createAnonymous = function() {
    const user = new this({
        name: 'Anonymous',
        createdAt: new Date(),
        anonymous: true
    });

    return user.save();
};



export default mongoose.model('User', User);
