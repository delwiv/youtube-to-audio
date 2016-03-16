import * as actions from './actions';
import { Record, Map } from 'immutable';
// import { firebaseActions } from '../lib/redux-firebase';
import { handleActions } from 'redux-actions';
import getUserFromModel from './user';

const InitialState = Record({
    formDisabled: false,
    formError: null,
    user: null
});
const initialState = new InitialState;

export default handleActions({
    AUTH_SET_TOKEN: (state, action) => {
        console.log(state);
        return state.update('user', user => user.set('token', action.payload));
    },
    AUTH_RM_TOKEN: (state) => state.delete('user'),
    AUTH_TOUCH_ERROR: (state) => state.delete('user'),
    AUTH_TOUCH_SUCCESS: (state, action) => {
        const { status } = action.payload;
        console.log(status);
        if (status === 401) {
            console.log('delete token');
            return state.delete('token');
        }
        if (status !== 200) {
            return state;
        }
        const { user, token } = JSON.parse(action.payload._bodyText);
        const record = getUserFromModel({ ...user, token });
        return state.set('user', record);
    }
}, initialState);
// export default function authReducer(state = initialState, action) {
//   if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
//
//   switch (action.type) {
//
//     // Note how one reducer can handle several actions.
//     case actions.LOGIN_START:
//     case firebaseActions.REDUX_FIREBASE_LOGIN_START:
//     case firebaseActions.REDUX_FIREBASE_RESET_PASSWORD_START:
//     case firebaseActions.REDUX_FIREBASE_SIGN_UP_START:
//       return state.set('formDisabled', true);
//
//     case actions.LOGIN_ERROR:
//     case firebaseActions.REDUX_FIREBASE_LOGIN_ERROR:
//     case firebaseActions.REDUX_FIREBASE_RESET_PASSWORD_ERROR:
//     case firebaseActions.REDUX_FIREBASE_SIGN_UP_ERROR:
//       return state.merge({ formDisabled: false, formError: action.payload });
//
//     case actions.LOGIN_SUCCESS:
//     case firebaseActions.REDUX_FIREBASE_LOGIN_SUCCESS:
//     case firebaseActions.REDUX_FIREBASE_RESET_PASSWORD_SUCCESS:
//     case firebaseActions.REDUX_FIREBASE_SIGN_UP_SUCCESS:
//       return state.merge({ formDisabled: false, formError: null });
//
//   }
//
//   return state;
// }
