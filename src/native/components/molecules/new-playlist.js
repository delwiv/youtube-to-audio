import Component from 'react-pure-render/component';
import React, { View, PropTypes as T } from 'react-native';
import NewPlaylistMolecule from './playlists/new';
import * as actions from '../../../common/playlists/actions';
import { connect } from 'react-redux';

class NewPlaylist extends Component {
    static propTypes = {
        addPlaylist: T.func
    };
    constructor() {
        super();
        this.addPlaylist = this.addPlaylist.bind(this);
    }
    addPlaylist(playlist) {
        this.props.addPlaylist(playlist);
    }
    render() {
        console.log(this.state);
        console.log(this.props);
        return (
            <View>
                <NewPlaylistMolecule addPlaylist={this.addPlaylist} />
            </View>
        );
    }
}

export default connect(() => ({}), actions)(NewPlaylist);
