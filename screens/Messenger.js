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
import Messages from './Messages';
export default function Messenger(props){
    const {name}=props.route.params.users
    const {navigate,goBack}=props.navigation
    const [messages,setMessages] = useState([
        {
            url:'https://randomuser.me/api/portraits/men/0.jpg',
            name : 'sender',
            message:'send nudes',
            isSender:true,

        },
        {
            url:'https://randomuser.me/api/portraits/men/1.jpg',
            name : 'receiver',
            message:'zzem dep lamsdsadaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbzzzzbbbbbbcddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddz',
            status:'Online',
            isSender:false,
        },
        {
            url:'https://randomuser.me/api/portraits/men/0.jpg',
            name : 'sender2',
            message:'helloooo',
            isSender:true,
        },
        {
            url:'https://randomuser.me/api/portraits/men/1.jpg',
            name : 'receiver2',
            message:'shi how are uuuuuu',
            isSender:false,

        },


    ]);
    return (
        <View style={styles.container}>
            <Header name={name} 
            rightIconName={'menu'}
            onPressLeftIcon={()=>{
                goBack()
            }}
            />
            <FlatList
                style={styles.list}
                data={messages}
                renderItem={({ item }) => <Messages
                    messages={item} key={item.name} />}
                keyExtractor={item => item.name}>
            </FlatList>


        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    unread:{
        padding:15,
    },
    list:{
        // flex:1,

    }

})