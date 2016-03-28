import { handleActions } from 'redux-actions';
// import Item from './item';
import Playlist, { getPlaylistsFromModel } from './playlist';
import { Record, Map } from 'immutable';
// import shortid from 'shortid';

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
        const json = JSON.parse(action.payload._bodyText);
        const playlists = getPlaylistsFromModel(json);
        return state
            .update('map', map => map.merge(playlists));
    },
    SELECT_PLAYLIST: (state, action) => state.set('selected', action.payload),
    ADD_ITEM_SUCCESS: (state, action) => {
        // console.log(JSON.parse(action.payload._bodyText));
        const playlist = getPlaylistsFromModel(JSON.parse(action.payload._bodyText));
        return state
            .update('map', map => map.merge(playlist));
    },
    SELECT_ITEM: (state, action) => {
        return {
            ...state,
            selectedItem: action.payload
        };
    },
    SET_PROGRESS: (state, action) => {
        const { playlistId, itemId, progress, status } = action.payload;
        const progressItem = state.map.get(playlistId).items.get(itemId)
            .set('progress', parseInt(progress, 10))
            .set('status', status);
        return state.update('map', map => map
            .update(playlistId, pl => pl
                .update('items', items => items.set(itemId, progressItem))
        ));
    }
}, initialState);
