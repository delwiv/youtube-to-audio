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

router.post('/:id/items', (req, res, next) => {
    let item;
    return Playlist
    .findById(req.params.id)
    .exec()
    .then(playlist => !playlist ? res.status(404).end() :
        playlist.addItem(req.body.item))
        .then(result => {
            item = result[1];
            return result[0].populate('items').execPopulate();
        })
        .then(playlist => {
            res.json(playlist);
            return startDownload({ item, userId: req.body.userId, playlistId: playlist._id });
        })
    .catch(err => next(err));
});

export default router;
