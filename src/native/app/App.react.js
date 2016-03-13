import * as uiActions from '../../common/ui/actions';
import Component from 'react-pure-render/component';
import Header from './Header.react';
import Menu from './Menu.react';
import React, { Navigator, PropTypes, View, ScrollView } from 'react-native';
// import SideMenu from 'react-native-side-menu';
import Drawer from 'react-native-drawer'
import linksMessages from '../../common/app/linksMessages';
import routes from '../routes';
import styles from './styles';
import start from '../../common/app/start';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
// import Sidebar from 'react-sidebar';


class App extends Component {

    static propTypes = {
        device: PropTypes.object.isRequired,
        intl: intlShape.isRequired,
        onSideMenuChange: PropTypes.func.isRequired,
        toggleSideMenu: PropTypes.func.isRequired,
        ui: PropTypes.object.isRequired
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
    }
    componentDidMount() {
        // this.drawer.open();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.ui.isSideMenuOpen && !nextProps.ui.isSideMenuOpen)
            this.drawer.close();
        else if (!this.props.ui.isSideMenuOpen && nextProps.ui.isSideMenuOpen)
            this.drawer.open();
        console.log(nextProps.ui.isSideMenuOpen);
        console.log(this.drawer);
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

    renderScene(route) {
        const { toggleSideMenu, ui } = this.props;
        return (
            <View style={[styles.sceneView, route.style]}>
                <Header title={this.getTitle(route)} toggleSideMenu={toggleSideMenu}/>
                <Drawer
                    type="static"
                    ref={ ref => this.drawer = ref }
                    content={<Menu onRouteChange={this.onRouteChange} />}
                    openDrawerOffset={ 0.4 }
                    closedDrawerOffset={ 0.2 }
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

export default connect(state => ({device: state.device, ui: state.ui}), uiActions)(App);
