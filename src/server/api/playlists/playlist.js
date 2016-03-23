import mongoose, { Schema } from 'mongoose';
import Item from './item';

const Playlist = new Schema({
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
}, {
    strict: true,
    collection: 'playlists'
});

Playlist.statics.create = function create(playlist) {
    const p = new this(playlist);
    return p.save();
};

Playlist.methods.addItem = function addItem(item) {
    const i = new Item(item);
    this.items.push(i);
    return Promise.all([this.save(), i.save()]);
};

export default mongoose.model('Playlist', Playlist);
