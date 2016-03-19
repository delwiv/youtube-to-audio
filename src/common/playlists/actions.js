import { createAction } from 'redux-actions';
import shortid from 'shortid';
import api from '../config/api';

export const addPlaylist = createAction('ADD_PLAYLIST', payload => ({ promise: api.post('/playlists', payload) }));

export const getPlaylists = createAction('GET_PLAYLISTS', payload => ({ promise: api.get('/playlists', payload) }));

export const addItem = createAction('ADD_ITEM', params => ({
    id: params.id,
    item: {
        ...params.item,
        createdAt: new Date(),
        _id: shortid.generate()
    }
}));
export const selectPlaylist = createAction('SELECT_PLAYLIST');
