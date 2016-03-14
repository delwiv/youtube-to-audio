import api from './api';
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
const mongoose = require('mongoose');

const app = express();
const initDB = () => new Promise((resolve) => {
    const mongo = config.mongo;
    const conString = `mongodb://${mongo.host}:${mongo.port}/${mongo.db}`;

    console.log(conString);
    mongoose.connect(conString, () => {
        console.log(`Connection to ${conString} successful`);
        return resolve();
    });
});

app.use('/api/v1', api);
app.use(frontend);
app.use(errorHandler);

initDB().then(() => {
    app.listen(config.port, () => {
        console.log('Server started at port %d', config.port);
    });
});
