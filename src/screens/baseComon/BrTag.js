import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
import Icon from 'react-native-vector-icons/FontAwesome';
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1'
  },
});
@navigatorDecorator
export default class BrTag extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  async componentDidMount() {
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          {this.props.color ? <Text style={{ width: 5, height: 18, backgroundColor: this.props.color, lineHeight: 20 }}></Text> : null}
          <Text style={{ marginLeft: 10, fontSize: 16, lineHeight: 20 }}>{this.props.title}</Text>
        </View>
        {this.props.url ? (
          <TouchableOpacity onPress={this.props.click}>
            <Text style={{ marginRight: 10, fontSize: 18, lineHeight: 20 }}><Icon name='angle-right' size={20} /></Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
