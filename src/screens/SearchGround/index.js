import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    ProgressBarAndroid,
    TouchableHighlight,
    StatusBar
    // TouchableOpacity
} from 'react-native';
import { Button, Grid, Carousel, SearchBar, WingBlank, WhiteSpace, SwipeAction, Checkbox } from 'antd-mobile-rn'
import ListItem from 'root/src/screens/baseComon/ListItem'
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import SearchLinputRbutton from 'root/src/screens/baseComon/SearchLinputRbutton.js';
import * as PestImageAction from 'root/src/actions/pestImage'
const CheckboxItem = Checkbox.CheckboxItem;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const { connect } = require('remx');
let pageIndex = 1;
@loadingDecorator @navigatorDecorator
class SearchGround extends Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            ground: null
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [{
                    ...confirmRightBtn, text: '确定'
                }]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed({ buttonId }) {
        if (!this.state.ground) {
            MyToast.info('请选择土壤！')
        }
        else {
            this.props.selectGround && this.props.selectGround(this.state.ground)
            this.pop()
        }

    }
    componentWillMount() {
        PestImageAction.SearchGround({ input: { name: '' } }).then((suc) => {
            this.setState({
                loading: false
            })
            if (suc.suc && suc.data && suc.data.length > 0) {
                this.setState({
                    groudList: suc.data
                })
            }
            else {
                MyToast.info('暂无数据！')
            }
        })
    }
    onChange = (e, value) => {
        if (e.target.checked) {
            this.setState({
                ground: value,
                groundId: value.id
            })
        }
        else {
            this.setState({
                ground: null,
                groundId: ''
            })
        }
    }
    _search = (val) => {
        this.setState({
            name: val
        }, () => {
            this.moreStoreListInst._onRefresh({ name: this.state.name });
        })
    }
    render() {
        let groudList = this.state.groudList ? this.state.groudList : []
        return (
            <View>
                <SearchLinputRbutton content={''} search={this._search} />
                <View style={{ height: SCREEN_HEIGHT - 150 }}>
                    <LoadMoreList
                        ref={ref => this.moreStoreListInst = ref}
                        getData={PestImageAction.SearchGround}
                        searchParams={{ name: this.state.name }}
                        rowItem={(data) => {

                            return <CheckboxItem key={data.name} checked={this.state.groundId == data.id ? true : false} onChange={(value) => this.onChange(value, data)}>
                                <ListItem firstItem={data.name} secondItem={data.localArea} />
                            </CheckboxItem>
                        }}
                    />
                </View>
            </View>
        );
    }
}
function mapStateToProps() {
    return {
    };
}

module.exports = connect(mapStateToProps)(SearchGround);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});