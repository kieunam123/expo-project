import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import {images,icons,FormatFont} from '../constants';
import {Buttons, Header} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Chat(props){
    const [chatHistory,setChatHistory]
    return(
        <View style={styles.container}>
            <Header name={'Chat'}/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.unread}>7 tin nhắn chưa đọc</Text>
                <Icon name={'trash-alt'} style={styles.unread} size={16} onPress={()=>{
                    alert(`you pressed delete`)
                }} />
            </View>
            <FlatList style={styles.list}>

            </FlatList>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        
    },
    unread:{
        padding:15,
    },
    list:{
        flex:1,

    }

})