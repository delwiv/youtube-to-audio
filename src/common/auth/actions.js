import { createAction } from 'redux-actions';
import { ValidationError } from '../lib/validation';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const touch = createAction('AUTH::TOUCH', token => {
    return ({ fetch }) => {
        const getPromise = async() => {
            const response = await fetch('/api/v1/touch', {
                method: 'GET'
            });
            console.log(response);
        }
    }
});

export function login(fields) {
    return ({ fetch, validate }) => {
        const getPromise = async() => {
            try {
                await validate(fields).prop('email').required().email().prop('password').required().simplePassword().promise;
                // Sure we can use smarter api than raw fetch.
                const response = await fetch('/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fields)
                });
                if (response.status !== 200)
                    throw response;

                // Return JSON response.
                console.log(response.json());
                return response.json();
            } catch (error) {
                // Transform error status to custom error.
                if (error.status === 401) {
                    throw new ValidationError('wrongPassword', {prop: 'password'});
                }
                throw error;
            }
        };

        return {
            type: 'LOGIN',
            payload: {
                promise: getPromise()
            }
        };
    };
}

export function logout() {
    return ({firebase}) => {
        firebase.unauth();
        return {type: LOGOUT};
    };
}
