import mongoose, { Schema } from 'mongoose';
// import Item from './item';

const Playlist = mongoose.Schema({
    name: String,
    url: String,
    title: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    status: String,
    progress: Number,
    createdAt: Date
});

export default mongoose.model('Playlist', Playlist);
