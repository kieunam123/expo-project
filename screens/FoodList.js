
import React,{useState} from 'react';
import {FlatList,ScrollView,onChangeText,Text,View,Image,ImageBackground,TouchableOpacity,TextInput,KeyboardAvoidingView,Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
import FoodItem from './FoodItem';

export default function FoodList(props){
    const [foods, setFoods] = useState([
        {
            name : 'Phở bò',
            img :'https://cdn.tgdd.vn/Files/2018/12/07/1136284/cach-nau-pho-bo-tai-nha-bang-xuong-heo-cho-nguoi-ban-ron-202201200943274821.jpg',
            status : 'đang phục vụ',
            price : 20000,
        },
        {
            name : 'Bún real',
            img:'https://i.ytimg.com/vi/C1P1Cw9J1-I/maxresdefault.jpg',
            status : 'đang phục vụ',
            price : 33000,
        },
        {
            name : 'Cơm Sườn',
            img :'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-0_1630562640.jpg',
            status : 'hết món',
            price : 25000,
        },
    ])
    return(
        <View>
            <Header name={'Menu'} />
            <FlatList
                data={foods}
                renderItem={({ item }) => <FoodItem
                    onPress={() => {
                        alert(`You have pressed ${item.name}`)
                    }}
                    food={item} key={item.name} />}
                keyExtractor={eachFood => eachFood.name}
            />
        </View>
    );
}