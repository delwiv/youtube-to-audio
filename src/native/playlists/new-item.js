import Component from 'react-pure-render/component';
import React, { View, PropTypes as T } from 'react-native';
import InputText from '../components/atoms/text-input';
import Button from '../components/atoms/button';
import { connect } from 'react-redux';
import validator from 'validator';
import { MKButton, MKTextField } from 'react-native-material-kit';

const validatorOptions = {
    protocols: ['http', 'https'],
    host_whitelist: ['youtube.com', 'youtu.be']
};

const AddButton = MKButton.coloredButton()
    .withText('Go !')
    .build();

const ItemTextField = MKTextField.textfield()
    .withStyle({
        height: 38,
        marginTop: 10,
    })
    .withPlaceholder('Add an item')
    .withOnSubmitEditing(() => console.log('Submit!'))
    .build();

class NewItem extends Component {
    static propTypes = {
        addItem: T.func
    };
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = { validated: true };
    }
    handleChange(text) {
        this.setState({ url: text });
        // if (validator.isURL(text.toLowerCase(), validatorOptions))
        //     this.setState({ validated: true });
        // else
        //     this.setState({ validated: false });


    }
    handleClick() {
        if (!this.state.url)
            return;
        const newItem = {
            url: this.state.url,
            name: this.state.url,
            duration: Math.random() * (500 - 100) + 100,
            progress: 0,
            status: 'Pending...'
        }
        this.setState({ url: '' });
        this.props.addItem(newItem);
    }
    render() {
        const { validated, url } = this.state;
        return (
            <View>
                <View onPress={this.props.onPress}>
                    <View>
                        <ItemTextField text={url} onChangeText={this.handleChange} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            {validated &&
                                <AddButton
                                    style={{
                                        justifyContent: 'center',
                                        height: 32,
                                        margin: 5,
                                        alignItems: 'center'
                                    }}
                                    onPress={this.handleClick}
                                />
                            }
                        </View>
                        <View style={{ flex: 3 }} />
                    </View>
                </View>
            </View>
        );
    }
}

export default NewItem;
// export default connect(() => ({}), actions)(NewItem);
