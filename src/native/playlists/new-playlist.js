import Component from 'react-pure-render/component';
import React, { View, PropTypes as T } from 'react-native';
import NewPlaylistMolecule from '../components/molecules/playlists/new';
import * as actions from '../../common/playlists/actions';
import { connect } from 'react-redux';
import { getToken } from '../../common/config/api';

class NewPlaylist extends Component {
    static propTypes = {
        addPlaylist: T.func,
        token: T.string
    };
    constructor() {
        super();
        this.addPlaylist = this.addPlaylist.bind(this);
    }
    addPlaylist(playlist) {
        this.props.addPlaylist({ playlist, token: this.props.token });
    }
    render() {
        return (
            <View>
                <NewPlaylistMolecule addPlaylist={this.addPlaylist} />
            </View>
        );
    }
}

export default connect(getToken, actions)(NewPlaylist);
