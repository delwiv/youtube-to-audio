import {
    handleActions
} from 'redux-actions';
import _ from 'lodash';

export default handleActions({
    ADD_PLAYLIST: (state, action) => {
        const newId = _.size(state.playlists);
        return {
            ...state,
            playlists: {
                ...state.playlists,
                [newId]: {...action.payload,
                    id: newId,
                    items: {}
                }
            }
        };
    },
    SELECT_PLAYLIST: (state, action) => {
        return {
            ...state,
            selected: action.payload
        };
    },
    ADD_ITEM: (state, action) => {
        const {
            id,
            item
        } = action.payload;
        const selected = state.playlists[id];
        const newId = _.size(selected.items);
        item.id = newId;

        return {
            ...state,
            playlists: {
                ...state.playlists,
                [id]: {
                    ...selected,
                    items: {
                        ...selected.items,
                        [newId]: { ...item }
                    }
                }
            }
        };
    },
    SELECT_ITEM: (state, action) => {
        return {
            ...state,
            selectedItem: action.payload
        };
    }
}, {
    playlists: {
        0: {
            name: 'Add a new list !',
            id: 0,
            items: {}
        }
    },
    selected: 0
});
