import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn'
import moment from "moment/moment";
import store from 'root/src/stores/account';
import Icon from 'react-native-vector-icons/Feather';
import * as AgInfoAction from 'root/src/actions/agInfo'
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
@navigatorDecorator
export default class UserMessage extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
    this.state = {
      canLike: true,
      canUnLike: true,
    }
  }
  componentWillMount() {
    const user = this.props.content
    this.state.likeNum = user.likeCount
    this.state.canLike = !user.status.isLiked
  }
  //点赞或者其他操作
  actionRecord = (action, target, id) => {
    let target1 = target
    //如果是回复的回复
    if (this.props.type == 2) {
      target1 = 3
    }
    AgInfoAction.actionRecord({
      input: {
        actionType: action,//1-点赞2-不喜欢3-收藏4-分享5-转
        targetType: target1,//目标类型1-内容2-评论3-回复
        targetId: id,//目标id
      }
    }).then(({ suc, data }) => {
      if (this.state.canLike) {
        this.setState({
          likeNum: this.state.likeNum + 1,
          canLike: !this.state.canLike,
        })
      } else {
        this.setState({
          likeNum: this.state.likeNum - 1,
          canLike: !this.state.canLike,
        })
      }
    })
  }
  _onPressButton = () => {
  }
  //点击键盘事件
  _submit = () => {
  }
  render() {
    const user = this.props.content
    return (
      <WingBlank size={'lg'} style={{ paddingTop: 0, paddingBottom: 10 }}>
        <View>
          {/* <TouchableOpacity onPress={this._onPressButton}> */}
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Image style={{ height: 40, width: 40 }} source={{ uri: ImgUrl +  user.creatorHeadUrl }} />
            <View style={{ justifyContent: 'space-between', flex: 1, marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, lineHeight: 20 }}>{user.createName}</Text>
                <TouchableOpacity onPress={() => { this.actionRecord(1, 2, user.id) }}>
                  <Text style={{ marginLeft: 10, fontSize: 13, lineHeight: 20, color: this.state.canLike ? '#999' : 'red' }}>
                    <Icon name='thumbs-up' size={18} /> {this.state.likeNum}
                  </Text>
                </TouchableOpacity>
              </View>
              {user.parentId ? (
                <Text style={{ fontSize: 14, marginTop: 10, lineHeight: 20 }}>
                  <Text style={{ color: '#4d8fd4' }}>{'/@' + user.toUserName + '：'}</Text>
                  {user.content}
                </Text>
              ) : (
                  <Text style={{ fontSize: 14, marginTop: 10, lineHeight: 20 }}>{user.content}</Text>
              )}

              <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 13, lineHeight: 20 }}>
                  {moment(user.createTime).format('YYYY/MM/DD HH:mm')}
                </Text>
                {this.props.commentClick ? (
                  <View>
                    <TouchableOpacity onPress={() => { this.props.commentClick(user) }}>
                      <View>
                        <Text style={{ fontSize: 13, lineHeight: 20, color: '#4d6bdc' }}> ·回复
                              {this.props.type != 2 ? (
                            <Text style={{ fontSize: 13, lineHeight: 20, color: '#4d6bdc' }}> {user.replyCount}</Text>
                          ) : null}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {this.props.report ? (<Text style={{ fontSize: 13, lineHeight: 20 }}>举报</Text>) : null}
              </View>
            </View>
          </View>
        </View>
      </WingBlank>
    );
  }
}
