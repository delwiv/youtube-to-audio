import Component from 'react-pure-render/component';
import React, { View, Text, PropTypes as T } from 'react-native';
import ListPlaylistMolecule from '../components/molecules/playlists/list';
import * as actions from '../../common/playlists/actions';
import { connect } from 'react-redux';

class ListPlaylists extends Component {
    static propTypes = {
        playlists: T.object,
        selectPlaylist: T.func
    };
    constructor() {
        super();
        this.selectPlaylist = this.selectPlaylist.bind(this);
        this.editPlaylist = this.editPlaylist.bind(this);
    }
    selectPlaylist(idPlaylist) {
        this.props.selectPlaylist(idPlaylist);
    }
    editPlaylist(idPlaylist) {
        console.log('you could edit ' + this.props.playlists[idPlaylist]);
    }
    render() {
        return (
            <View>
                <ListPlaylistMolecule
                    onLongClick={this.editPlaylist}
                    onClick={this.selectPlaylist}
                    playlists={this.props.playlists}
                />
            </View>
        );
    }
}

export default connect(state => {
    return { playlists: state.playlists.map };
}, actions)(ListPlaylists);
