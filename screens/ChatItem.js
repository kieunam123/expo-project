import React,{useState} from 'react';
import {StyleSheet,onChangeText,Text,View,Image,ImageBackground,TouchableOpacity,TextInput,KeyboardAvoidingView,Keyboard} from 'react-native';
import {images,icons,FormatFont,colors} from '../constants';

export default function ChatItem(props){
    let {name,url,message,inbox,status}=props.users
    const {onPress}=props
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.line}>1</Text>
            <View style={styles.avatar}>
                <Image source={{ uri: url }} style={styles.img} />
                <Text style={styles.inboxNumber}>{inbox}</Text>
            </View>
            <View style={styles.info} >
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.message}>{message}</Text>
            </View>
            <View style={styles.status}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        paddingStart:10,
        // height:150,

    },
    status:{
        flexDirection:'column',
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end',
        
    },
    statusText:{
        color:'grey',
        fontStyle:'italic',
        marginRight:10
    },

    avatar:{
        marginVertical:10,
        
    },
    inboxNumber:{
        backgroundColor:'red',
        position:'absolute',
        right:10,
        fontSize:12,
        color:'white',
        borderRadius:9,
        paddingHorizontal:4,
        overflow:'hidden'
    },
    line:{
        backgroundColor: 'rgba(193, 190, 190, 0.11)', height: 1, flex: 1, position: 'absolute',paddingHorizontal:500

    },
    info:{
        flexDirection:'column',
        marginTop:10,
    },

    info2:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    message:{
        // marginBottom:80,
    },

    content:{
        // flexDirection:'row',
        maxHeight:145,
        // paddingTop:5,
        paddingBottom:35,
    },

    img:{
        width:77,
        height:77,
        resizeMode:'cover',
        borderRadius:50,
        marginRight:15,
    },
    name:{
        // flex:1,
        fontWeight:'bold',
        fontSize:FormatFont.h3,
    },
})