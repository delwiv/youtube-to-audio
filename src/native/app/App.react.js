import Component from 'react-pure-render/component';
import Header from './Header.react';
import Menu from './Menu.react';
import React, { Navigator, PropTypes as T, View, ScrollView, AsyncStorage } from 'react-native';
import Drawer from 'react-native-drawer';
import linksMessages from '../../common/app/linksMessages';
import routes from '../routes';
import styles from './styles';
import start from '../../common/app/start';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import * as authActions from '../../common/auth/actions';
import * as playlistsActions from '../../common/playlists/actions';
import * as uiActions from '../../common/ui/actions';
// import ws from '../realtime/realtime';
import io from 'socket.io-client/socket.io';

class App extends Component {

    static propTypes = {
        device: T.object.isRequired,
        intl: intlShape.isRequired,
        ui: T.object.isRequired,
        user: T.object,
        touch: T.func,
        me: T.func,
        toggleSideMenu: T.func,
        onSideMenuChange: T.func,
        getPlaylists: T.func,
        setProgress: T.func
    };

    static configureScene(route) {
        return route.animationType || Navigator.SceneConfigs.FloatFromRight;
    }

    constructor(props) {
        super(props);
        this.onNavigatorRef = this.onNavigatorRef.bind(this);
        this.onRouteChange = this.onRouteChange.bind(this);
        this.onSideMenuChange = this.onSideMenuChange.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.refresh = this.refresh.bind(this);


        this.getToken().then(token => {
            this.refresh(token);
        });
    }

    componentDidMount() {
        this.drawer.open();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.ui.isSideMenuOpen && !nextProps.ui.isSideMenuOpen) {
            console.log('closing drawer');
            this.drawer.close();
        }
        else if (!this.props.ui.isSideMenuOpen && nextProps.ui.isSideMenuOpen)
            this.drawer.open();

        if (!nextProps.user) {
            this.rmToken().then(this.props.rmToken);
        } else if (!this.props.user) {
            this.saveToken(nextProps.user.token);
            this.props.getPlaylists({ token: nextProps.user.token });
            this.io = io('localhost:9994', { jsonp: false });
            this.io.on('who', () => {
                this.io.emit('id', { id: nextProps.user._id });
            });
            this.io.on('progress', p => {
                // console.log(p);
                this.props.setProgress(p);
            });
        }
    }

    onNavigatorRef(component) {
        this.navigator = component;
    }

    onRouteChange(route) {
        this.navigator.replace(routes[route]);
        this.props.toggleSideMenu();
    }

    onSideMenuChange(forceClose) {
        this.props.onSideMenuChange(forceClose);
    }

    closeDrawer() {
        this.drawer.close();
    }

    getTitle(route) {
        const { intl } = this.props;
        switch (route) {
        case routes.home:
            return intl.formatMessage(linksMessages.home);
        case routes.todos:
            return intl.formatMessage(linksMessages.todos);
        case routes.playlists:
            return intl.formatMessage(linksMessages.playlists);
        }
        throw new Error('Route not found.');
    }

    getToken() {
        return AsyncStorage.getItem('Y2M:TOKEN');
        // .then(token => {
        //     return Promise.resolve(token);
        // });
    }

    rmToken() {
        return AsyncStorage.removeItem('Y2M:TOKEN');
    }

    saveToken(token) {
        return AsyncStorage.setItem('Y2M:TOKEN', token);
    }

    refresh(token) {
        const savedToken = this.props.user ? this.props.user.token : null;
        if (savedToken)
            this.props.getPlaylists({ token: savedToken });
        else
            this.props.touch({ token: token || savedToken });
    }

    renderScene(route) {
        let { user } = this.props;
        if (!user)
            user = { name: '...' }
        return (
            <View style={[styles.sceneView, route.style]}>
                <Header
                    title={this.getTitle(route)}
                    refresh={this.refresh}
                    username={user.name}
                />
                <Drawer
                    type="static"
                    ref={ ref => this.drawer = ref }
                    content={<Menu onRouteChange={this.onRouteChange} />}
                    openDrawerOffset={ 0.55 }
                    styles={{ main: { shadowColor: '#000000', shadowOpacity: 0.4, shadowRadius: 3 } }}
                    tweenHandler={Drawer.tweenPresets.parallax}
                >
                    <ScrollView style={{ padding: 10, marginBottom: 5 }}>
                        <route.Page closeDrawer={this.closeDrawer} />
                    </ScrollView>
                </Drawer>
            </View>
        );
    }

    render() {
        return (
            <Navigator
                configureScene={App.configureScene}
                initialRoute={routes.playlists}
                ref={this.onNavigatorRef}
                renderScene={this.renderScene}
                style={styles.container}
            />
        );
    }

}

App = injectIntl(App);

App = connect(state => {
    return ({
        device: state.device,
        ui: state.ui,
        user: state.auth.user
    });
}, { ...authActions, ...playlistsActions, ...uiActions })(App);

export default start(App);
