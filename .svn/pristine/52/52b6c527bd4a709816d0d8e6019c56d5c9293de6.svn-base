import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, SwipeAction, InputItem } from 'antd-mobile-rn';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import StoreList from 'root/src/screens/baseComon/StoreList.js';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import * as PortraitAction from 'root/src/actions/farmersPortrait';
import SearchStore from './Search';

//农户查询农资店
@navigatorDecorator
export default class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: "",
            addressString: "",
            legalPersonName: '',
            contactInformation: '',
            regionId: '',
            storeVisible: false
        }
    }

    refresh = () => {
        this.moreListInst._onRefresh();
    }
    setVisible = () => {
        this.setState({
            storeVisible: !this.state.storeVisible
        })
    }
    getStoreByMember = (item) => {
        this.setState({
            storeName: item.storeName,
            regionId: item.regionId,
            legalPersonName: item.legalPersonName,
            contactInformation: item.contactInformation,
        }, this.refresh)

        this.setState({ storeVisible: false })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <Button style={{ height: 40, width: '20%' }} onClick={this.setVisible}><Text style={{ fontWeight: 'bold', color: '#999999' }} >筛选</Text></Button>
                    <InputItem
                        style={{ height: 40, width: '80%', backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: '#bbbbbb', }}
                        clear
                        value={this.state.storeName}
                        onChange={(value: any) => {
                            this.setState({
                                storeName: value,
                            });
                        }}
                        labelNumber={2}
                        placeholder='请输入用户名'
                        placeholderTextColor='#999999'
                    >
                        <Icon
                            name='search'
                            color='#999999'
                            size={25}
                        />
                    </InputItem>
                </View>
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={PortraitAction.getStoreByMember}
                    searchParams={{ storeName: this.state.storeName, regionId: this.state.regionId, legalPersonName: this.state.legalPersonName, contactInformation: this.state.contactInformation }}
                    rowItem={(data) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={data.bind ? [
                            {
                                text: '解绑',
                                onPress: () => {
                                    PortraitAction.deleteBind({ id: data.id }).then(({ suc, msg }) => {
                                        if (suc) {
                                            this.refresh();
                                            MyToast.success('解绑成功');
                                        }
                                        else {
                                            MyToast.success('解绑失败');
                                        }
                                    }
                                    )
                                },
                                style: { backgroundColor: 'orange', color: 'white' },
                            }
                        ] : [
                                {
                                    text: '绑定',
                                    onPress: () => {
                                        PortraitAction.addBind({ id: data.id }).then(({ suc, msg }) => {
                                            if (suc) {
                                                this.refresh();
                                                MyToast.success('绑定成功');
                                            }
                                            else {
                                                MyToast.success('绑定失败');
                                            }
                                        }
                                        )
                                    },
                                    style: { backgroundColor: 'orange', color: 'white' },
                                }
                            ]} >
                            <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}>
                                <StoreList
                                    firstItem={data.name}
                                    secondItem={data.storeSaleType}
                                    thirdItem={data.legalPersonName}
                                    fourthItem={data.storeManPhone}
                                />
                            </TouchableHighlight>
                        </SwipeAction>
                    }}
                />
                <SearchStore
                    visible={this.state.storeVisible}
                    title={'ninhao'}
                    handleCancel={() => { this.setState({ storeVisible: false }) }}
                    getStoreByMember={this.getStoreByMember}
                    content={
                        <View>
                            <Text>hello,world!!!!!</Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    button: {
        width: 100,
    }
});
