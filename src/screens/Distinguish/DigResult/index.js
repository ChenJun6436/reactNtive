/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Animated,
  ScrollView,
  Platform,
  Image
} from 'react-native';
import moment from 'moment';
import { SwipeAction } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as DistinguishAction from 'root/src/actions/distinguish';
import DigList from 'root/src/screens/baseComon/DigList.js';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

@navigatorDecorator @loadingDecorator
export default class DigResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: []
    };

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            ...confirmRightBtn, text: '重新识别'
          }
        ]
      }
    });
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed() {
    this.popTo("Distinguish") //跳转到指定位置
  }

  componentWillMount() {
    var formData = new FormData();
    let uri = this.props.url
    let file = { uri: uri.uri, type: 'application/octet-stream', name: 'image.jpg' };
    formData.append('avatar', file);
    let input = {
      formData,
      cropCnName: this.props.cropCnName
    }
    DistinguishAction.Distinguish({ input: formData, cropEnName: this.props.cropCnName }).then(({ suc, Data }) => {
      this.setState({
        loading: false
      })
      if (suc && Data && Data.length > 0) {
        this.setState({
          result: Data
        })
      }
      else {
        this.setState({
          result: []
        })
      }
    })
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 5, fontSize: 18, color: 'red' }}>温馨提示：以下分析结果，仅供参考！</Text>
        {
          this.state.result && this.state.result.length > 0 ? this.state.result.map((item, index) => {
            return <SwipeAction autoClose key={index} style={{ backgroundColor: 'transparent', flex: 1 }} right={[
              {
                text: '详情',
                onPress: () => {
                  this.pushPage({
                    component: {
                      passProps: { data: item },
                      ...Global.Screens.DigDetail,
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
                      passProps: { data: item },
                      ...Global.Screens.DigDetail,
                    }
                  });
                }}>
                <DigList content={item} />
              </TouchableHighlight>
            </SwipeAction>

          }) : <Text>暂无数据</Text>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  imgStyle: {
    // 设置宽度
    width: Dimensions.get('window').width,
    // 设置高度
    height: 200,
    // 设置图片填充模式
    resizeMode: 'stretch'
  },
});

