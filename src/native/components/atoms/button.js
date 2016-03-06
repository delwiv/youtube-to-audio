import Component from 'react-pure-render/component';
import React, { TouchableHighlight, Text, View, StyleSheet, PropTypes as T } from 'react-native';

// import './text-input.scss';
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#73CEE7',
        height: 32,
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
export default class Button extends Component {
    static propTypes = {
        text: T.string,
        onPress: T.func
    };

    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(event) {
        event.stopPropagation();
        this.props.onPress();
    }

    render() {
        //  style={{ backgoundColor: 'blue', color: 'white' }}
        return (
            <View style={styles.button}>
                <TouchableHighlight onPress={this.handlePress}
                >
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
