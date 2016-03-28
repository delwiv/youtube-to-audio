import { Record, Map } from 'immutable';
import { getPlaylistsFromModel } from '../playlists/playlist';

const User = Record({
    _id: '',
    email: '',
    name: '',
    token: '',
    playlists: new Map(),
    createdAt: '',
    anonymous: true
});

export const getRecordFromModel = model => {
    return new User({
        _id: model._id,
        email: model.email,
        name: model.name,
        token: model.token,
        playlists: getPlaylistsFromModel(model.playlists),
        createdAt: model.createdAt,
        anonymous: model.anonymous
    });
};

export default User;
