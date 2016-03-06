import Component from 'react-pure-render/component';
import React, { View, Text, PropTypes as T } from 'react-native';
import NewPlaylist from './playlists/new';
import ListPlaylist from './playlists/list';
import * as actions from '../../../common/playlists/actions';
import { connect } from 'react-redux';

class Playlists extends Component {
    static propTypes = {
        playlists: T.array,
        addPlaylist: T.func,
        selectPlaylist: T.func
    };
    constructor() {
        super();
        this.addPlaylist = this.addPlaylist.bind(this);
    }
    addPlaylist(playlist) {
        this.props.addPlaylist(playlist);
    }
    render() {
        return (
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Text style={{ textAlign: 'center', fontSize: 32, padding: 15 }}>Your playlists</Text>
                <NewPlaylist addPlaylist={this.addPlaylist} />
                <ListPlaylist playlists={this.props.playlists} />
            </View>
        );
    }
}

export default connect(state => ({ playlists: state.playlists.items }), actions)(Playlists);
