import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import React, {Component} from 'react'
import { FormatFont } from '../constants';

export default function Header(props){
    const {name}=props
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.name}>{name}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        height:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'pink',
        
    },
    name:{
        color:'white',
        fontSize:FormatFont.h2,
        textTransform:'Capitalize',
        paddingBottom:10,

    }

})