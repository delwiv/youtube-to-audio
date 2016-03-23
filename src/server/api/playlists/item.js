import mongoose from 'mongoose';

const Item = mongoose.Schema({
    name: String,
    url: String,
    videoId: String,
    title: String,
    starred: {
        type: Boolean,
        default: false
    },
    duration: Number,
    status: String,
    progress: Number,
    history: {},
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    strict: true,
    collection: 'items'
});

export default mongoose.model('Item', Item);
