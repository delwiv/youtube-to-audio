import Component from 'react-pure-render/component';
import Header from './Header.react';
import Playlists from '../components/molecules/playlists';
import React, { View } from 'react-native';
import appStyles from '../app/styles';

export default class Page extends Component {
    render() {
        return (
            <View style={[appStyles.container]}>
                <Header />
                <Playlists />
            </View>
        );
    }

}

// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
// Page = fetch(fetchUserTodos)(Page);
