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
import AgStore from 'root/src/stores/agInfo';
import News from '../../baseComon/News.js'
import UserMessage from '../../baseComon/UserMessage.js'
import BrTagText from '../../baseComon/BrTagText.js'
import CommentWrite from '../../baseComon/CommentWrite.js'
import * as AgInfoAction from 'root/src/actions/agInfo'
import LoadMoreList from '../../baseComon/LoadMoreList.js'
import * as purchasePaperAction from 'root/src/actions/account';
import Icon from 'react-native-vector-icons/FontAwesome';
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});


@navigatorDecorator
class AgInfoDetail extends Component {
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
  //点赞或者其他操作
  actionRecord = (action,target,id) => {
    AgInfoAction.actionRecord({ 
      input: {
        actionType : action,//1-点赞2-不喜欢3-收藏4-分享5-转
        targetType : target,//目标类型1-内容2-评论3-回复
        targetId : id,//目标id
      } 
    }).then(({ suc, data }) => {
      this.setState({
        AgInfo: data
      })
    })
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
    const content = 'you are my super star ,super super super start la la la la la la la la la la la la la ,hey july don`t let me caryy, make ite better'
    return (
      <View style={styles.container}>
          {this.state.AgInfo?(
            <View style={{paddingBottom:100}}>
                <View style={{height:360,borderBottomColor: '#ccc',borderBottomWidth:1,}}>
                  <News news={this.state.AgInfo}/>
                </View>
                <View style={{minHeight:150}}>
                  <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={AgInfoAction.getAgComment}
                    searchParams={{ contentId: this.props.id }}
                    rowItem={(data) => {
                      return <UserMessage commentClick={ this._commentClick }  content={data}/>
                    }}
                  />
                </View>
              {/* </ScrollView> */}
              {this.state.AgInfo.allowComment?(
                <CommentWrite nowType={0} user={this.state.AgInfo} fresh={this._fresh} id={this.props.id}  type={0}/>
              ):null}
            </View>
          ):<ProgressBarAndroid/>}
      </View>
    );
  }
}
function mapStateToProps() {
  return {

  };
}

module.exports = connect(mapStateToProps)(AgInfoDetail);

