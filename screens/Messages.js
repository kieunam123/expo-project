import React,{useState} from 'react';
import {StyleSheet,onChangeText,Text,View,Image,ImageBackground,TouchableOpacity,TextInput,KeyboardAvoidingView,Keyboard} from 'react-native';
import {images,icons,FormatFont,colors} from '../constants';
import { screenWidth } from '../ulities/Device';

export default function Messages(props){
    let {name,url,message,inbox,status,isSender}=props.messages
    const {onPress}=props
    return (

        //if
        isSender == false ?

            <View
                style={styles.container}>
                <Image source={{ uri: url }} style={styles.img} />
                <View style={styles.items}>
                    <Text style={styles.messages}>{message}</Text>
                </View>
            </View>
            
        : //else

            <View
                style={styles.container2}>
                
                <View style={styles.items2}>
                
                    <Text style={styles.messages2}>{message}</Text>
                    <Image source={{ uri: url }} style={styles.img2} />
                </View>
            </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:20,
        // height:150,
    },
    container2:{
        flex:1,
        flexDirection:'row',
        padding:20,
        justifyContent:'flex-end'
        // height:150,
    },
    img:{
        width:40,
        height:40,
        resizeMode:'cover',
        borderRadius:50,
        marginRight:15,
    },
    img2:{
        width:40,
        height:40,
        resizeMode:'cover',
        borderRadius:50,
        marginLeft:15,
        justifyContent:'flex-end'
    },
    messages:{
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:'rgba(193, 190, 190, 0.11)',
        borderRadius:20,
        overflow:'hidden',
        fontSize:15

    },
    messages2:{
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:'rgba(193, 190, 190, 0.11)',
        borderRadius:20,
        overflow:'hidden',
        fontSize:15,
        justifyContent:'flex-end'

    },

    items:{
        flexDirection:'row',
        paddingEnd:25,
        width:screenWidth*0.7,
        alignItems:'center'  
   },
   items2:{
    flexDirection:'row',
    paddingStart:25,
    width:screenWidth*0.7,
    alignItems:'center'  ,
    justifyContent:'flex-end'
},
})