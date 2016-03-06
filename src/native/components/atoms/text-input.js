import Component from 'react-pure-render/component';
import React, { TextInput, View, StyleSheet, PropTypes as T } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#73CEE7',
    borderBottomWidth: 1,
    height: 32
  },
  input: {
    // color: '#fff',
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  }
});
export default class InputText extends Component {
    // static get childContextTypes() {
    //     return { muiTheme: React.PropTypes.object };
    // }
    static propTypes = {
        placeholder: T.string,
        onChange: T.func
    };

    constructor(props) {
        super(props);

        this.state = { placeholer: props.placeholder, value: '' };

        this.getValue = this.getValue.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    getValue() {
        return this.state.value;
    }
    reset() {
        this.setState({ value: '' });
    }
    onChange(value) {
        this.setState({ value });
        this.props.onChange(value);
    }
    render() {
        const { placeholder } = this.props;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    ref="textField"
                    value={this.state.value}
                    onChangeText={this.onChange}
                    placeholder={placeholder}
                 />
            </View>
        );
    }
}
