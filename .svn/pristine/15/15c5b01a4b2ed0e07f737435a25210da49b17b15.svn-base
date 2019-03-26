import React, { Component } from 'react';
//该方式可执行父类同名方法
const NavigatorDecorator = (superclass) => class extends superclass {
    constructor(props: Props) {
        super(props);
        Navigation.events().registerComponentDidDisappearListener((componentId, componentName) => {
            setTimeout(() => {
                this.changingPage = false;
            }, 300)
        });
    }
    //页面跳转
    pushPage = (param) => {
        if (!this.changingPage) {
            this.changingPage = true;
            Navigation.push(this.props.componentId, param);
        }
    }
    //返回
    pop = (param, navigator) => {
        Navigation.pop(this.props.componentId);
    }
    //弹窗
    showModal = (param) => {
        if (!this.changingPage) {
            this.changingPage = true;
            Navigation.showModal(param)
        }
    }
    //关闭弹窗
    dismissModal = (param) => {
        Navigation.dismissModal(this.props.componentId)
    }
    //回到登陆界面
    startLoginScreen = () => {
        if (!this.changingPage) {
            this.changingPage = true;
            Global.Navigate.startLoginScreen()
        }
    }
    //进入首页
    startIndexScreen = () => {
        if (!this.changingPage) {
            this.changingPage = true;
            Global.Navigate.startIndexScreen()
        }
    }
};

export default NavigatorDecorator;