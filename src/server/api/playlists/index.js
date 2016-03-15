import { Playlist as IMPlaylist } from '../../../common/playlists/playlist';
import Playlist from './playlist';
// import { Item  as IMItem } from '../../../common/playlists/item';
import express from 'express';

const router = express.Router();

router.get('/:id', (req, res, next) => Playlist
    .findById(req.params.id)
    .populate('items')
    .exec()
    .then(playlist => playlist ?
        res.json(playlist) :
        res.status(404).end()));

export default router;
