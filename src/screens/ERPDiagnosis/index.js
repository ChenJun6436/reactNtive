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
import { List, InputItem, Button, SwipeAction } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import DiagnosisList from 'root/src/screens/baseComon/DiagnosisList';
import CropStore from 'root/src/stores/crop';
import * as DiagnosisAction from 'root/src/actions/diagnosis';
const { connect } = require('remx');
@navigatorDecorator

//病虫害页面
class ERPDiagnosis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: '',
            classificCode: '',
            search: ''
        }
        if (!this.props.isSelect) {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    rightButtons: [
                        {
                            ...confirmRightBtn, text: '查询'
                        }
                    ]
                }
            });
        };
        Navigation.events().registerComponentDidAppearListener(({ componentId, componentName }) => {
            if (componentId == this.props.componentId) {
                //每次到这个页面都清除下作物和用药组合
                this.refresh();
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed({ buttonId }) {
        this.pushPage({
            component: {
                ...Global.Screens.ERPDiaDetailSearch,
                passProps: { searchFn: this.searchFn },
            }
        });
    }

    refresh = () => {
        this.moreListInst._onRefresh();
    }
    searchFn = (item) => {
        this.setState({
            classificCode: item.classificCode,
            search: item.search
        }, this.refresh)
    }
    render() {
        return (
            // <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10, }}>
                <LoadMoreList
                    colums={2}
                    ref={ref => this.moreListInst = ref}
                    getData={this.state.search ? DiagnosisAction.GetPlantPest : DiagnosisAction.GetPlantByLivingMatter}
                    searchParams={{ classificCode: this.state.classificCode, search: this.state.search }}
                    rowItem={(data) => {
                        return <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                            style={{ backgroundColor: 'transparent', flex: 1 }}
                            onPress={() => {
                                if (this.props.isSelect) {
                                    if (this.props.isSolo) {
                                        CropStore.setCropData([data.nameCn])
                                        CropStore.setPestData(null)
                                        this.pop()
                                    } else {
                                        let isNew = true
                                        this.nowSelect = this.props.cropData ? this.props.cropData : []
                                        this.nowSelect.map((i, index) => {
                                            if (i == data.nameCn) {
                                                isNew = false
                                                this.nowSelect.splice(index, 1)
                                            }
                                        })
                                        if (isNew) {
                                            this.nowSelect.push(data.nameCn)
                                        }
                                        this.props.fresh && this.props.fresh()
                                        CropStore.setCropData(this.nowSelect)
                                    }
                                } else {
                                    this.pushPage({
                                        component: {
                                            passProps: { cropName: data.nameCn },
                                            ...Global.Screens.ERPDiagnosisDetail,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: data.nameCn
                                                    }
                                                },
                                                bottomTabs: {
                                                    visible: false,
                                                    drawBehind: true
                                                }
                                            },
                                        }
                                    });
                                }
                            }}>
                            <DiagnosisList content={data} />
                        </TouchableHighlight>
                    }}
                />
            </View>

        );
    }
}
function mapStateToProps() {
    return {
        cropData: CropStore.getCropData()
    };
}
module.exports = connect(mapStateToProps)(ERPDiagnosis);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
