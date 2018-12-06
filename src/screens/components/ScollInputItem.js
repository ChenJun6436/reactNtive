import React from 'react';
import { InputItem } from 'antd-mobile-rn';
const ScollInputItem = (props) => {
    return <InputItem
        textAlign="right"
        clear
        keyboardType={"default"}
        multiline={true}
        maxLength={16}
        {...props}
    >
    </InputItem>
}
export default ScollInputItem;