import React,{useState} from 'react';
import {StyleSheet,onChangeText,Text,View,Image,ImageBackground,TouchableOpacity,TextInput,KeyboardAvoidingView,Keyboard} from 'react-native';
import {images,icons,FormatFont,colors} from '../constants';

export default function FoodItem(props){
    let {name,img,status,price}=props.food
    const {onPress}=props
    return(
        <TouchableOpacity onPress={onPress}
        style={styles.container}>
            <Image source={{ uri: img }} style={styles.img} />
            <View style={styles.content}>
                <Text style={styles.name} >{name}</Text>
                <Text style={{ flex: 1, color: _getColorFromStatus(status), textTransform: 'capitalize' }}>{status}</Text>
                <Text>{price}VNĐ</Text>
            </View>
        </TouchableOpacity>
    );
}

function _getColorFromStatus(status){
    return status.toLowerCase().trim() == 'đang phục vụ' ? colors.success : 
    (status.toLowerCase().trim() == 'hết món' ? colors.warning : colors.success) 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        height:150,
        paddingTop:20,
        paddingStart:10,
    },

    content:{
        // flexDirection:'row',
        maxHeight:145,
        // paddingTop:5,
        paddingBottom:35,
    },

    img:{
        width:100,
        height:100,
        resizeMode:'cover',
        borderRadius:10,
        marginRight:15,
    },
    name:{
        flex:1,
        fontWeight:'bold',
        fontSize:FormatFont.h3,
    },
})