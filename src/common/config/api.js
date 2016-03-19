import createFetch from '../createFetch';
// import _ from 'lodash';

const apiUrl = 'http://localhost:8000/api/v1';

const fetch = createFetch(apiUrl);

const serializeJSON = data => Object.keys(data)
    .map(keyName => `${encodeURIComponent(keyName)}=${encodeURIComponent(data[keyName])}`).join('&');

const makeCall = (route, params) => {
    const options = {
        headers: params.headers,
        method: params.method
    };
    if (params.method !== 'GET')
        options.body = JSON.stringify(params.params);

    console.log(`${params.method} ${route}`);
    // console.log(params);
    // console.log(options);
    return fetch(route, options);
};

const makeHeaders = token => {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };
    if (token) {
        headers.authorization = token;
    }
    return headers;
};

const handlePosts = (method, route, params = {}) => {
    const path = apiUrl + route;
    const headers = makeHeaders(params.token);
    return makeCall(path, { method, headers, params });
};

const api = {
    get: (route, params = {}) => {
        const path = apiUrl + route;
        const headers = makeHeaders(params.token);
        return makeCall(path, { method: 'GET', headers, params });
    },
    post: (route, params = {}) => handlePosts('POST', route, params),
    put: (route, params = {}) => handlePosts('PUT', route, params),
    delete: (route, params = {}) => handlePosts('DELETE', route, params)
};

export default api;

export const getToken = state => ({ token: state.auth.user ? state.auth.user.token : null });
