import { Record, Map } from 'immutable';
import _ from 'lodash';

const User = Record({
    email: '',
    name: '',
    token: '',
    playlists: new Map(),
    createdAt: '',
    anonymous: true
});

export const getFromModel = model => {
    const playlists = new Map();
    _.forEach(model.playlists, p => {
        playlists.set(p._id, p);
    });
    return new User({
        email: model.email,
        name: model.name,
        token: model.token,
        playlists: Map(model.playlists),
        createdAt: model.createdAt,
        anonymous: model.anonymous
    });
};

export default User;
