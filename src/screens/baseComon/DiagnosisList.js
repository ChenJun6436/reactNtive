// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import CropStore from 'root/src/stores/crop';
const { connect } = require('remx');
export default class DiagnosisList extends Component {
    render() {
        const content = this.props.content
        const pestData = this.props.pestData
        const cropData = this.props.cropData
        if( pestData && !Array.isArray(pestData)){
            const nowPest = pestData.split('，')
        }else{
            nowPest = pestData
        }
        if( cropData && !Array.isArray(cropData)){
            const nowCrop = cropData.split('，')
        }else{
            nowCrop = cropData
        }
        return (
            <View style={styles.container} >
                {
                    cropData?(
                        nowCrop.length>0?(
                            nowCrop.length == 1?(
                                nowCrop[0] == content.nameCn?(
                                    <View style={styles.isSelect}></View>
                                ):(null)
                            ):(
                                nowCrop.map((i)=>{
                                    if(i == content.nameCn){
                                       return <View key={i} style={styles.isSelect}></View>
                                    }
                                })
                            )
                        ):(
                            cropData == content.nameCn?(
                                <View style={styles.isSelect}></View>
                            ):(null)
                        )       
                    ):(null)
                }
                {
                    pestData?(
                        nowPest.length>0?(
                            nowPest.length == 1?(
                                nowPest[0] == content.pest?(
                                    <View style={styles.isSelect}></View>
                                ):(null)
                            ):(
                                nowPest.map((i)=>{
                                    if(i == content.pest){
                                       return <View key={i} style={styles.isSelect}></View>
                                    }
                                })
                            )
                        ):(
                            pestData == content.pest?(
                                <View style={styles.isSelect}></View>
                            ):(null)
                        )       
                    ):(null)
                }
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: 120, }}>
                    {
                        content.imageUrl ? <Image
                            source={{ uri: content.imageUrl }}
                            style={styles.imgSty}
                        /> : <Image
                                source={require('root/img/nopic.gif')}
                                style={styles.imgSty}
                            />
                    }
                </View>
                <View style={{ width: '100%' }}>
                    <Text numberOfLines={1} style={{ lineHeight: 60, fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>{content.nameCn ? content.nameCn : content.pest}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        borderRadius: 5,
        marginLeft: '5%',
        marginBottom: 10,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 3,
    },
    imgSty: {
        width: '90%',
        height: 120,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    isSelect:{
        position:'absolute',
        left:0,
        top:0,
        bottom:0,
        right:0,
        borderWidth: 6,
        borderRadius: 5,
        borderColor:'#46bd0b',
    }
});
function mapStateToProps() {
    return {
        cropData: CropStore.getCropData(),
        pestData: CropStore.getPestData(),
    };
}
module.exports = connect(mapStateToProps)(DiagnosisList);