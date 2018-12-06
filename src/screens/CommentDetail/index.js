import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import AgStore from 'root/src/stores/agInfo';
import UserMessage from '../baseComon/UserMessage.js'
import CommentWrite from '../baseComon/CommentWrite.js'
import Icon from 'react-native-vector-icons/Feather';
import * as AgInfoAction from 'root/src/actions/agInfo'
import LoadMoreList from '../baseComon/LoadMoreList.js'

const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
});


@navigatorDecorator
class CommentDetail extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  
  componentWillMount () {

  }
  async componentDidMount() {
    //requestPermission();
  }
  //点击回复
  _commentClick = (user) => {
    AgStore.setReplyUser(user)
  }
  //评论列表
  _fresh = () => {
    this.moreListInst._onRefresh();
  }
  _back = () => {
    this.pop()
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingBottom:100}}>
          <View style={{height: 50,flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#e3e3e3'}}>
            <TouchableOpacity onPress={this._back}>
              <View>
                <Text style={{lineHeight: 50, marginLeft: 15}}><Icon name='x' size={35}/></Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{lineHeight: 50, marginLeft: '40%', fontSize:20}}>{this.props.user.commentCount}</Text>
            </View>
          </View>
          <UserMessage commentClick={ this._commentClick }  content={this.props.user}/>
          <View style={{borderTopWidth:1,borderTopColor:'#e3e3e3'}}>
            <Text style={{fontSize: 16,lineHeight: 30,marginLeft: 10}}>全部评论</Text>
          </View>
          <View style={{height:390}}>
            <LoadMoreList
              ref={ref => this.moreListInst = ref}
              getData={AgInfoAction.getCommentDetail}
              searchParams={{ commentId: this.props.user.id }}
              rowItem={(data) => {
                return <UserMessage commentClick={ this._commentClick } type={2}  content={data}/>
              }}
            />
          </View>
        </View>
        <CommentWrite fresh={this._fresh} id={this.props.user.id} type={1}/>
      </View>
    );
  }
}
function mapStateToProps() {
  return {
  };
}

module.exports = connect(mapStateToProps)(CommentDetail);

