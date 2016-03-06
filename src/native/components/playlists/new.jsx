import React from 'react';
import mui, { TextField, Card, CardHeader, CardText, RaisedButton } from 'material-ui';

import './new.scss';
import PlaylistService from '../../services/playlists';
// import TextInput from '../atoms/text-input'

let ThemeManager = new mui.Styles.ThemeManager();
// Each React component much inherits from React.component.
// It must ave a render method which returns some HTML
// You can include other React components inside render method.
class NewPlaylist extends React.Component {
    static get childContextTypes() {
        return { muiTheme: React.PropTypes.object };
    }
    constructor(props) {
        super(props);
        // this.addPlaylist = this.props.addPlaylist;
        this.state = {
            value: '',
            playlists: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.textInput = new TextInput({
        //     placeholder: "New Playlist name..."
        // });
    }
    componentDidMount() {
        // this.setState({
        // });
    }
    getChildContext() {
        return { muiTheme: ThemeManager.getCurrentTheme() };
    }
    createPlaylist(playlist) {
        // return PlaylistService.create(playlist);
        return playlist;
    }
    handleChange(event) {
        this.setState({
            newPlaylist: event.target.value
        });
    }
    handleClick(event) {
        // console.log(this.textInput);
        let playlist = PlaylistService.create(this.state.newPlaylist);
        this.props.addPlaylist(playlist);
    }
    render() {
        return (
            <div className="new-playlist">
                <Card initiallyExpanded={true}>
                    <CardHeader
                        title="Add a playlist"
                        subtitle="Much wow !"
                        showExpandableButton={true}>
                    </CardHeader>
                    <CardText className="form input-group" expandable={true}>
                        <div className="textInput">
                            <TextField
                                floatingLabelText="UGFUDGUYFSYJCDUKCDUYVDUY"
                                onChange={this.handleChange}
                             />
                        </div>
                        <div className="input-group-btn">
                            <RaisedButton type="primary" onClick={this.handleClick}
                                label="Go !"/>
                        </div>
                        <div className="clear"></div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default NewPlaylist;
