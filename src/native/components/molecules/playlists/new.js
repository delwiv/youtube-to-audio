import Component from 'react-pure-render/component';
import React, { View, Text, PropTypes as T } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import PlaylistService from '../../services/playlists';
// import InputText from '../../atoms/text-input';
import { MKTextField, MKButton } from 'react-native-material-kit';

// import Button from '../../atoms/button';

const AddButton = MKButton.plainFab()
    .build();

const PlaylistTextField = MKTextField.textfield()
    .withStyle({
        height: 28,
        marginTop: 10,
    })
    .withPlaceholder('Add a playlist')
    .withOnSubmitEditing(() => console.log('Submit!'))
    .build();

export default class NewPlaylistMolecule extends Component {
    static propTypes = {
        addPlaylist: T.func
    };
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.updateText = this.updateText.bind(this);

        this.state = { name: '' };
    }

    updateText(name) {
        this.setState({ name })
    }
    handleClick() {
        const { name } = this.state;
        if (!name)
            return;
        this.props.addPlaylist({ name });
        this.setState({ name: '' });
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <View style={{ flex: 4 }}>
                        <PlaylistTextField value={this.state.name} onTextChange={this.updateText} ref="nameInput" />
                    </View>
                    <View style={{ flex: 1 }}>
                    <AddButton
                        style={{
                            justifyContent: 'center',
                            width: 32,
                            alignSelf: 'flex-end',
                            height: 32,
                            alignItems: 'center'
                        }}
                        onPress={this.handleClick} >
                        <Icon name="plus" size={18} color="white" />
                    </AddButton></View>
                </View>
            </View>
        );
    }
}
