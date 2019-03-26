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
export default class ImgLeftText2Right extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  async componentDidMount() {
  }
  render() {
    const content = this.props.content
    return (
      <WingBlank size={'lg'} style={{ paddingTop: 10, paddingBottom: 10 }}>
        <TouchableOpacity onPress={this.props.click}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', borderBottomColor: '#e0e0e0', borderBottomWidth: 1, paddingBottom: 10 }}>
    {content.attachments.length > 0 ? (<Image style={{ width: 150, height: 80, marginRight: 20 }} source={{uri: content.attachments[0].url}} />) : null}
            <View style={{ justifyContent: 'space-between', flex: 1, height: content.attachments ? 80 : 60 }}>
              <Text numberOfLines={2} style={{ fontSize: 16 }}>{content.title}</Text>
              <View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text numberOfLines={1} style={{ fontSize: 14, lineHeight: 19, maxWidth: 80, }}>{content.source}</Text>
                <Text style={{ marginLeft: 10 }}>阅读 {content.readCount}</Text>
                <Text style={{ marginLeft: 10 }}>评论 {content.commentCount}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </WingBlank>
    );
  }
}
