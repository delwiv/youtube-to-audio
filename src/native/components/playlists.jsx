import { React, Component } from 'react';
import NewPlaylist from './playlists/new';
import ListPlaylists from './playlists/list';


// Each React component much inherits from React.component.
// It must ave a render method which returns some HTML
// You can include other React components inside render method.
class Playlists extends Component {
    constructor() {
        super();
        this.state = {
            playlists: []
        };
        this.addPlaylist = this.addPlaylist.bind(this);
    }
    addPlaylist(playlist) {
        // console.log(playlist);
        this.state.playlists.push(playlist);
        this.setState({ playlists: this.state.playlists });
        // console.log(this.state);

    }
    render() {
        return (
            <div className="Playlists col-md-12">
                <div className="row">
                    <NewPlaylist addPlaylist={this.addPlaylist} />
                </div>
                <div className="row">
                    <ListPlaylists playlists={this.state.playlists} />
                </div>
            </div>
        );
    }
}

export default Playlists;
