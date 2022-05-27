import React,{useState} from 'react';
import { StyleSheet, Text,View,Image,ImageBackground,TouchableOpacity } from 'react-native';
import { Buttons } from '../components';
import {images,icons, FormatFont} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen(props){
    const{navigation,route}=props
    const{navigate,goBack}=navigation

    const[chooseOptions,setChooseOptions] = useState([
        {
            name: 'thành viên',
 
        },
        {
            name: 'guest',

        },
        {
            name:'admin',
        },
    ])
    return (
        <View style={styles.container}>
            <ImageBackground source={images.background} style={styles.container}>
                <View style={styles.head}>
                    <Image source={icons.flame} style={styles.logo}></Image>
                    <Text style={styles.headText}>kieunamapp</Text>
                    <Text style={{ flex: 1 }}></Text>
                    <Icon name={'ios-information-circle-outline'} size={30} style={styles.logo2}/>
                </View>
                <View style={styles.upperBody}>
                    <Text style={styles.upperBodyText}>Welcome To</Text>
                    <Text style={styles.appname}>kieunamapp</Text>
                    <Text style={styles.upperBodyText}> Vui lòng lựa chọn dịch vụ</Text>
                </View>
                <View style={styles.lowerBody}>
                    {chooseOptions.map(chooseOption => <Buttons key={chooseOption.name}
                        onPress={() => {
                            let newchooseOptions = chooseOptions.map(eachchooseOption => {
                                return {
                                    ...eachchooseOption,
                                    isSelected: eachchooseOption.name == chooseOption.name,
                                }
                            })
                            setChooseOptions(newchooseOptions);
                    }}
                        title={chooseOption.name}
                        isSelected={chooseOption.isSelected}
                    />
                    )}
                </View>
                <View style={styles.foot}>
                    <TouchableOpacity style={styles.dangnhap}
                        onPress={() => { navigate('Login') }}>
                        <Text style={{ color: 'white' }}>Đăng Nhập</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    head:{
        flex: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 65,
        // paddingBottom:10,
    },

    upperBody:{
        flex: 23,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    upperBodyText:{
        marginBottom:10,
        color:'white',

    },

    lowerBody:{
        flex: 40,
    },

    foot:{
        flex:35,

    },

    dangky:{
        color: 'white',
        textTransform: 'capitalize',
        textDecorationLine: 'underline',
        paddingTop: 10,
    },

    logo:{
        maxWidth: 35,
        maxHeight: 50,
        marginHorizontal: 20,
        tintColor: 'white',
        // color:'white',
    },
    logo2:{
        maxWidth: 35,
        maxHeight: 50,
        marginHorizontal: 20,
        color:'white'
    },

    headText:{
        color: 'white',
        fontSize: 25,
        fontWeight: '800',
        textTransform:'uppercase',
        marginBottom:10,
    },
    dangnhap:{
        borderColor : 'white',
        height: 60,
        borderRadius: 6,
        marginBottom:10,
        borderWidth:1,
        marginHorizontal:23,
        justifyContent:'center',
        alignItems:'center',
    },

    appname:{
        marginBottom: 10, color: 'white', fontSize: 20, fontWeight: '900', fontSize: FormatFont.normal, textTransform:'uppercase' 
    },


  });