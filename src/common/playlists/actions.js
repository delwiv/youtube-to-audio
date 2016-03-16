import { createAction } from 'redux-actions';
import shortid from 'shortid';
import { Map } from 'immutable';

export const addPlaylist = createAction('ADD_PLAYLIST', playlist => {
    console.log(fetch);
    // promise: fetch()
});
export const addItem = createAction('ADD_ITEM', params => ({
    id: params.id,
    item: {
        ...params.item,
        createdAt: new Date(),
        _id: shortid.generate()
    }
}));
export const selectPlaylist = createAction('SELECT_PLAYLIST');
