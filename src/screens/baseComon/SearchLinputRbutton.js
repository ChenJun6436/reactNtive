import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { WingBlank } from 'antd-mobile-rn'
import AgStore from 'root/src/stores/agInfo';
import Icon from 'react-native-vector-icons/Feather';
import * as AgInfoAction from 'root/src/actions/agInfo'
import { Button, Grid, Carousel, SearchBar, Checkbox, InputItem } from 'antd-mobile-rn'
// import { SIGFPE } from 'constants';
const { connect } = require('remx');
const CheckboxItem = Checkbox.CheckboxItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
@navigatorDecorator
export default class SearchLinputRbutton extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
    this.state = {
      content: '',
    }
  }
  componentWillMount(){
    this.setState({
      content: this.props.content
    })
  }
  render() {
    return (
      <View style={{ backgroundColor: '#fff', width: '100%'}}>
        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, justifyContent: 'space-between', backgroundColor: '#fff', borderColor: '#e3e3e3', borderBottomWidth: 1, borderTopWidth: 1 }}>
          <View style={{ height: 40, width:  '75%' , borderColor: '#e3e3e3', borderWidth: 1, borderRadius: 15, flexDirection: 'row' }}>
            <InputItem
              onChangeText={(content) => this.setState({ content })}
              value={this.state.content}
              style={{ height: 40, width: 220, marginLeft: 15 }}
              ref={el => this.inputRef = el}
            />
          </View>
          <Button type="primary" onClick={()=>{ this.props.search(this.state.content) } } style={{ height: 40, width: '20%' }}>搜索</Button>
        </View>
      </View>
    );
  }
}
function mapStateToProps() {
  return {
  };
}
module.exports = connect(mapStateToProps)(SearchLinputRbutton);