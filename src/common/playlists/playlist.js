import { Record, Map } from 'immutable';
import _ from 'lodash';
import Item from './item';

const Playlist = Record({
    _id: '',
    name: '',
    url: '',
    title: '',
    items: new Map(),
    status: '',
    progress: 0,
    createdAt: ''
});

export const getPlaylistsFromModel = playlists => {
    const result = new Map();
    _.forEach(playlists, pl => {
        const items = new Map();
        _.forEach(items, i => items.set(i._id, new Item(i)));

        result.set(pl._id, new Playlist({ ...pl, items }));

    });

    return result;
};

export default Playlist;
