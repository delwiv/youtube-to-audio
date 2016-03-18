import Component from 'react-pure-render/component';
import React, { Dimensions } from 'react-native';
import linksMessages from '../../common/app/linksMessages';
import {injectIntl, intlShape} from 'react-intl';
import NewPlaylist from '../playlists/new-playlist';
import ListPlaylists from '../playlists/list-playlists';
import { TextField } from 'react-native-material-kit';

const { PropTypes, ScrollView, StyleSheet, Text, View } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        height: window.height
    },
    menu: {
        // position: 'absolute',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    item: {
        fontSize: 16,
        padding: 10,
        color: '#fff'
    },
    header: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10
    }
});

class Menu extends Component {

    static propTypes = {
        intl: intlShape.isRequired,
        onRouteChange: PropTypes.func.isRequired
    };

    render() {
        const {intl, onRouteChange} = this.props;

        return (
            <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={styles.menu} style={styles.container}>
                <View>
                    <NewPlaylist />
                    <ListPlaylists />
                </View>
            </ScrollView>
        );
    }

}

export default injectIntl(Menu);
