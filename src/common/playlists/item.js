import { Record, Map, Range } from 'immutable';
import shortid from 'shortid';

const Item = Record({
    _id: shortid.generate(),
    name: '',
    url: '',
    videoId: '',
    title: '',
    starred: false,
    currentState: new Record({
        name: 'Pending...',
        createdAt: '',
        progress: 0,
        remaining: 'processing',
    }),
    history: {},
    createdAt: new Date()
});

export default Item;
