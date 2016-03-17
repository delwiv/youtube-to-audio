import { Playlist as IMPlaylist } from '../../../common/playlists/playlist';
import Playlist from './playlist';
// import { Item  as IMItem } from '../../../common/playlists/item';
import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => Playlist
    .findById(req.params.id)
    .populate('items')
    .exec()
    .then(playlist => playlist ?
        res.json(playlist) :
        res.status(404).end()));

router.post('/', (req, res, next) => Playlist
    .create(req.body.playlist)
    .then(playlist => res.json(playlist))
    .catch(err => next(err)));

export default router;
