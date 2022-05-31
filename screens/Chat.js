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
  TouchableOpacity,
} from 'react-native';
import {images,icons,FormatFont} from '../constants';
import {Buttons, Header} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ChatItem from './ChatItem';

export default function Chat(props){
    const{navigation,route}=props
    const{navigate,goBack}=navigation
    const [users,setUSers] = useState([
        {
            url:'https://randomuser.me/api/portraits/men/0.jpg',
            name:'alab mar khalad',
            message:'send nudes',
            inbox:'1',
            status:'4 minutes ago',
        },
        {
            url:'https://randomuser.me/api/portraits/men/1.jpg',
            name:'le van A',
            message:'em dep lam',
            inbox:'7',
            status:'Online',
        },
        
        {
            url:'https://randomuser.me/api/portraits/men/8.jpg',
            name:'Jonny sins',
            message:'fk u',
            inbox:'20',
            status:'1 minutes ago',
        },
        
        {
            url:'https://randomuser.me/api/portraits/men/10.jpg',
            name:'minh nguyen',
            message:'xin chao',
            inbox:'3',
            status:'4 minutes ago',
        },
        

    ]);
    return (
        <View style={styles.container}>
            <Header name={'Chat'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.unread}>7 tin nhắn chưa đọc</Text>
                <TouchableOpacity
                    onPress={() => {
                        alert(`you pressed delete`)
                    }}>
                    <Icon name={'trash-alt'} style={styles.unread} size={16} />
                </TouchableOpacity>
            </View>
            <FlatList 
                style={styles.list}
                data={users}
                renderItem={({ item }) => <ChatItem
                    onPress={() => {
                        navigate('messenger',{users:item})
                    }}
                    users={item} key={item.name} />}
                keyExtractor={item => item.name}>
            </FlatList>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex:1,
        
    },
    unread:{
        padding:15,
    },
    list:{
        // flex:1,

    }

})