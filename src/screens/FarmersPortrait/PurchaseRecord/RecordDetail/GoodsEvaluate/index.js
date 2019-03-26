import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
} from 'react-native';
import { SearchBar, WhiteSpace, WingBlank, List, Button, TextareaItem, ImagePicker } from 'antd-mobile-rn';
import * as PortraitAction from 'root/src/actions/farmersPortrait';
import * as CommonAction from 'root/src/actions/common';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;
@navigatorDecorator
export default class RecordDetail extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            model: null,
            isDisplay: false,
        };
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [{
                    ...confirmRightBtn, text: '发布'
                }]
            }
        });
        Navigation.events().bindComponent(this);

    }
    navigationButtonPressed({ buttonId }) {
        if(this.loading){
            return false
        }
        let input = {
            orderId: this.props.orderId,
            goodsId: this.props.data.goodsId,
            goodsName: this.props.data.goodsName,
            evaluate: this.state.evaluate,
            attachments: this.state.attachments
        }
        this.loading = true
        PortraitAction.AddGoodsEvaluate({ input: input }).then((suc) => {
            if (suc.suc) {
                MyToast.success('评论成功');
                this.props.refresh && this.props.refresh()
                this.pop()
                this.setState({
                    files: [],
                    attachments: [],
                })
            }
            else {
                this.loading = false
                MyToast.info(suc.msg);
            }
        })
    }
    componentWillMount() {

    }
    onChange = (value) => {
        this.setState({
            evaluate: value
        })
    }
    handleFile2Change = (files, type, index) => {
        if (type == 'add') {
            var formData = new FormData();
            let file = { uri: files[0].url, type: 'application/octet-stream', name: 'image.jpg' };
            formData.append('avatar', file);
            CommonAction.UploadImg({ input: { formData, type: 2 } }).then((suc) => {
                if (suc.suc) {
                    let attachments = [];
                    attachments.push(suc.Data.url)
                    this.setState({
                        files: [{
                            url: ImgUrl + suc.Data.url,
                            id: suc.Data.url,
                        }],
                        attachments
                    });
                }
                else {
                    MyToast.info('上传头像失败')
                }
            })
        }
        else {
            this.setState({
                files: [],
                avatar: ''
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextareaItem
                    title="标题"
                    rows={6}
                    value={this.state.evaluate}
                    placeholder="商品满足你的期待吗？说说你的心得，分享给想买的他们吧"
                    ref={el => this.autoFocusInst = el}
                    onChange={this.onChange}
                />
                <View style={{ alignItems: 'center', padding: 15 }}>
                    <ImagePicker
                        // selectable={this.state.files.length < 1}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                        onChange={this.handleFile2Change}
                        files={this.state.files}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        paddingHorizontal: 13,
        paddingVertical: 8,
    }

});