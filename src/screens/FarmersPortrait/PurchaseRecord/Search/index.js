import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button } from 'antd-mobile-rn';
import * as AccountAction from 'root/src/actions/account';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
let now = moment();
const edate = now.format(dateFormat);
const sdate = now.format("YYYY-MM") + "-01";
const Item = List.Item;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CustomChildren = (props: any) => (
    <TouchableOpacity onPress={props.onClick}>
        <View
            style={{ height: 36, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
        >
            <Text style={{ flex: 1 }}>{props.children}</Text>
            <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</Text>
        </View>
    </TouchableOpacity>
);
export default class SearchStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areasData: '',
            startTime: sdate,
            endTime: edate,
        }

    }
    componentWillMount() {
        const areasData = getAreas()
        this.setState({ areasData })
    }
    handleStartTimeChange = (value) => {
        this.setState({
            startTime: moment(value).format('YYYY-MM-DD'),
        })
    }
    handleEndTimeChange = (value) => {
        this.setState({
            endTime: moment(value).format('YYYY-MM-DD'),
        })
    }
    getStoreByMember = () => {
        let item = {
            storeName: this.state.storeName,
            startTime: this.state.legalPersonName,
            endTime: this.state.endTime,
        };
        this.props.getStoreByMember && this.props.getStoreByMember(item)
    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                animationType={"fade"}
                hardwareAccelerated={true}
                transparent={true}
                onRequestClose={this.props.onRequestClose ? this.props.onRequestClose : this.props.handleCancel}
            >
                <View style={styles.confirm}>
                    <View style={styles.box}>
                        <List>
                            <InputItem
                                textAlign="right"
                                clear
                                onChangeText={text => this.setState({ storeName: text })}
                                placeholder="农资店名称"
                                value={this.state.storeName}
                                labelNumber={9}
                            >农资店名称
                        </InputItem>
                            <DatePicker
                                value={new Date(this.state.startTime)}
                                mode="date"
                                onChange={this.handleStartTimeChange}
                                format="YYYY-MM-DD"
                            >
                                <Item arrow="horizontal" >开始时间</Item>
                            </DatePicker>
                            <DatePicker
                                value={new Date(this.state.endTime)}
                                mode="date"
                                onChange={this.handleEndTimeChange}
                                format="YYYY-MM-DD"
                            >
                                <Item arrow="horizontal" >结束时间</Item>
                            </DatePicker>
                        </List>
                        <View style={styles.foot}>
                            <TouchableOpacity activeOpacity={0.3} underlayColor={'#eee'}
                                onPress={this.props.handleCancel}>
                                <Text style={[styles.btn, { borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: 'black' }]} >{this.props.cancelText ? this.props.cancelText : '取消'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.3} underlayColor={'#eee'}
                                onPress={this.getStoreByMember}>
                                <Text style={styles.btn}>{this.props.okText ? this.props.okText : '确定'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        );
    }
}

const styles = StyleSheet.create({
    confirm: {
        position: 'absolute',
        backgroundColor: 'rgba(141,141,141,0.5)',
        top: 100,
        padding: 15,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
        // width: SCREEN_WIDTH,
        // backgroundColor: 'white',
        // borderRadius: 5
    },
    box: {
        width: SCREEN_WIDTH * 0.9,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
    },
    title: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        // fontSize: 16
    },
    content: {
        minHeight: 80
    },
    foot: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'black',
        flexDirection: 'row',
    },
    btn: {
        fontSize: 16,
        width: SCREEN_WIDTH * 0.5,
        textAlign: 'center',
        lineHeight: 40
    }
});
