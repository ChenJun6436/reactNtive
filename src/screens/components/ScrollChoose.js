import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
const ScrollChoose = (props) =>
    <ScrollView onTouchStart={(e) => { this.moved = false; }} onTouchMove={(e) => { this.moved = true; }} onTouchEnd={(e) => { if (!this.moved&&props.onPress) props.onPress() }} horizontal style={styles.chooseTextInput} showsHorizontalScrollIndicator={false} contentContainerStyle={{  alignItems: 'flex-end', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: '#000', fontSize: 18 }}>{props.value}</Text>
    </ScrollView>

const styles = StyleSheet.create({
    chooseTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#666',
        height: 30,
    },
});

export default ScrollChoose;