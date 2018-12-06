/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Button, List } from 'antd-mobile-rn';
const { connect } = require('remx');
import store from 'root/src/stores/account';
import Icon from 'react-native-vector-icons/FontAwesome';
const Item = List.Item;
type Props = {};
@navigatorDecorator
class Test extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.baseinfo}>
          <Icon
            name='user-circle-o'
            color='green'
            size={50}
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={{ fontSize: 22, color: 'green' }}>欢迎您</Text>
            <Text>{this.props.userInfo.loginName}</Text>
          </View>
        </View>
        <View style={styles.list}>
          <List>
            {/* <Item
              thumb={<Icon
                name='user'
                color='red'
                size={25}
                style={{ marginRight: 15, width: 25, height: 25 }}
              />}
              onClick={() => {
                this.showModal({
                  component: {
                    ...Global.Screens.FarmersPortrait,
                  }
                });
              }}
            >
              农户画像
          </Item> */}
            {/* <Item
              thumb={<Icon
                name='file'
                color='#7bb046'
                size={25}
                style={{ marginRight: 15, width: 25, height: 25 }}
              />}
              onClick={() => {
                this.showModal({
                  component: {
                    ...Global.Screens.AgInfo,
                  }
                });
              }}
            >
              农技新闻
          </Item> */}
            {/* <Item
              thumb={<Icon
                name='tv'
                color='orange'
                size={25}
                style={{ marginRight: 15, width: 25, height: 25 }}
              />}
              onClick={() => {
                this.showModal({
                  component: {
                    ...Global.Screens.AgMic,
                  }
                });

              }}
            >
              农技微课
          </Item> */}
            {/* <Item
              thumb={<Icon
                name='key'
                color='#ffab00'
                size={25}
                style={{ marginRight: 15, width: 25, height: 25 }}
              />}
              onClick={() => {
                alert('修改密码')
              }}
            >
              密码修改
          </Item> */}
            <Item
              thumb={<Icon
                name='power-off'
                color='#666'
                size={25}
                style={{ marginRight: 15, width: 25, height: 25 }}
              />}
              onClick={() => {
                storage.remove('token');
                Global.Navigate.startLoginScreen();
              }}
            >
              注销
          </Item>
          </List>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // width: Dimensions.get('window').width,
  },
  baseinfo: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  list: {
    flex: 7,
  }
});
function mapStateToProps() {
  return {
    userInfo: store.getAccount()
  };
}

module.exports = connect(mapStateToProps)(Test);