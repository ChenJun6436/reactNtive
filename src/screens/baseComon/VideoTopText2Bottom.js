import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-af-video-player'
import * as AgInfoAction from 'root/src/actions/agInfo'
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'row',
    justifyContent:'space-around',
  },
});
@navigatorDecorator
export default class VideoTopText2Bottom extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      canLike: true,
      canUnLike: true,
    }
    const { App, navigator, Message } = this.props;
  }
  componentWillMount() {
    const content = this.props.content
    const size = this.props.size == 'big'?true:false
    if(size){
      this.state.canLike = !content.status.isLiked
      this.state.likeNum = content.likeCount
    }
  }
  _onPressButton = ()=> {
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
  render() {
    const url = require('./hc.mp4')
    const content = this.props.content
    const size = this.props.size == 'big'?true:false
    // const url = require(content.attachments.url)
    return (
            <View>
                <Video
                  style={{height:size?250:100}}
                  url={url}
                  // url={content.attachments?content.attachments.url:content.urls[0]}
                  ref={(ref) => { this.video = ref }}
                  title={content.title}
                  inlineOnly={!size}
                  rotateToFullScreen={true}
                  resizeMode={'cover'}
                />
                <TouchableOpacity onPress={this.props.click}>
                  <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between',paddingLeft:size?10:0}}>
                      <View>
                        <Text numberOfLines={1} style={{fontSize:size?18:14,lineHeight: size?22:18, marginTop: 5}}>{content.title}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text numberOfLines={1} style={{fontSize:size?13:12,lineHeight: size?30:15,width:'50%'}}>{content.author}</Text>
                          {size?(
                            null
                          ):(
                            <View style={{flexDirection:'row'}}>
                              <Text numberOfLines={1} style={{lineHeight: 15,width:50,fontSize:10}}><Icon name='thumbs-up' size={13} /> {content.likeCount}</Text>
                              <Text numberOfLines={1} style={{lineHeight: 15,width:50,fontSize:10}}><Icon name='eye' size={13}/> {content.readCount}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <TouchableOpacity onPress={ ()=>{this.actionRecord(1,1,content.id)}}>
                        <Text style={{marginLeft:10,lineHeight:60,color:this.state.canLike?'#999':'red'}}><Icon name='thumbs-up' size={24}/>  {this.state.likeNum}</Text>
                      </TouchableOpacity>
                  </View>
                </TouchableOpacity>
            </View>
    );
  }
}
