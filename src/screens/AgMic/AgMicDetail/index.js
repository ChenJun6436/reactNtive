import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  ProgressBarAndroid
} from 'react-native';
import { Button, Grid, Carousel, SearchBar ,WingBlank, Tabs  } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
import BrTag from '../../baseComon/BrTag.js'
import VideoTopText2Bottom from '../../baseComon/VideoTopText2Bottom.js'
import UserMessage from '../../baseComon/UserMessage.js'
import LoadMoreList from '../../baseComon/LoadMoreList.js'
import BrTagText from '../../baseComon/BrTagText.js'
import CommentWrite from '../../baseComon/CommentWrite.js'
import * as AgInfoAction from 'root/src/actions/agInfo'
import * as purchasePaperAction from 'root/src/actions/account';
import Icon from 'react-native-vector-icons/FontAwesome';
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});


@navigatorDecorator
class AgMicDetail extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      AgInfo: null
    }
    const { App, navigator, Message } = this.props;
  }
  componentWillMount() {
    AgInfoAction.getAgDetail({ input: { contentId: this.props.id} }).then(({ suc, data }) => {
      this.setState({
        AgInfo: data
      })
    })
    
  }
  async componentDidMount() {

  }
  _commentClick = (user) => {
    this.pushPage({
      component: {
        ...Global.Screens.CommentDetail,
        passProps: { user }
      }
    });
  }
  //评论列表
  _fresh = () => {
    this.moreListInst._onRefresh();
  }
  render() { 
    const tabs = [
      { title: '种植微课' },
      { title: '养殖微课' },
    ]
    const content = this.state.AgInfo
    return (
      <View style={styles.container}>
      {this.state.AgInfo?(
        <View style={{paddingBottom:100}}>
            <View>
              <VideoTopText2Bottom size={'big'} content={this.state.AgInfo} />   
              <BrTagText title={'视频简介'}/>
              <ScrollView style={{height:100}}>
                <View style={{paddingLeft: 10,paddingRight: 10}}>
                  <Text style={{fontSize: 15, lineHeight: 18}}>Installing APK 'app-debug.apk' on 'Nexus_5X_API_28(AVD) - 9' for app:debug
Installed on 1 device.
BUILD SUCCESSFUL in 16s
161 actionable tasks: 2 executed, 159 up-to-date
Running C:\Users\jun.chen\AppData\Local\Android\Sdk/platform-tools/adb -s emulator-5554 reverse tcp:8081 tcp:8081
Starting the app on emulator-5554 (C:\Users\jun.chen\AppData\Local\Android\Sdk/platform-tools/adb -s emulator-5554 shell am start -n com.farmerapp/com.farmerapp.MainActivity)...
Starting: Intent</Text>
                </View>
              </ScrollView>
            </View>
            <BrTagText title={'热门评论'}/>
            <View style={{minHeight:120}}>
              <LoadMoreList
                ref={ref => this.moreListInst = ref}
                getData={AgInfoAction.getAgComment}
                searchParams={{ contentId: this.props.id }}
                rowItem={(data) => {
                  return <UserMessage commentClick={ this._commentClick }  content={data}/>
                }}
              />
            </View>
            {this.state.AgInfo.allowComment?(
              <CommentWrite user={content} nowType={0} fresh={this._fresh} id={this.props.id}  type={0}/>
            ):null}
        </View>   
      ):<ProgressBarAndroid/>}
        
      </View>
    );
  }
}
function mapStateToProps() {
  return {
    // menuList: store.getMenuList()
  };
}

module.exports = connect(mapStateToProps)(AgMicDetail);

