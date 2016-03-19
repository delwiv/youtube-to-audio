import { createAction } from 'redux-actions';
import api from '../config/api';

export const touch = createAction('AUTH_TOUCH', payload => ({ promise: api.get('/touch', payload) }));
export const me = createAction('AUTH_ME', payload => ({ promise: api.get('/users/me', payload) }));

// export const setToken = createAction('AUTH_SET_TOKEN');
export const rmToken = createAction('AUTH_RM_TOKEN');

// export function login(fields) {
//     return ({ fetch, validate }) => {
//         const getPromise = async() => {
//             try {
//                 await validate(fields).prop('email').required().email().prop('password').required().simplePassword().promise;
//                 // Sure we can use smarter api than raw fetch.
//                 const response = await fetch('/api/v1/auth/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(fields)
//                 });
//                 if (response.status !== 200)
//                     throw response;
//
//                 // Return JSON response.
//                 console.log(response.json());
//                 return response.json();
//             } catch (error) {
//                 // Transform error status to custom error.
//                 if (error.status === 401) {
//                     throw new ValidationError('wrongPassword', { prop: 'password' });
//                 }
//                 throw error;
//             }
//         };
//
//         return {
//             type: 'LOGIN',
//             payload: {
//                 promise: getPromise()
//             }
//         };
//     };
// }

// export function logout() {
//     return ({firebase}) => {
//         firebase.unauth();
//         return {type: LOGOUT};
//     };
// }
