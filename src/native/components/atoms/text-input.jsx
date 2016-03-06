import { React, Component, PropTypes as T} from 'react';
// import mui, { TextField } from 'material-ui';
import TextInput from 'react-native';

import './text-input.scss';

// let ThemeManager = new mui.Styles.ThemeManager();
// Each React component much inherits from React.component.
// It must ave a render method which returns some HTML
// You can include other React components inside render method.
export default class InputText extends Component {
    // static get childContextTypes() {
    //     return { muiTheme: React.PropTypes.object };
    // }
    static propTypes = {
        placeholder: T.string,
        handleChange: T.func
    }

    constructor(props) {
        super(props);

        // let value = "";
        // let placeholder = this.props.placeholder;

        this.getValue = this.getValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // getChildContext() {
    //     return { muiTheme: ThemeManager.getCurrentTheme() };
    // }
    getValue() {
        return this.refs.textField.getValue();
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
        console.log(this.state);
    }
    componentDidMount() {
        console.log(this.props);

        this.setState({
            placeholder: this.props.placeholder
        });
    }
    render() {
        return (
            <div className="textInput">
                <TextInput
                    ref="textField"
                    placeholer={this.state.placeholder}
                    onChange={this.handleChange}
                 />
            </div>
        );
    }
}
