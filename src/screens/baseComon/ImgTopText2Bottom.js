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
export default class ImgTopText2Bottom extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  async componentDidMount() {
  }
  _onPressButton = ()=> {
  }
  
  render() {
    // const img = require( this.props.img )
    return (
      <WingBlank size={'lg'} style={{paddingTop: 10,paddingBottom: 10,width:'40%'}}>
          <TouchableOpacity onPress={this._onPressButton}>
            <View>
              <Image style={{width:150,height:80,marginRight:20}} source={this.props.img}/>
              <View style={{justifyContent:'space-between',flex:1,height: 40}}>
                <Text numberOfLines={1}  style={{fontSize:16}}>泰州研究院姜小三院长获江苏省最1美教是奖</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text numberOfLines={1} style={{fontSize:12,width:60,lineHeight:20}}>优农帮乐山分公司</Text>
                  <Text style={{fontSize:10,lineHeight:20}}>阅读 5110</Text>
                  <Text style={{fontSize:10,lineHeight:20}}><Icon name='thumbs-up' size={10}/> 7788</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
      </WingBlank>
    );
  }
}
