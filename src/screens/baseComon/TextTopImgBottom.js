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
import Icon from 'react-native-vector-icons/FontAwesome';
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
export default class TextTopImgBottom extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  async componentDidMount() {
  }
  _onPressButton = ()=> {
  }
  render() {
    const content = this.props.content
    return (
      <WingBlank size={'lg'} style={{paddingTop: 10,paddingBottom: 10}}>
          <TouchableOpacity onPress={this._onPressButton}>
            <View style={{borderBottomColor:'#e0e0e0',borderBottomWidth: 1,paddingBottom:10}}>
              <Text numberOfLines={2}  style={{fontSize:16}}>{content.title}</Text>
              <View  style={{flexDirection:'row',height: 60, paddingTop: 5}}>
                {
                  content.attachments.map((item, index)=>{
                    return <Image style={{width:'30%',height:60,marginRight:20}}  key={index} source={{uri:item.url}}/>
                  })
                }
              </View>
              <View style={{justifyContent:'space-between',paddingTop: 10}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                  <Text numberOfLines={1} style={{fontSize:13,lineHeight:19,maxWidth:180,}}>{content.author}</Text>
                  <Text numberOfLines={1} style={{fontSize:13,lineHeight:20,marginLeft:20,maxWidth: 80}}>{content.readCount}</Text>
                  <Text numberOfLines={1} style={{fontSize:13,lineHeight:20,marginLeft:15,maxWidth: 80}}>{content.commentCount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
      </WingBlank>
    );
  }
}
