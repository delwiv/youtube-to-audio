import Component from 'react-pure-render/component';
import React, { View, Text, ListView, PropTypes as T } from 'react-native';
import _ from 'lodash';
// import PlaylistService from '../../services/playlists';
class RowPlaylist extends Component {
    static propTypes = {
        id: T.number,
        name: T.string
    };
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 32, borderBottomColor: '#505050', borderBottomWidth: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text>{this.props.id}</Text>
                </View>
                <View style={{ flex: 11 }}>
                    <Text>{this.props.name}</Text>
                </View>

            </View>
        );
    }
}

class ListPlaylist extends Component {
    static propTypes = {
        playlists: T.array
    };
    constructor(props) {
        super(props);
        this.state = {
            playlists: this.props.playlists
        };
        this.getDataSource = this.getDataSource.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }
    componentWillReceiveProps(props) {
        if (_.difference(props.playlists, this.state.playlists).length)
            this.setState({ playlists: props.playlists });
    }
    getDataSource() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(this.state.playlists);
    }
    renderRow(data) {
        return <RowPlaylist {...data} />;
    }
    // handleClick() {
    //     // // console.log(this.textInput);
    //     // let playlist = PlaylistService.create(this.state.newPlaylist);
    //     this.props.addPlaylist(playlist);
    // }
    render() {
        const dataSource = this.getDataSource();
        console.log(dataSource);
        return (
            <View>
                {/* <Text>Yeah, they're not saved when you reload... code it yourself if you're sad mofo !</Text>*/}
                <ListView
                  dataSource={dataSource}
                  renderRow={this.renderRow}
                />
            </View>
        );
    }
}

export default ListPlaylist;
