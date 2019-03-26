// @flow

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions
} from 'react-native';

import {
    PlaceholderContainer,
    Placeholder
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';


export default class PlaceholderLoading extends Component {

    loadingComponent: Promise<React.Element<*>>;
    componentWillMount() {
        let self = this;

        this.loadingComponent = new Promise(async resolve => {
            let data = await this.props.Store.search({ input: { pageIndex: 1, pageSize: PageSize } })
            resolve(<View style={{ flex: 1 }}>
                <SearchBar placeholder="搜索" maxLength={8} showCancelButton/>
                <TabViewAnimated
                    style={{ flex: 1 }}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </View>)
        });
    }

    render() {
        return (
            <PlaceholderContainer
                style={styles.placeholderContainer}
                animatedComponent={<Gradient />}
                duration={1000}
                delay={1000}
                loader={this.loadingComponent}
            >
                <View style={{ flexDirection: 'row' }}>

                    <View
                        style={{
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Placeholder
                            style={[
                                styles.placeholder,
                                {
                                    width: '50%',
                                    height: 10
                                }
                            ]}
                        />
                        <Placeholder
                            style={[
                                styles.placeholder,
                                {
                                    width: '35%',
                                    height: 7
                                }
                            ]}
                        />
                    </View>
                </View>

                <Placeholder
                    style={[styles.placeholder, { marginTop: 20, width: '80%' }]}
                />
                <Placeholder style={[styles.placeholder, { width: '90%' }]} />
                <Placeholder style={[styles.placeholder, { width: '50%' }]} />
            </PlaceholderContainer>
        )
    }
}
const Gradient = (): React.Element<*> => {
    return (
        <LinearGradient
            colors={['#eeeeee', '#dddddd', '#eeeeee']}
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.0 }}
            style={{
                flex: 1,
                width: 120
            }}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    placeholderContainer: {
        flex: 1,
        backgroundColor: '#fff',
        height: 200
    },
    placeholder: {
        height: 8,
        marginTop: 6,
        marginLeft: 15,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee'
    },
    row: {
        flexDirection: 'row',
        width: '100%'
    }
});
