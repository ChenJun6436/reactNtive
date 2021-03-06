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
import Video from 'react-native-af-video-player'
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
export default class VedioLeftText2Right extends Component {
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
      <WingBlank size={'sm'} style={{paddingTop: 10,paddingBottom: 10}}>
          <TouchableOpacity onPress={ this.props.click}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{width: '50%'}}>
                <Video
                      style={{height: 100}}
                      ref={(ref) => { this.video = ref }}
                      title={content.title}
                      inlineOnly={true}
                  />
              </View>
              <View style={{justifyContent:'space-between',height:100,width: '45%'}}>
                <Text numberOfLines={2}  style={{fontSize:16}}>{content.title}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text>阅读 {content.readCount}</Text>
                  <Text style={{marginLeft:10}}><Icon name='thumbs-up' size={12}/> {content.commentCount}</Text>
                  <View style={{backgroundColor:'#e4e4e4',position:'absolute',top:-30,right:0,height:30,width:80,borderRadius:10}}>
                    <Text style={{lineHeight:30,textAlign:'center',color:'#CC9900'}}>{content.commentCount}积分</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
      </WingBlank>
    );
  }
}
