/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native';
import moment from 'moment';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import Taxonomy from './Taxonomy'
import PurchaseRecord from './PurchaseRecord'
// @loadingDecorator
// @navigatorDecorator
const FirstRoute = () => (
    <View style={[styles.container]} ><Taxonomy /></View>
);
const SecondRoute = () => (
    <View style={[styles.container]} ><PurchaseRecord /></View>
);
export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '农户画像' },
                { key: 'second', title: '农资店' },
            ],
        };
    }
    componentWillMount() {
    }

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{ backgroundColor: '#7bb046' }}
                    />
                }
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        // paddingTop: Constants.statusBarHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});

// AppRegistry.registerComponent('Statistics', () => Statistics);
