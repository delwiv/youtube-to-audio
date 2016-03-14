import Component from 'react-pure-render/component';
import React, { View, PropTypes as T } from 'react-native';
// import addItem from '../../../../common/playlists/actions';
import InputText from '../components/atoms/text-input';
import Button from '../components/atoms/button';
import { connect } from 'react-redux';
import validator from 'validator';

const validatorOptions = {
    protocols: ['http', 'https'],
    host_whitelist: ['youtube.com', 'youtu.be']
};

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
        this.props.addItem(newItem);
        this.setState({ url: '' });
        this.refs.nameInput.reset();
    }
    render() {
        const { validated } = this.state;
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 3 }}>
                        <InputText ref="nameInput" placeholder={'Add an item'} onChange={this.handleChange} />
                    </View>
                    <View style={{ flex: 1 }}>{validated && <Button onPress={this.handleClick} text="GO"/>}</View>
                </View>
            </View>
        );
    }
}

export default NewItem;
// export default connect(() => ({}), actions)(NewItem);
