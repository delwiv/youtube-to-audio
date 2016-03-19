// import { Playlist as IMPlaylist } from '../../../common/playlists/playlist';
import Playlist from './playlist';
// import { Item  as IMItem } from '../../../common/playlists/item';
import { Router as expressRouter } from 'express';

const router = expressRouter();

router.get('/:id', (req, res) => Playlist
    .findById(req.params.id)
    .populate('items')
    .exec()
    .then(playlist => playlist ?
        res.json(playlist) :
        res.status(404).end()));

router.get('/', (req, res, next) => req.user
    .populate('playlists')
    .execPopulate()
    .then(() => req.user
        .populate('items')
        .execPopulate()
        .then(() => res.json(req.user.playlists))
    ).catch(err => next(err)));

router.post('/', (req, res, next) => Playlist
        .create(req.body.playlist)
        .then(playlist => {
            const { user } = req;
            user.playlists.push(playlist);
            return user.save()
            .then(() => res.json(playlist));
        })
        .catch(err => next(err))
);

export default router;
