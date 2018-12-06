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
import { Button, Grid, Carousel, SearchBar, WingBlank, WhiteSpace } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
import BrTag from 'root/src/screens/baseComon/BrTag.js'
import moment from "moment/moment"
import storage from 'react-native-sync-storage';
import ImgLeftText2Right from 'root/src/screens/baseComon/ImgLeftText2Right.js'
import HotProduct from 'root/src/screens/baseComon/hotProduct'
import StoreItem from 'root/src/screens/baseComon/storeItem'
import * as StoreAction from 'root/src/actions/store'
import AppStore from 'root/src/stores/app';
import RNUpdate from "react-native-update-app"
import areasData from 'root/src/assets/data.json'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const { connect } = require('remx');
let pageIndex = 1;
// @loadingDecorator
@navigatorDecorator
class Home extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      storeList: 'loading',
      goodsList: 'loading',
      AgInfoYangList: [],
      weatherData: 1,
      cityName: storage.get('cityName'),
      longitude: storage.get('longitude'),
      latitude: storage.get('latitude'),
      regionId: storage.get('regionId'),
      storeLoading: false
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    //如果当前是使用的本机定位模式
    if (this.props.byLocation) {
      startLocation(() => {
        this.getWether(storage.get('cityName'))
        this.query()
      })
    } else {
      this.getWether(this.props.cityName);
      getCityLocation(this.props.cityName, this.query);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.byLocation == false && nextProps.cityName && this.props.cityName != nextProps.cityName) {
      this.getWether(nextProps.cityName);
      getCityLocation(nextProps.cityName, this.query);
    }
  }
  query = () => {
    //获取周边农资店
    StoreAction.SearchNearByStore({ input: { pageIndex, pageSize: 2, longitude: storage.get('longitude'), latitude: storage.get('latitude') } }).then(({ suc, data }) => {
      if (data && data.length > 0) {
        this.setState({
          storeList: data
        })
      }
      else {
        this.setState({
          storeList: []
        })
      }
    }),
      // 搜索热门农资
      StoreAction.SearchGoods({ input: { pageIndex, pageSize: 2, regionId: storage.get('regionId') } }).then(({ suc, data }) => {
        if (data && data.length > 0)
          this.setState({
            goodsList: data
          })
        else {
          this.setState({
            goodsList: []
          })
        }
      })
  }

  //查看更多
  _moreInfo(type) {
    AppStore.setBuyProductTopIndex(type);
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 3
      }
    })
  }
  //获取当前城市天气
  getWether(city) {
    const vm = this
    let url = 'http://wthrcdn.etouch.cn/weather_mini?city=' + city;
    let p = new Promise((resolve, reject) => {
      fetch(url).then((response) => response.json())
        .then((responseData) => {
          resolve(responseData);
        }).catch((error) => {
        }).done()
    })
    p.then((data) => {
      if (data.status == 1000) {
        vm.setState({
          weatherData: data.data.forecast[0],
          weatherStatus: false
        })
      } else {
        vm.setState({
          weatherData: null,
          weatherStatus: false
        })
      }
    }).catch((data) => {
      // reject(ErrorDeal.getError(data.code));
    })
  }

  render() {
    let a = 'root/img/product.png'
    let weather = this.state.weatherData ? this.state.weatherData : {}
    if (weather && weather != 1) {
      this.highC = weather.high ? weather.high.split(' ')[1] : ''
      this.lowC = weather.low ? weather.low.split(' ')[1] : ''
    }
    return (
      [<ScrollView style={styles.container}>
        <StatusBar
          backgroundColor="#ff0000"
          translucent={true}
          hidden={true}
          animated={true} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#7bb046' }}>
          {
            weather && weather != 1 ? (
              <View style={{ flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <Text style={{ fontSize: 12, lineHeight: 54, marginRight: 5, color: '#fff' }}>{this.lowC + '~' + this.highC}</Text>
                  <Text style={{ fontSize: 12, lineHeight: 54, marginRight: 5, textAlign: 'center', color: '#fff' }}>{weather.type}</Text>
                </View>
                <View style={{ paddingLeft: 5, marginLeft: 5, marginRight: 5 }}>
                  <Text numberOfLines={1} style={{ fontSize: 14, lineHeight: 54, textAlign: 'center', color: '#fff' }}>{this.props.cityName}</Text>
                </View>
              </View>
            ) : weather ? <ProgressBarAndroid
              color={'#fff'}
              styleAttr={'Small'} /> : (<View ><Text style={{ lineHeight: 54 }}>定位失败</Text></View>)
          }

          <TouchableHighlight
            style={{ height: 54, marginLeft: 5, justifyContent: 'center', }}
            onPress={() => {
              this.pushPage({
                component: {
                  passProps: { changeCity: this.changeCity },
                  ...Global.Screens.CitySelect,
                }
              });
            }}>
            <View style={styles.rowdata}><Text style={styles.rowdatatext}>[切换城市]</Text></View>
          </TouchableHighlight>
        </View>

        <View>
          <Carousel autoplay dotStyle={{ backgroundColor: '#fff' }} dotActiveStyle={{ backgroundColor: '#fff' }}>
            <View>
              <Image
                source={require('root/img/nhBanner.jpg')}
                style={styles.imgStyle}
              />
            </View>
          </Carousel>
        </View>
        <View>
          <BrTag color={'red'} title={'周边农资'} click={() => { this._moreInfo(0) }} url={this.state.storeList == 'loading' ? false : true} />
          {this.state.storeList == 'loading' ? <View style={{ height: 80, flex: 1, justifyContent: 'center', alignItems: "center" }}><ProgressBarAndroid

            color={'#999'}
            styleAttr={'Horizontal'} /></View> : null}
          {
            this.state.storeList && this.state.storeList.length > 0 && this.state.storeList != 'loading' ? this.state.storeList.map(item => {
              return <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'} key={item.id}
                onPress={() => {
                  this.pushPage({
                    component: {
                      passProps: { id: item.id },
                      ...Global.Screens.StoreDetail,
                      options: {
                        topBar: {
                          title: {
                            text: item.name
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
                <StoreItem content={item} />
              </TouchableHighlight>
            }) : this.state.storeList && this.state.storeList.length == 0 ? <Image source={require('root/img/nodata.jpg')} style={{ justifyContent: 'center', width: SCREEN_WIDTH, height: 120, marginTop: 8 }} /> : null
          }
        </View>
        <Spacing />
        <View>
          <BrTag color={'green'} title={'热销品种'} click={() => { this._moreInfo(1) }} url={this.state.goodsList == 'loading' ? false : true} />
          {this.state.goodsList == 'loading' ? <View style={{ height: 80, flex: 1, justifyContent: 'center', alignItems: "center" }}><ProgressBarAndroid
            color={'#999'}
            styleAttr={'Horizontal'} /></View> : null}
          {
            this.state.goodsList && this.state.goodsList.length > 0 && this.state.goodsList != 'loading' ? this.state.goodsList.map(item => {
              return <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'} key={item.id}
                onPress={() => {
                  this.pushPage({
                    component: {
                      passProps: { id: item.id, registerNumber: item.registerNumber },
                      ...Global.Screens.ProductDetail,
                      options: {
                        topBar: {
                          title: {
                            text: item.goodsName
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
                <HotProduct content={item} />
              </TouchableHighlight>
            }) : this.state.goodsList && this.state.goodsList.length == 0 ? <Image source={require('root/img/nodata.jpg')} style={{ justifyContent: 'center', width: SCREEN_WIDTH, height: 120, marginTop: 8 }} /> : null
          }
        </View>
      </ScrollView >,
      <RNUpdate
        onBeforeStart={async () => {
          const response = await fetch(BaseApiUrl + '/appVersion.json?t=' + Date.now());
          const data = await response.json();
          return data;
        }}
        progressBarColor={"#f50"}
        updateBoxWidth={250}
        updateBoxHeight={250}
        updateBtnHeight={38}
      />]
    );
  }
}
function mapStateToProps() {
  return {
    cityName: AppStore.getCityName(),
    byLocation: AppStore.getByLocation(),
  };
}

module.exports = connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgStyle: {
    // 设置宽度
    width: Dimensions.get('window').width,
    // 设置高度
    height: 180,
    // 设置图片填充模式
    resizeMode: 'stretch'
  },
  rowdata: {
    borderBottomColor: '#faf0e6',
    borderBottomWidth: 0.5
  },
  rowdatatext: {
    color: 'gray',
    color: '#fff'
  }
});