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
  findNodeHandle,
  Alert
} from 'react-native';
import { Button, Grid, Carousel, SearchBar, WingBlank, WhiteSpace, Modal, Badge, List } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
import BrTag from 'root/src/screens/baseComon/BrTag.js'
import moment from "moment/moment"
import storage from 'react-native-sync-storage';
import ImgLeftText2Right from 'root/src/screens/baseComon/ImgLeftText2Right.js'
import VideoTopText2Bottom from 'root/src/screens/baseComon/VideoTopText2Bottom'
import * as SolutionAction from 'root/src/actions/solution';
import * as MineAction from 'root/src/actions/mine';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('root/img/userInfo.jpg');
const { connect } = require('remx');
const alert = Modal.alert;
const Item = List.Item;
let pageIndex = 1;
let pageSize = 3;

@navigatorDecorator
class Mine extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
    this.state = {
      AgInfoList: 'loading',
      AgInfoZhongList: 'loading',
      AgInfoYangList: [],
      weatherData: 1,
      cityName: storage.get('cityName'),
      count: 0,
    }
  }
  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  componentWillMount() {
    this.fresh()
    this.getUserScore();
  }
  fresh = () => {
    SolutionAction.SolutionNotReadCount().then((suc) => {
      if (suc.suc) {
        this.setState({ count: suc.data.notReadCountSolution })
      }
    });

  }
  getUserScore = () => {
    MineAction.GetUserScore().then((suc) => {
      if (suc.suc) {
        this.setState({ score: suc.data })
      }
    })
  }
  render() {

    let firstMenus = [
      {
        icon: <Image source={require('root/img/person.png')} style={styles.icon1} />,
        text: '个人信息',
        uri: 'MineEditor'
      },
      {
        icon: <Image source={require('root/img/Distinguish.png')} style={styles.icon1} />,
        text: '识别',
        uri: 'Distinguish'
      },
      {
        icon: <Image source={require('root/img/MedicationRecord.png')} style={styles.icon1} />,
        text: '用药记录',
        uri: 'MedicationRecord',
      },
      {
        icon: <Image source={require('root/img/guanzhu.png')} style={styles.icon1} />,
        text: '我的关注',
        uri: 'ListCrop',
      },
    ]
    let secondMenus = [
      {
        icon: <Image source={require('root/img/push.png')} style={styles.icon} />,
        text: '我的发布',
        uri: 'MinePublish'
      },
      {
        icon: <Image source={require('root/img/message.png')} style={styles.icon} />,
        text: '消息中心',
        uri: 'Build'
      },
      {
        icon: <Image source={require('root/img/set.png')} style={styles.icon} />,
        text: '设置',
        uri: 'Build'
      },
      {
        icon: <Image source={require('root/img/MinePlant.png')} style={styles.icon} />,
        text: '当前种养品',
        uri: 'MinePlant',
        passProps: { isNow: 'true', isLogin: true, isCurrent: true },
      },
      {
        icon: <Image source={require('root/img/MinePlantM.png')} style={styles.icon} />,
        text: '计划种养品',
        uri: 'MinePlant',
        passProps: { isNow: 'false', isLogin: true, isCurrent: false }
      }, {
        icon: <Image source={require('root/img/FarmersPortrait.png')} style={styles.icon} />,
        text: '购药记录',
        uri: 'FarmersPortrait',
      },
      {
        icon: <Image source={require('root/img/ERPUploadImage.png')} style={styles.icon} />,
        text: '上传图片',
        uri: 'ERPUploadImage',
      },
      {
        icon: <Image source={require('root/img/solution.png')} style={styles.icon} />,
        text: '解决方案',
        uri: 'Solution',
        passProps: { fresh: this.fresh }
      },

      {
        icon: <Image source={require('root/img/tudi.png')} style={styles.icon} />,
        text: '我的土地',
        uri: 'ListLand',
      },
      {
        icon: <Image source={require('root/img/logout.png')} style={styles.icon} />,
        text: '退出登录',
        uri: 'logout'
      },
    ]
    return (
      <ScrollView style={styles.container}>
        <View>
          {/* <Image
            ref={(img) => { this.backgroundImage = img; }}
            source={BG_IMAGE}
            style={styles.bgImage}
            onLoadEnd={this.imageLoaded}
          /> */}
          {/* <View style={styles.head}>
            <View style={{ marginBottom: -95, flexDirection: 'column', alignItems: 'center' }}>
              <Text style={styles.headTetx}>{this.props.userInfo.loginName}</Text>
              {
                this.props.avatar ? <Image
                  source={{ uri: ImgUrl + this.props.avatar }}
                  style={styles.headIcon}
                /> : <Image
                    source={require('root/img/head_portrait.png')}
                    style={styles.headIcon}
                  />
              }
            </View>
          </View> */}
          {/* <View style={{ marginTop: 40 }}></View> */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 13, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>
            {
              this.props.avatar ? <Image
                source={{ uri: ImgUrl + this.props.avatar }}
                style={styles.headIcon}
              /> : <Image
                  source={require('root/img/head_portrait.png')}
                  style={styles.headIcon}
                />
            }
            <View>
              <Text style={styles.headTetx}>{this.props.userInfo.loginName}</Text>
              <Text style={styles.scoreTetx}>积分：{this.state.score ? this.state.score : 0}</Text>
          </View>
          </View>
          <Spacing />
          <Spacing />
          <Spacing />
          <View style={styles.main}>
            {firstMenus.map((i, index) => {
              return (
                <TouchableWithoutFeedback
                  style={styles.boxBox}
                  key={index}
                  onPress={() => {
                    this.pushPage({
                      component: {
                        passProps: i.passProps ? i.passProps : null,
                        ...Global.Screens[i.uri],
                      }
                    })
                  }}>
                  <View style={styles.boxBox1}>
                    <View style={styles.imgBox1}>{i.icon}</View>
                    <Text style={styles.imgTetx1}>{i.text}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )

            })}
          </View>
          <Spacing />
          <View>
            {
              secondMenus.map((i, index) => {
                return <View>
                  {index != 0 && index % 4 == 0 ? <Spacing /> : null}
                  < List >
                    <Item arrow="horizontal">
                      <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                          if (i.uri == 'logout') {
                    Alert.alert(
                      '提示',
                      "是否确定退出当前登录账号?",
                      [
                        {
                          text: '取消', onPress: () => {

                          }
                        },
                        {
                          text: '确定', onPress: () => {
                            storage.remove('token');
                            Global.Navigate.startLoginScreen();
                          }
                        },
                      ]
                    );
                  }}>
                  <View style={styles.boxBox}>
                    <View style={styles.imgBox}>{i.icon}</View>
                    <Text style={styles.imgTetx}>{i.text}</Text>
                  </View>
                </TouchableWithoutFeedback>
              }
              else {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      this.pushPage({
                        component: {
                          passProps:i.passProps?i.passProps:null,
                          ...Global.Screens[i.uri],
                        }
                      })
                    }}>
                    <View style={styles.boxBox}>
                      <View style={styles.imgBox}>{i.icon}</View>
                      <Text style={styles.imgTetx}>{i.text}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps() {
  return {
    userInfo: store.getAccount(),
    avatar: store.getAvatar(),
  };
}

module.exports = connect(mapStateToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
  },
  headIcon: {
    width: 80,
    height: 80,
    zIndex: 1000,
    borderRadius: 40,
  },
  headTetx: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  main: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
  boxBox: {
    width: '25%',
  },
  imgBox: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    height: 75,
  },
  imgTetx: {
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 15,
    marginBottom: 15,
  },
  bgImage: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: 150
  },
});