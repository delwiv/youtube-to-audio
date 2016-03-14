import mongoose, { Schema } from 'mongoose';

const Hash = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hash: String
}, {
    collection: 'hashes',
    strict: true
});

export default mongoose.model('Hash', Hash);
