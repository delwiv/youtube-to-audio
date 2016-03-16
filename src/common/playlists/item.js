import { Record, Map } from 'immutable';
import _ from 'lodash';

const Item = Record({
    _id: '',
    name: '',
    url: '',
    videoId: '',
    title: '',
    starred: false,
    duration: 0,
    status: '',
    progress: 0,
    history: new Map(),
    createdAt: ''
});

export default Item;
