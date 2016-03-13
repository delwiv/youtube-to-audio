import Component from 'react-pure-render/component';
import React, { View, Text, ListView, TouchableHighlight, PropTypes as T } from 'react-native';
import _ from 'lodash';
// import PlaylistService from '../../services/playlists';
class RowPlaylist extends Component {
    static propTypes = {
        id: T.number,
        name: T.string,
        items: T.object
    };
    render() {
        let size = _.size(this.props.items);
        if (size > 1)
            size += ' items';
        else
            size += ' item';

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#73CEE7', borderBottomWidth: 1, padding: 5 }}>
                <View>
                    <Text>{this.props.name}</Text>
                </View>
                <View style={{ right: 0, alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontSize: 10 }}>{size}</Text>
                </View>
            </View>
        );
    }
}

class ListPlaylistMolecule extends Component {
    static propTypes = {
        playlists: T.object,
        onClick: T.func
    };
    constructor(props) {
        super(props);
        this.state = {
            playlists: this.props.playlists
        };
        this.getDataSource = this.getDataSource.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(props) {
        if (_.size(props.playlists) !== _.size(this.state.playlists))
            this.setState({ playlists: props.playlists });
    }
    onClick(id) {
        if (id !== undefined)
            this.props.onClick(id);
    }
    getDataSource() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(this.state.playlists);
    }
    renderRow(playlist) {
        return (
            <TouchableHighlight underlayColor="#73CEE7" onPress={ this.onClick.bind(this, playlist.id) }>
                <View>
                    <RowPlaylist {...playlist} onClick={this.onClick} />
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        const dataSource = this.getDataSource();
        return (
            <View>
                <Text style={{ color: 'gray', paddingTop: 15, paddingBottom: 15 }}>Your playlists</Text>
                <ListView
                    style={{ backgroundColor: 'white' }}
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

export default ListPlaylistMolecule;
