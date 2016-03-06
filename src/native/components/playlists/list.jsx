import { React, Component, PropTypes as T} from 'react';
// import mui, { Card, CardHeader, CardText, List, ListDivider, ListItem, ListNested } from 'material-ui';

import './list.scss';
import PlaylistService from '../../services/playlists';
// import TextInput from '../atoms/text-input'

let ThemeManager = new mui.Styles.ThemeManager();
// Each React component much inherits from React.component.
// It must ave a render method which returns some HTML
// You can include other React components inside render method.
class ListPlaylist extends React.Component {
    static get childContextTypes() {
        return { muiTheme: React.PropTypes.object };
    }
    constructor(props) {
        super(props);
        // this.addPlaylist = this.props.addPlaylist;
        this.state = {
            playlists: this.props.playlists
        };

        console.log(this.state);
        // this.handleClick = this.handleClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.textInput = new TextInput({
        //     placeholder: "New Playlist name..."
        // });
    }
    getChildContext() {
        return { muiTheme: ThemeManager.getCurrentTheme() };
    }
    // handleChange(event) {
    //     // this.setState({
    //     //     newPlaylist: event.target.value
    //     // });
    // }
    // handleClick(event) {
    //     // // console.log(this.textInput);
    //     // let playlist = PlaylistService.create(this.state.newPlaylist);
    //     // this.props.addPlaylist(playlist);
    // }
    render() {
        var playlists = [];

        this.state.playlists.forEach( playlist  => {
            playlists.push(
                <p>{{playlist}}</p>
            );
        });

        console.log(this.playlists);

        return (
            <div className="list-playlists">
                <Card initiallyExpanded={true}>
                    <CardHeader
                        title="Your playlists"
                        subtitle="Yeah, they're not saved when you reload... code it yourself if you're sad mofo !"
                        showExpandableButton={true}>
                    </CardHeader>
                    <CardText className="" expandable={true}>
                        <div className="playlists">
                            {this.playlists}
                        </div>
                        <div className="clear"></div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default ListPlaylist;
