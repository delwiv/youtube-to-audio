import Home from './home/Page.react';
import Intl from './intl/Page.react';
import Todos from './todos/Page.react';
import Playlists from './playlists/page';

export default {
    home: {
        Page: Home
    },
    todos: {
        Page: Todos
    },
    playlists: {
        Page: Playlists
    },
    intl: {
      Page: Intl
    }
};
