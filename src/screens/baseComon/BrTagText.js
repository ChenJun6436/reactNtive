import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn'
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1'
  },
});
@navigatorDecorator
export default class BrTagText extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  async componentDidMount() {
  }
  _onPressButton = () => {
    const next = Global.Screens[this.props.url]
    this.pushPage({
      component: next
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', height: 25, alignItems: 'center' }}>
          {this.props.color ? <Text style={{ width: 5, height: 18, backgroundColor: this.props.color }}></Text> : null}
          <Text style={{ marginLeft: this.props.color ? 10 : 0, fontSize: 18 }}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}
