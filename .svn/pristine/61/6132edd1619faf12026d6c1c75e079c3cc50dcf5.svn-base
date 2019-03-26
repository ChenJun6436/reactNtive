// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { List, InputItem, Button, SwipeAction, Checkbox } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import DiagnosisList from 'root/src/screens/baseComon/DiagnosisList';
import CropStore from 'root/src/stores/crop';
import * as DiagnosisAction from 'root/src/actions/diagnosis';
import SearchLinputRbutton from 'root/src/screens/baseComon/SearchLinputRbutton.js';
const { connect } = require('remx');
const CheckboxItem = Checkbox.CheckboxItem;
const SCREEN_HEIGHT = Dimensions.get('window').height;
@navigatorDecorator

//用药记录——病虫害选择组件
class ERPDiaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: this.props.crop,
            search: ''
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    confirmRightBtn
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed({ buttonId }) {
        if (!this.state.crop) {
            MyToast.info('请选择作物！')
        }
        else {
            this.props.changeCropData && this.props.changeCropData(this.state.crop, this.props.index)
            this.pop();
        }

    }

    refresh = () => {
        this.moreListInst._onRefresh();
    }
    onChange = (e, value) => {
        this.setState({
            crop: value
        })
    }
    _search = (val) => {
        this.setState({
            search: val
        },() => {
            console.log(this.state.search)
            this.moreListInst._onRefresh({ search: this.state.search });
        })
    }
    render() {
        return (
            <View>
                <SearchLinputRbutton content={''} search={ this._search } />
                <View style={{ height: SCREEN_HEIGHT - 150 }}>
                    <LoadMoreList
                        ref={ref => this.moreListInst = ref}
                        getData={DiagnosisAction.GetPlantPest}
                        searchParams={{ classificCode: this.state.classificCode, search: this.state.search }}
                        rowItem={(data) => {
                            return <CheckboxItem key={data.crop} checked={this.state.crop == data.nameCn} onChange={(e) => this.onChange(e, data.nameCn)}>
                                {data.nameCn}
                            </CheckboxItem>
                        }}
                    />
                </View>
            </View>
        );
    }
}
function mapStateToProps() {

}
module.exports = connect(mapStateToProps)(ERPDiaList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
