import { handleActions } from 'redux-actions';

export default handleActions({
    ADD_PLAYLIST: (state, action) => {
        console.log({ state, action });
        return {
            ...state,
            items: [...state.items, { ...action.payload, id: state.items.length + 1 }]
        };
    }
}, { items: [{ name: 'Add a new list !', id: 0 }] });
