import Component from 'react-pure-render/component';
// import Header from './Header.react';
// import PlaylistDetails from '../components/molecules/playlist-details';
import * as actions from '../../common/playlists/actions';
import React, { View, Text, PropTypes as T } from 'react-native';
import appStyles from '../app/styles';
import { connect } from 'react-redux';
import _ from 'lodash';
import NewItem from './new-item';
import ListItems from './list-items';


export default class Page extends Component {
    static propTypes = {
        playlist: T.object,
        addItem: T.func,
        token: T.string
    };
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
    }
    addItem(item) {
        const id = this.props.playlist._id;
        const { token } = this.props;
        this.props.addItem({ token, id, item });
    }
    render() {
        const { playlist } = this.props;
        return (
            <View style={[appStyles.container]}>
                {playlist && <View>
                    <Text>{playlist.name}</Text>
                    <NewItem addItem={this.addItem} onPress={this.props.closeDrawer} />
                    {playlist.items && <ListItems items={playlist.items} />}
                </View>}
            </View>
        );
    }

}

export default connect(state => ({
    playlist: state.playlists.map.get(state.playlists.selected),
    token: state.auth.user ? state.auth.user.token : ''
}), actions)(Page);


// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
// Page = fetch(fetchUserTodos)(Page);
