import {TouchableOpacity,Text} from 'react-native';
import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Octicons';

function Buttons(props){
    const {onPress,title,isSelected} = props
    return <TouchableOpacity 
    onPress={onPress}
    style={{
        borderColor : 'white',
        height: 45,
        borderRadius: 6,
        marginBottom:10,
        borderWidth:1,
        marginHorizontal:23,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        backgroundColor: isSelected==true ? '#3332' : null
    }}>
        {isSelected==true&&<Icon name={'check-circle-fill'} size={20} style={{
            color:'white',
            position:'absolute',
            left:10,}}/>}
        <Text style={{
            color:'white',
            textTransform:'capitalize'
        }}>
            {title}
        </Text>

    </TouchableOpacity>
}

export default Buttons;
