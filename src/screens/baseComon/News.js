import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
import Icon from 'react-native-vector-icons/Feather';
import * as AgInfoAction from 'root/src/actions/agInfo'
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
@navigatorDecorator
export default class News extends Component {
  constructor(props: {}) {
    super(props);
    this.state= {
      likeNum: 0,
      unlikeNum: 0,
      canLike: true,
      canUnLike: true,
    }
    const { App, navigator, Message } = this.props;
  }
  componentWillMount() {
    const news = this.props.news
    this.state.likeNum = news.likeCount
    this.state.canLike = !news.status.isLiked
  }
  async componentDidMount() {
  }
  _onPressButton = ()=> {
    this.pushPage(
      component: {
        ...Global.Screens.Login
      }
    )
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
      if(this.state.canLike){
        this.setState({
          likeNum: this.state.likeNum + 1,
          canLike: !this.state.canLike,
        })
      }else{
        this.setState({
          likeNum: this.state.likeNum - 1,
          canLike: !this.state.canLike,
        })
      }
    })
  }
  _likeNews = () => {
    this.actionRecord(1,1,this.props.news.id)
  }
  _unlikeNews = () => {
  }
  render() {
    const news = this.props.news
    return (
      <ScrollView style={styles.container}>
        {/* 头部 */}
        <View style={{paddingBottom:10}}>
          <Text numberOfLines={2} style={{fontSize:17,letterSpacing:2}}>{news.title}</Text>
          <View style={{marginTop:5,marginBottom:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{fontSize:12,lineHeight:20}}>{news.source}</Text>
              <Text style={{fontSize:12,lineHeight:20}}>{news.createTime}</Text>
            </View>
            <Text style={{fontSize:12,lineHeight:20}}>{news.author }</Text>
          </View>
          {/* 文字 */}
          <Text style={{lineHeight:25,letterSpacing:2}}>{news.body }</Text>  
          <Text style={{fontSize:14,lineHeight: 20,paddingTop: 10}}>相关搜索</Text>
          <View style={{marginTop:5,marginBottom:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-between', flexWrap:'wrap'}}>
              <TouchableOpacity onPress={this._onPress}>
                <Text numberOfLines={1}  style={{lineHeight:25, width:'50%'}}>来源：人民121111111日报</Text>
              </TouchableOpacity>
              <Text numberOfLines={1}  style={{lineHeight:25, width:'50%'}}>来源：2222222222211111112222报</Text>
              <Text numberOfLines={1}  style={{lineHeight:25, width:'50%'}}>来源：人民12312321日报</Text>
              <Text style={{lineHeight:25, width:'50%'}}>46545</Text>
              <Text style={{lineHeight:25, width:'50%'}}>来源：人民日报</Text>
              <Text style={{lineHeight:25, width:'50%'}}>来源：人民日报</Text>
            </View>
            <View style={{justifyContent:'space-around',flexDirection:'row',paddingTop: 10}}>
              <TouchableOpacity onPress={this._likeNews}>
                <View style={{backgroundColor:'#fff',height:30,borderRadius:10,borderColor:this.state.canLike?"#999":'red',borderWidth: 1,paddingLeft:10,paddingRight:10}}>
                  <Text style={{lineHeight:30,textAlign:'center',color: this.state.canLike?"#999":'red'}}><Icon name='thumbs-up' size={12}/>{this.state.likeNum}</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <View style={{backgroundColor:'#fff',height:30,width:80,borderRadius:10,borderColor:'#999',borderWidth: 1}}>
                  <Text style={{lineHeight:30,textAlign:'center',color:'#999'}}>不喜欢</Text>
                </View>
              </TouchableOpacity>
               */}
            </View>
          </View>    
        </View>
        {/* 推介 */}
        {/* 赞 */}
      </ScrollView>
    );
  }
}
