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
    let result = new Map();
    playlists.forEach(pl => {
        const items = new Map();
        pl.items.forEach(i => items.set(i._id, new Item(i)));
        const p = new Playlist({ ...pl, items });
        result = result.set(p._id, p);

    });
    return result;
};

export default Playlist;
