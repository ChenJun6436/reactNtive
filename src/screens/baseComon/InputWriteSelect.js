import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { InputItem, TextareaItem, Button, } from 'antd-mobile-rn'
import Icon from 'react-native-vector-icons/FontAwesome';
import CropStore from 'root/src/stores/crop';
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
export default class InputWriteSelect extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }
  async componentDidMount() {
  }
  render() {
    if (Array.isArray(this.props._value)) {
      this.valueData = this.props._value.join('，')
    } else {
      this.valueData = this.props._value
    }
    if (this.props.isNotSolo) {
      return (<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 12 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
          <View>
            <Text>{this.props._name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextareaItem
              title={this.props._name}
              clear
              value={this.valueData}
              autoHeight
              onChange={(value) => {
                if (this.props._type == 'ERPCrop') {
                  this.props.onChangeERPCrop && this.props.onChangeERPCrop(value)
                }
                if (this.props._type == 'ERPPest') {
                  this.props.onChangeERPPest && this.props.onChangeERPPest(value)
                }
              }}
            />
          </View>
        </View>
        <View><Button  activeStyle={{opacity:0.5,backgroundColor:'none'}}size="small" onClick={this.props._selectCrop}>+</Button></View>
      </View>)
    }
    else {
      return (
        <InputItem
          extra='+'
          textAlign="right"
          value={this.valueData}
          onExtraClick={this.props._selectCrop}
          onChange={(value) => {
            if (this.props._type == 'crop') {
              CropStore.setCropData(value.split(','))
              CropStore.setPestData(null)
            } if (this.props._type == 'pest') {
              CropStore.setPestData(value.split(','))
            }
            if (this.props._type == 'goods') {
              this.props.onChange && this.props.onChange(value)
            }
            if (this.props._type == 'ERPCrop') {
              this.props.onChangeERPCrop && this.props.onChangeERPCrop(value)
            }
            if (this.props._type == 'ERPPest') {
              this.props.onChangeERPPest && this.props.onChangeERPPest(value)
            }
          }}
        >
          {this.props._name}
        </InputItem>
      );
    }

  }
}
function mapStateToProps() {
  return {

  };
}
module.exports = connect(mapStateToProps)(InputWriteSelect);
