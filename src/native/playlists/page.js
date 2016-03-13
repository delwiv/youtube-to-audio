import Component from 'react-pure-render/component';
// import Header from './Header.react';
// import PlaylistDetails from '../components/molecules/playlist-details';
import * as actions from '../../common/playlists/actions';
import React, { View, Text, PropTypes as T } from 'react-native';
import appStyles from '../app/styles';
import { connect } from 'react-redux';
import _ from 'lodash';
import NewItem from '../components/molecules/items/new-item';
import ListItems from '../components/molecules/items/list-items';


export default class Page extends Component {
    static propTypes = {
        playlist: T.object,
        addItem: T.func
    };
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
    }
    addItem(item) {
        const id = this.props.playlist.id;
        this.props.addItem({ id, item });
    }
    render() {
        const { playlist } = this.props;
        return (
            <View style={[appStyles.container]}>
                <Text>{playlist.name}</Text>
                <NewItem addItem={this.addItem}/>
                {playlist.items && <ListItems items={playlist.items} />}
            </View>
        );
    }

}

export default connect(state => {
    return { playlist: state.playlists.playlists[state.playlists.selected] };
 }, actions)(Page);


// Truly universal (not only isomorphic) data fetching.
// One higher order component for browser, server, and mobile.
// Page = fetch(fetchUserTodos)(Page);
