// @flow

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    ListView,
    Image,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    Platform,
    TouchableHighlight,
    FlatList,
    Animated
} from 'react-native';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class LoadMoreList extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.searchParams = this.props.searchParams;
        this.state = {
            data: [],
            footState: this.props.noAutoLoad ? 3 : 0, //0表示加载中，1表示没有更多，2表示一个都没有, 3表示未搜索
        }
    }
    componentDidMount() {
        if (!this.props.noAutoLoad) {
            this._onLoadMore();
        }
    }

    //Using ListView
    render() {
        return <AnimatedFlatList
            style={{ flex: 1, backgroundColor: 'white' }}
            horizontal={false}
            numColumns={this.props.colums ? this.props.colums : 1}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onEndReached={this._onLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={PageSize}
            onRefresh={this._onRefresh}
            refreshing={false}
            ListFooterComponent={this._footerComponent}
        />
    }

    _renderItem = ({ item }) => {
        return (
            this.props.rowItem(item)
        )
    }

    _separatorComponent = () => <View style={{ height: 0.3, backgroundColor: "#ccc", marginLeft: 16 }}></View>

    _footerComponent = () => {
        if (this.state.footState == 1)
            return <View style={{ justifyContent: 'center', alignItems: 'center', height: 30 }}><Text>没有更多数据</Text></View>
        else if (this.state.footState == 0)
            return <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30 }}>
                {this._renderActivityIndicator()}
                <Text>正在加载更多...</Text>
            </View>
        else if (this.state.footState == 2)
            return <View style={{ justifyContent: 'center', alignItems: 'center', height: 30 }}><Text>暂无数据</Text></View>
        else
            return <View style={{ justifyContent: 'center', alignItems: 'center', height: 30 }}><Text>请输入文字进行搜索</Text></View>
    }

    _keyExtractor = (item, index) => "" + index;

    _onRefresh = (searchParams) => {
        const self = this;
        //重置参数和状态
        this.pageIndex = 1;
        this.setState({
            footState: 0,
            data: []
        });
        if (searchParams)
            this.searchParams = searchParams;
        this.props.getData({ input: { pageIndex: this.pageIndex, pageSize: PageSize, ...this.searchParams } }).then(({ data, totalCount }) => {
            if (totalCount == 0 || data.length == 0 || !data) {
                self.setState({ footState: 2 })
            }
            else {
                //如果当前页获取数据总数大于等于totalCount，则不再loadMore
                if (self.pageIndex * PageSize >= totalCount)
                    self.setState({
                        footState: 1
                    })
                else
                    self.setState({
                        footState: 0
                    })
                this.pageIndex++;
                self.setState({
                    data: data,
                    footState: 0
                })
            }
        })
    }

    _onLoadMore = () => {
        if (this.state.footState == 3 || this.state.footState == 1)
            return;
        const self = this;
        this.props.getData({ input: { pageIndex: this.pageIndex, pageSize: PageSize, ...this.searchParams } }).then(({ data, totalCount }) => {
            if (totalCount == 0) {
                self.setState({ footState: 2 })
            }
            else if (data != null && data.length != 0) {
                //如果当前页获取数据总数大于等于totalCount，则不再loadMore
                if (self.pageIndex * PageSize >= totalCount)
                    self.setState({
                        footState: 1
                    })
                self.pageIndex++;
                let newDataList = self.state.data.concat(data)
                self.setState({
                    data: newDataList
                })
            }
            else {
                self.setState({
                    footState: 1
                })
            }
        })
    }

    _renderActivityIndicator() {
        return Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{ marginRight: 10, }}
                    color={'#999'}
                    styleAttr={'Small'} />

            ) : (
                <ActivityIndicatorIOS
                    style={{ marginRight: 10, }}
                    animating={true}
                    color={'#999'}
                    size={'small'} />
            )
    }
}
