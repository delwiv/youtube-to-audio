import Component from 'react-pure-render/component';
import React, { View, Text, ScrollView, Dimensions, PropTypes as T } from 'react-native';
// import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
// import * as actions from '../../common/playlists/actions';
// import { connect } from 'react-redux';
import { Bar } from 'react-native-progress';
import { getTheme } from 'react-native-material-kit';

const { cardStyle } = getTheme().cardStyle;
console.log(cardStyle);
// cardStyle.margin = 5;
// cardStyle.backgroundColor = '#d9d9d9';

class ItemCard extends Component {
    static propTypes = {
        item: T.object
    };
    render() {
        const { item } = this.props;
        const winWidth = Dimensions.get('window').width;
        const statusWidth = winWidth * 0.5;
        return (
            <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#f8f8f8', borderColor: '#d5d5d5' }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderBottomColor: '#73CEE7',
                    paddingTop: 5 }}
                >
                    <View style={{ flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        paddingBottom: 10
                    }}
                    >
                        <ScrollView horizontal >
                            <Text>{item.name}</Text>
                        </ScrollView>
                        {/* <Image style={{ flex: 1 }} ></Image>*/}
                        <View>
                            <Icon name="star" size={24} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 80, paddingTop: 10 }}>
                        {/* <Image style={{ flex: 1 }} />*/}
                        <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 5 }} />
                        <View style={{ flex: 2, flexDirection: 'column', paddingLeft: 5, width: statusWidth }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Text>{100}%</Text>
                                <Bar progress={item.progress} indeterminate={item.progress === 0} width={statusWidth} />
                            </View>
                            <View style={{ flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5
                             }}
                            >
                                <Text style={{ color: 'black' }}>{item.status}</Text>
                            </View>
                            <View style={{ flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'nowrap',
                                marginTop: 5
                             }}
                            >
                                <Text>{moment(item.duration * 1000).format('mm:ss')}</Text>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                    <Icon size={24} style={{ marginLeft: 5 }} name="ban" />
                                    <Icon size={24} style={{ marginLeft: 5 }} name="times" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class ListItems extends Component {
    static propTypes = {
        items: T.object,
        selectItem: T.func
    };
    render() {
        return (
            <View>
                {this.props.items && this.props.items.length > 0 && this.props.items.toList().map((item, key) => <ItemCard item={item} key={key} />)}
            </View>
        );
    }
}

export default ListItems;
