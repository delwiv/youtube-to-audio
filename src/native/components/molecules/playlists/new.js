import Component from 'react-pure-render/component';
import React, { View, Text, PropTypes as T } from 'react-native';

// import PlaylistService from '../../services/playlists';
import InputText from '../../atoms/text-input';
import { MKTextField, MKButton } from 'react-native-material-kit';

// import Button from '../../atoms/button';

const AddButton = MKButton.coloredFlatButton()
    .withText('+')
    .withTextStyle({
        fontSize: 14
    })
    .build();

const PlaylistTextField = MKTextField.textfieldWithFloatingLabel()
    .withStyle({
        height: 38,
        marginTop: 10,
    })
    .withPlaceholder('Add a playlist')
    .build();

export default class NewPlaylistMolecule extends Component {
    static propTypes = {
        addPlaylist: T.func
    };
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
                    <View style={{ flex: 5 }}>
                        <PlaylistTextField ref="nameInput" onTextChange={this.handleChange} />
                    </View>
                    <View style={{ flex: 2 }}><AddButton onPress={this.handleClick} /></View>
                </View>
            </View>
        );
    }
}
