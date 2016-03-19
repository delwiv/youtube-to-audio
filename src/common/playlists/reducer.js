import { handleActions } from 'redux-actions';
// import Item from './item';
import Playlist, { getPlaylistsFromModel } from './playlist';
import { Record, Map } from 'immutable';
// import shortid from 'shortid';

// const initialItem = new Item({
//     name: 'Example item',
//     createdAt: new Date(),
//     _id: shortid.generate(),
//     status: 'Downloading...',
//     progress: 0.53,
//     duration: 222
// });
//
// const initialPlaylist = new Playlist({
//     name: 'Default playlist',
//     createdAt: new Date(),
//     _id: shortid.generate(),
//     items: new Map().set(initialItem._id, initialItem)
// });

const InitialState = Record({
    map: new Map(),
    selected: null
});

const initialState = new InitialState;

const revive = ({ map }) => initialState.merge({
    map: new Map(map).map(playlist => new Playlist(playlist))
});

export default handleActions({
    ADD_PLAYLIST_SUCCESS: (state, action) => {
        const playlist = new Playlist(JSON.parse(action.payload._bodyText));
        // console.log(playlist);
        return state
            .update('map', map => map.set(playlist._id, playlist));
    },
    GET_PLAYLISTS_SUCCESS: (state, action) => {
        // console.log(JSON.parse(action.payload._bodyText));
        const playlists = getPlaylistsFromModel(JSON.parse(action.payload._bodyText));
        return state
            .update('map', map => map.merge(playlists));
    },
    SELECT_PLAYLIST: (state, action) => {
        return state.set('selected', action.payload);
    },
    ADD_ITEM: (state, action) => {
        const { id, item } = action.payload;
        return state
            .update('map', map => map
            .update(id, playlist => playlist
            .update('items', i => i.set(item._id, item))
        ));
    },
    SELECT_ITEM: (state, action) => {
        return {
            ...state,
            selectedItem: action.payload
        };
    }
}, initialState);
