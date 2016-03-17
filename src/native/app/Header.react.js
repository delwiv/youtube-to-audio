import Component from 'react-pure-render/component';
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {
    Image,
    PropTypes,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} = React;

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
    // menuIcon: {
    //     backgroundColor: 'transparent',
    //     height: 24,
    //     width: 24
    // },
    // menuLink: {
    //     backgroundColor: 'transparent',
    //     height: 44,
    //     left: 8,
    //     opacity: 0.9,
    //     padding: 10,
    //     position: 'absolute',
    //     top: 25,
    //     width: 44
    // }
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
                    <Icon style={{ alignSelf: 'flex-end', marginRight: 15 }} name="refresh" size={24} color="white" onPress={this.refresh} />
                </View>
            </View>
        );
    }

}
