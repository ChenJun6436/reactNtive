import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { Button, Grid, Carousel, SearchBar ,WingBlank, Tabs  } from 'antd-mobile-rn'
import store from 'root/src/stores/account';
import BrTag from '../baseComon/BrTag.js'
import VedioLeftText2Right from '../baseComon/VedioLeftText2Right.js'
import LoadMoreList from '../baseComon/LoadMoreList.js'
import * as AgInfoAction from 'root/src/actions/agInfo'
import * as purchasePaperAction from 'root/src/actions/account';
import Icon from 'react-native-vector-icons/Feather';
const { connect } = require('remx');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


@navigatorDecorator
class AgMic extends Component {
  constructor(props: {}) {
    super(props);
    const { App, navigator, Message } = this.props;
  }

  async componentDidMount() {
    //requestPermission();
  }
  changeTab(tab,ind) {
    console.log(tab+''+ind)
  }
  ///查看农技资讯详情
  _lookDetailInfo(id){
    this.pushPage({
      component: {
        ...Global.Screens.AgMicDetail,
        passProps: { id }
      }
    });
  }
  
 
  render() {
    const tabs = [
      { title: '种植微课' },
      { title: '养殖微课' },
    ]
    return (
      <View style={styles.container}>
        <Tabs tabs={tabs} initialPage={0} onTabClick={this.changeTab}>
          <ScrollView>
            <LoadMoreList
              ref={ref => this.moreListInst = ref}
              getData={AgInfoAction.getAg}
              searchParams={{ contentType: 2 }}
              rowItem={(data) => {
                return <VedioLeftText2Right click={()=>{this._lookDetailInfo(data.id)}} content={data}  key={data}/>
              }}
            />
          </ScrollView>
          <ScrollView>
            <LoadMoreList
              ref={ref => this.moreListInst = ref}
              getData={AgInfoAction.getAg}
              searchParams={{ contentType: 3 }}
              rowItem={(data) => {
                return <VedioLeftText2Right click={()=>{this._lookDetailInfo(data.id)}} content={data}  key={data}/>
              }}
            />
          </ScrollView>
        </Tabs>
      </View>
    );
  }
}
function mapStateToProps() {
  return {
    menuList: store.getMenuList()
  };
}

module.exports = connect(mapStateToProps)(AgMic);

