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
import { List, Button, SwipeAction } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import DiagnosisList from 'root/src/screens/baseComon/DiagnosisList';
import * as DiagnosisAction from 'root/src/actions/diagnosis';
const { connect } = require('remx');
@navigatorDecorator
class DiaSearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: '',
            classificCode: '',
            search: ''
        }

    }
    refresh = () => {
        this.moreListInst._onRefresh();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                    <LoadMoreList
                        colums={2}
                        ref={ref => this.moreListInst = ref}
                        getData={this.props.input.search ? DiagnosisAction.GetPlantPest : DiagnosisAction.GetPlantByLivingMatter}
                        searchParams={{ classificCode: this.props.input.classificCode, search: this.props.input.search }}
                        rowItem={(data) => {
                            return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                                {
                                    text: '详情',
                                    onPress: () => {
                                        this.pushPage({
                                            component: {
                                                ...Global.Screens.ERPDiagnosisDetail,
                                                passProps: { cropName: data.nameCn },
                                                options: {
                                                    topBar: {
                                                        title: {
                                                            text: data.nameCn
                                                        }
                                                    }
                                                },
                                            }
                                        });
                                    },
                                    style: { backgroundColor: 'orange', color: 'white' },
                                }
                            ]} >
                                <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
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
                                                    }
                                                },
                                            }
                                        });
                                    }}>
                                    <DiagnosisList content={data} />
                                </TouchableHighlight>
                            </SwipeAction>
                        }}
                    />
                </View>
            </View>
        );
    }
}
function mapStateToProps() {
    // return {
    // };
}
module.exports = connect(mapStateToProps)(DiaSearchList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
