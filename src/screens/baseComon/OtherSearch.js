import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
@navigatorDecorator
export default class OtherSearch extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  async componentDidMount() {
  }
  _onPress = ()=> {
    this.pushPage({
      component: {
        ...Global.Screens.AgInfo
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{borderBottomColor: '#ccc',borderBottomStyle:'solid',borderBottomWidth:1,paddingBottom:10}}>
          <Text style={{fontSize:14,lineHeight: 30}}>相关搜索</Text>
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
          </View>
        </View>
      </View>
    );
  }
}
