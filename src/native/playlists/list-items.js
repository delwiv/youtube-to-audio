import Component from 'react-pure-render/component';
import React, { View, Text, ListView, ScrollView, TouchableHighlight, Dimensions, PropTypes as T } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actions from '../../common/playlists/actions';
import { connect } from 'react-redux';
import { Bar } from 'react-native-progress';

class RowItem extends Component {
    static propTypes = {
        item: T.object
    };
    render() {
        const { item } = this.props;
        const winWidth = Dimensions.get('window').width;
        const statusWidth = winWidth * 0.62;
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderBottomColor: '#73CEE7',
                paddingTop: 5 }} >
                <View style={{ flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    paddingBottom: 5
                }} >
                    <ScrollView horizontal >
                        <Text>{item.name}</Text>
                    </ScrollView>
                    {/* <Image style={{ flex: 1 }} ></Image>*/}
                    <View>
                        <Icon name="star" />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 80, paddingTop: 10 }}>
                    {/* <Image style={{ flex: 1 }} />*/}
                    <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 5 }} />
                    <View style={{ flex: 2, flexDirection: 'column', paddingLeft: 5, width: statusWidth }}>
                        <View>
                            <Bar progress={item.progress} indeterminate={item.progress === 0} width={statusWidth} />
                        </View>
                        <View style={{ flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5
                         }}
                        >
                            <Text style={{ color: 'black' }}>{item.status}</Text>
                            <Text>{item.progress * 100}%</Text>
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
        );
    }
}

class ListItems extends Component {
    static propTypes = {
        items: T.object,
        selectItem: T.func
    };
    constructor(props) {
        super(props);

        this.getDataSource = this.getDataSource.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(id) {
        // if (id !== undefined)
        //     this.props.selectItem(id);
    }
    getDataSource() {
        const items = [];
        this.props.items.map(i => {
            const value = {
                createdAt: i.createdAt,
                duration: i.duration,
                id: i._id,
                name: i.name,
                progress: i.progress,
                status: i.status,
                url: i.url
            };
            items.push(value);
        });
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(items);
    }
    renderRow(item) {
        return (
            <View>
                <RowItem item={item} onClick={this.onClick} />
            </View>
        );
    }
    render() {
        const dataSource = this.getDataSource();
        return (
            <ListView
                style={{ backgroundColor: 'white', flex: 1 }}
                dataSource={dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

export default ListItems;
