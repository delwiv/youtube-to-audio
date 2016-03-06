import Component from 'react-pure-render/component';
import React, { View, Text } from 'react-native';

// import PlaylistService from '../../services/playlists';
import InputText from '../../atoms/text-input';
import Button from '../../atoms/button';

export default class NewPlaylist extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createPlaylist(playlist) {
        return playlist;
    }
    handleChange(text) {
        this.setState({ newPlaylist: { name: text } });
    }
    handleClick() {
        if (!this.state.newPlaylist.name)
            return;
        this.props.addPlaylist(this.state.newPlaylist);
        this.setState({ newPlaylist: { name: '' } });
        this.refs.nameInput.reset();
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 4 }}>
                        <InputText ref="nameInput" placeholder={'Add a playlist'} onChange={this.handleChange} />
                    </View>
                    <View style={{ flex: 1 }}><Button onPress={this.handleClick} text="Go !"/></View>
                </View>
            </View>
        );
    }
}
