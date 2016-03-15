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


// import Sidebar from 'react-sidebar';


class App extends Component {

    static propTypes = {
        device: T.object.isRequired,
        intl: intlShape.isRequired,
        ui: T.object.isRequired,
        user: T.object
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

        // console.log('Calling api/v1/touch');
        // this._touchApi();
    }

    getToken() {
        return AsyncStorage.getItem('Y2M:TOKEN').then(token => {
            return Promise.resolve(token);
        });
    }



    componentWillReceiveProps(nextProps) {
        if (this.props.ui.isSideMenuOpen && !nextProps.ui.isSideMenuOpen)
            this.drawer.close();
        else if (!this.props.ui.isSideMenuOpen && nextProps.ui.isSideMenuOpen)
            this.drawer.open();

        if (!nextProps.user) {
            console.log('rm token !');
            this.rmToken().then(this.props.rmToken);
        }
        else if (!this.props.user && nextProps.user) {
            console.log('need to save token ');
            this.saveToken(nextProps.user.token);
        }
    }

    onNavigatorRef(component) {
        this.navigator = component;
    }

    onRouteChange(route) {
        this.navigator.replace(routes[route]);
        this.props.toggleSideMenu();
    }

    onSideMenuChange() {
        this.props.onSideMenuChange();
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

    rmToken() {
        return AsyncStorage.removeItem('Y2M:TOKEN');
    }

    saveToken(token) {
        return AsyncStorage.setItem('Y2M:TOKEN', token);
    }

    refresh(token) {
        this.props.touch(token || this.props.token);
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
                    closedDrawerOffset={ 0 }
                    styles={{ main: { shadowColor: '#000000', shadowOpacity: 0.4, shadowRadius: 3 } }}
                    tweenHandler={Drawer.tweenPresets.parallax}
                >
                    <ScrollView style={{ padding: 10, marginBottom: 5 }}>
                        <route.Page />
                    </ScrollView>
                </Drawer>
            </View>
        );
    }

    render() {

        return (
            <Navigator configureScene={App.configureScene}
                initialRoute={routes.playlists} ref={this.onNavigatorRef} renderScene={this.renderScene} style={styles.container} />
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
}, authActions)(App);

export default start(App);
