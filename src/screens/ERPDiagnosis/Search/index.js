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
const { connect } = require('remx');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import * as DiagnosisAction from 'root/src/actions/diagnosis';
@loadingDecorator @navigatorDecorator
class SearchDiagnosis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: '',
            classificCode: '',
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
        let input = {
            classificCode: this.state.classificCode,
            search: this.state.search
        }
        this.pushPage({
            component: {
                ...Global.Screens.DiaSearchList,
                passProps: { input: input },
            }
        });
        // this.props.searchFn && this.props.searchFn(input);
        // this.pop()
    }
    componentWillMount() {
        DiagnosisAction.GetPlantClassifyByNode({ input: { userId: '' } }).then((data) => {
            if (data.suc && data.data && data.data.length > 0) {
                this.setState({
                    typeList: data.data
                })
            }
            this.setState({
                loading: false
            })
        })
      
    }
    selectType = (value) => {
        this.setState({
            classificCode: value,
            search: ''
        })
    }
    render() {
        return (
            <View style={styles.confirm}>
                <View style={styles.box}>
                    <List>
                        <InputItem
                            clear
                            onChangeText={text => this.setState({ search: text, classificCode: '' })}
                            placeholder="请输入作物名/病虫草害名/关键字搜索"
                            value={this.state.search}
                            labelNumber={9}
                        >
                        </InputItem>
                    </List>
                    <View style={styles.searchBtn}>
                        {
                            this.state.typeList && this.state.typeList.length > 0 ? this.state.typeList.map((item, index) => {
                                return <Button key={index} style={[styles.searchBtns, { backgroundColor: this.state.classificCode == item.code ? 'green' : '#fff', }]} value={item.code} onClick={() => this.selectType(item.code)}><Text style={{ color: this.state.classificCode == item.code ? '#fff' : '#222' }}>{item.nameCn}({item.plantCount})</Text></Button>
                            }) : <Text>暂无数据</Text>
                        }
                    </View>
                </View>
            </View>
        );
    }
}
function mapStateToProps() {
    // return {
    // };
}
module.exports = connect(mapStateToProps)(SearchDiagnosis);
const styles = StyleSheet.create({
    confirm: {
        backgroundColor: 'rgba(141,141,141,0.5)',
        padding: 15,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    },
    searchBtn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        width: '100%',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    searchBtns: {
        width: '49%',
        marginTop: 10,
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
        lineHeight: 40,
        // backgroundColor: 'green',
        // color: '#fff',
        // textAlign: 'center'
    }
});
