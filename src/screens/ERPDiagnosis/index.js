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
import * as DiagnosisAction from 'root/src/actions/diagnosis';
const { connect } = require('remx');
@navigatorDecorator
class ERPDiagnosis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: '',
            classificCode: '',
            search: ''
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    {
                        id: 'search',
                        icon: iconsMap['search'],
                        color: '#fff',
                        fontSize: 16,
                    }
                ]
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

    // refresh = () => {
    //     this.moreListInst._onRefresh();
    // }
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
    // return {
    // };
}
module.exports = connect(mapStateToProps)(ERPDiagnosis);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});