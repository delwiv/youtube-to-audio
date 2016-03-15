import mongoose from 'mongoose';

const Item = mongoose.Schema({
    name: String,
    url: String,
    videoId: String,
    title: String,
    starred: Boolean,
    duration: Number,
    status: String,
    progress: Number,
    history: {},
    createdAt: Date
});

mongoose.mondel('Item', Item);
