import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
//进入登陆界面
const startLoginScreen = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: Global.Screens.Login,
                }]
            }
        }
    });
}

//进入首页
const startIndexScreen = () => {
    iconsLoaded.then(() => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    // left: {
                    //     component: Global.Screens.AllMenu
                    // },   
                    center: {
                        bottomTabs: {
                            children: [{
                                stack: {
                                    children: [{
                                        component: Global.Screens.AllMenu
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: '数字农场',
                                            icon: iconsMap['home'],
                                        }
                                    }
                                }
                            },
                            {
                                stack: {
                                    children: [{
                                        component: Global.Screens.ERPDiagnosis
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: '智能诊单',
                                            icon: iconsMap['file-text'],
                                        }
                                    }
                                }
                            },
                            {
                                stack: {
                                    children: [{
                                        component: Global.Screens.BarcodeScanner
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: '扫码追溯',
                                            icon: iconsMap['qrcode'],
                                        }
                                    }
                                }
                            },
                            {
                                stack: {
                                    children: [{
                                        component: Global.Screens.BuyProduct,
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: '买农资',
                                            icon: iconsMap['shopping-bag'],
                                        }
                                    }
                                }
                            },
                            {
                                stack: {
                                    children: [{
                                        component: Global.Screens.Mine
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: '我',
                                            icon: iconsMap['user'],
                                        }
                                    }
                                }
                            }]
                        },
                        statusBar: {
                            visible: false
                        }
                    }
                }
            }
        });
    });
}
//设置导航默认样式
const setDefaultOptions = () => {
    Navigation.setDefaultOptions({
        layout: {
            backgroundColor: '#fff',
        },
        bottomTabs: {
            titleDisplayMode: 'alwaysShow',
        },
        bottomTab: {
            iconColor: '#777',
            selectedIconColor: '#7bb046',
        },
        topBar: {
            height: 54,
            background: {
                color: '#7bb046'
            },
            title: {
                fontSize: 18,
                color: 'white',
                alignment: 'center',
                height: 54,
            },
            backButton: {
                color: 'white',
            }
        },
        statusBar: {
            backgroundColor: '#000',
        },
    });
}
export default {
    startLoginScreen,
    startIndexScreen,
    setDefaultOptions
}