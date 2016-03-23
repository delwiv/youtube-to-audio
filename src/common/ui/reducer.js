import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { Record } from 'immutable';

const InitialState = Record({
    isSideMenuOpen: false
});
const initialState = new InitialState;

export default handleActions({
    ON_SIDE_MENU_CHANGE: (state, action) => {
        const { isOpen } = action.payload;
        return state.set('isSideMenuOpen', isOpen);
    },
    TOGGLE_SIDE_MENU: (state) => state.update('isSideMenuOpen', isSideMenuOpen => !isSideMenuOpen),
    CLOSE_DRAWER: (state) => state.update('isSideMenuOpen', isSideMenuOpen => false)
}, initialState);

// export default function uiReducer(state = initialState, action) {
//     if (!(state instanceof InitialState)) return initialState;
//
//     switch (action.type) {
//
//     case actions.ON_SIDE_MENU_CHANGE: {
//         const { isOpen } = action.payload;
//         return state.set('isSideMenuOpen', isOpen);
//     }
//
//     case actions.TOGGLE_SIDE_MENU:
//         return state.update('isSideMenuOpen', isSideMenuOpen => !isSideMenuOpen);
//     }
//
//     return state;
// }
