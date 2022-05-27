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
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header(props) {
    const { name,
        leftIconName = 'ios-chevron-back',
        rightIconName = 'ios-search',
        onPressLeftIcon,
        onPressRightIcon,
    } = props
    return (
        <SafeAreaView style={styles.container}>
            <Icon style={styles.iconleft}
                name={leftIconName}
                size={35}/>
            <Text style={styles.name}>{name}</Text>
            <Icon style={styles.iconright}
                name={rightIconName}
                size={30}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        height:100,
        backgroundColor:'pink',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    name:{
        color:'white',
        fontSize:FormatFont.h2,
        textTransform:'capitalize',
        paddingBottom:10,
        

    },
    iconleft:{
        color:'white',
        paddingHorizontal:20,

    },
    iconright:{
        paddingHorizontal:20,
        color:'white'
    }

})