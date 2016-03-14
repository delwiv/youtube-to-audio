import users from './users';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import playlists from './playlists';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', users);
app.use('/playlists', playlists);

app.on('mount', () => {
  console.log('Api is available at %s', app.mountpath);
});

export default app;
