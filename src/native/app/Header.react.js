import Component from 'react-pure-render/component';
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MKButton } from 'react-native-material-kit';

const { Image, PropTypes, StyleSheet, Text, TouchableOpacity, View } = React;

// MK.setTheme({
//   primaryColor: MKColor.Teal,
//   accentColor: MKColor.Purple,
// });
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#31AACC',
        borderBottomColor: '#73CEE7',
        borderBottomWidth: 2,
        height: 70,
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 30,
        position: 'relative'
    },
    header: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center',
        flex: 1
    }
});

export default class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        refresh: PropTypes.func,
        username: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.props.refresh();
    }

    render() {
        const { title, username } = this.props;

        const RefreshButton = MKButton.accentColoredFab().build();

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {username && <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'white', marginLeft: 15, fontSize: 10 }}>Logged in as</Text>
                        <Text style={{ color: 'white', marginLeft: 15 }}>{username}</Text>
                    </View>}
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.header}>{title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <RefreshButton
                        style={{
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            marginRight: 15,
                            width: 32,
                            height: 32,
                            alignItems: 'center'
                        }}
                        onPress={this.refresh}>
                        <Icon name="refresh" size={18} color="white" />
                    </RefreshButton>
                </View>
            </View>
        );
    }

}
