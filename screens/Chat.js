import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {images,icons,FormatFont} from '../constants';
import {Buttons, Header} from '../components';

export default function Chat(props){
    return(
        <View style={styles.container}>
            <Header name={'Chat'}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    }

})