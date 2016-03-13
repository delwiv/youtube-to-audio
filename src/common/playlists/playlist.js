import { Record, Map } from 'immutable';

const Playlist = Record({
    _id: '',
    name: '',
    url: '',
    title: '',
    items: {},
    createdAt: ''
});

export default Playlist;
