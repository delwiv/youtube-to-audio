import express from 'express';
import http from 'http';
import Server from 'socket.io';
import redis from 'redis';
import bluebird from 'bluebird';
import moment from 'moment';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


io.on('connection', socket => {
    console.log('new ws connection');
    let userId = null;
    socket.emit('who');
    socket.on('id', data => {
        userId = data.id;
        const key = `ws:${userId}`;
        const lastCallKey = `ws:lastcall:${userId}`;
        Promise.all([
            redisClient.setAsync(key, socket.id),
            redisClient.setAsync(lastCallKey, new Date())
        ]);
    });
    socket.on('disconnect', () => {
        redisClient.delAsync(`ws:${userId}`).then(() => redisClient.delAsync(`ws:lastcall:${userId}`));
    });
});

httpServer.listen(9994, () => {
    console.log('WebSocket server running on port 9994');
});

export const sendProgress = params => {
    const { userId, itemId, progress, playlistId, status } = params;
    const key = `ws:${userId}`;
    const lastCallKey = `ws:lastcall:${userId}`;
    Promise.all([
        redisClient.getAsync(key),
        redisClient.getAsync(lastCallKey)
    ])
    .then(result => {
        const socket = result[0];
        const lastCall = result[1];
        if (moment().isAfter(moment(new Date(lastCall)).add(1, 'second')) && !!socket) {
            console.log(`sending progress - ${status} - ${progress} - ${itemId}`);
            redisClient.setAsync(lastCallKey, new Date());
            io.sockets.sockets[socket].emit('progress', { itemId, progress, playlistId, status });
        }
    });
};
