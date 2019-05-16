import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default function WithErrorBoundary(WrappedComponent) {
    class WithErrorBoundary extends Component {
        constructor() {
            super()

            // Construct the initial state
            this.state = {
                hasError: false,
                error: null,
                errorInfo: null
            }
        }

        componentDidCatch(error, info) {
            // Update state if error happens
            this.setState({ hasError: true, error, errorInfo: info })

            // Report errors
            //process.env.NODE_ENV == "production" && errorCallback(error, info)
        }

        render() {
            // if state contains error we render fallback component
            if (this.state.hasError) {
                const { error, errorInfo } = this.state
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}><Text>页面出错啦</Text><Text>请联系管理员修复</Text></View>
                )
            }

            return <WrappedComponent {...this.props} />
        }
    }
    //修改名字便于调试
    WithErrorBoundary.displayName = `WithErrorBoundary(${getDisplayName(WrappedComponent)})`
    //高阶组件拷贝静态方法
    WithErrorBoundary.staticMethod = WrappedComponent.staticMethod;
    return WithErrorBoundary
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.__proto__.name;
}