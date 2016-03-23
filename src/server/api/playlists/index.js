import Playlist from './playlist';
import { Router as expressRouter } from 'express';
import { startDownload } from '../../lib/video-manager';

const router = expressRouter();

router.get('/', (req, res, next) => {
    req.user
    .populate({
        path: 'playlists',
        populate: {
            path: 'items',
            model: 'Item'
        }
    })
    .execPopulate()
    .then(user => res.json(user.playlists))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => Playlist
        .create(req.body.playlist)
        .then(playlist => {
            const { user } = req;
            user.playlists.push(playlist);
            return user.save()
            .then(() => res.json(playlist));
        })
        .catch(err => next(err)));

router.get('/:id', (req, res) => Playlist
    .findById(req.params.id)
    .populate('items')
    .exec()
    .then(playlist => playlist ?
        res.json(playlist) :
        res.status(404).end()));

router.post('/:id/items', (req, res, next) => Playlist
    .findById(req.params.id)
    .exec()
    .then(playlist => playlist ?
        playlist.addItem(req.body.item) : res.status(404).end())
        .then(result => Promise.all([
            startDownload(result[1].url),
            result[1].populate('items').execPopulate()
        ]))
        .then(result => res.json(result[1]))
    .catch(err => next(err)));

export default router;
