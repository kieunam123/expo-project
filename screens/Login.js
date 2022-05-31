import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,View,Image,ImageBackground,TouchableOpacity,TextInput,KeyboardAvoidingView,Keyboard,TouchableHighlight } from 'react-native';
import {images,icons,FormatFont} from '../constants';
import {Buttons} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isValidEmail, isValidPassword,loginwithOffice365 } from '../ulities/Validation';
import {
    app,
    database,
    onAuthStateChanged,
    firebaseRef,
    firebaseSet,
    get,
    child,
    signInWithEmailAndPassword,
    auth,
} from '../firebase/firebase'
export default function Login(props){
    //navigate function
    const{navigation,route}=props
    const{navigate,goBack}=navigation
    //vallidation
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const isValidationOK = () => Email.length > 0 && Password.length > 0
    && isValidEmail(Email) == true
    && isValidPassword(Password) == true

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.container} source={images.background}>

                <View style={styles.head}>

                </View>

                <View style={styles.body}>
                    <Text style={styles.header}>đăng nhập</Text>
                    <View style={styles.form}>
                        <Text style={styles.email}>email:</Text>
                        <TextInput style={styles.input}
                            placeholder='example@gmail.com'
                            placeholderTextColor={'white'}
                            onChangeText={(text) => {
                                setErrorEmail(isValidEmail(text) == true ?
                                    ' ' : 'Email không đúng định dạng')
                                setEmail(text)
                            }}
                        />
                        <Text style={styles.error}>{errorEmail}</Text>
                        <Text style={styles.password}>password:</Text>
                        <TextInput style={styles.input}
                            placeholder='Enter your password'
                            secureTextEntry={true}
                            placeholderTextColor={'white'}
                            onChangeText={(text)=>{
                                setErrorPassword(isValidPassword(text)==true ?
                                    ' ' : 'Password phải có độ dài 7 đến 14 ký tự')
                                setPassword(text)
                            }}
                        />
                        <Text style={styles.error}>{errorPassword}</Text>
                        <TouchableOpacity
                            disabled={isValidationOK() == false}
                            onPress={() => { 
                                signInWithEmailAndPassword(auth,Email,Password)
                                .then((userCredential)=>{
                                    const user = userCredential.user
                                    // firebaseSet(firebaseRef(
                                    //     database,
                                    //     `users/${user.uid}`
                                    // ),{
                                    //     email:user.email,
                                    //     emailVerified:user.emailVerified,
                                    //     accessToken:user.accessToken
                                    // })
                                    navigate('tab')
                                }).catch((error)=>{
                                    alert(`Tên đăng nhập hoặc mật khẩu của bạn bị sai. Vui lòng thử lại`)
                                })
                             }}
                            style={styles.button}>
                            <Text style={styles.buttonText}>log in</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.foot}>
                    <Text style={styles.text}>Don't have account? Sign in with</Text>
                    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                        <TouchableOpacity>
                            <Icon name='facebook-square' style={styles.facebook} size={40}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='google' style={styles.google} size={40}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='twitter' style={styles.twitter} size={40}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigate('microsoft')}} >
                            <Image source={icons.windows} style={styles.logo}></Image>
                        </TouchableOpacity>
                    </View>
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
        flex:15,
    },

    body:{
        flex: 90,
        alignItems: 'center'
    },

    foot:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 490,
        paddingHorizontal: 85,
        position: 'absolute'
    },

    form:{
        width: '100%',
        padding: 20,
    },

    email:{
        textTransform: 'capitalize',
        marginBottom: 10,
        fontSize: FormatFont.normal,
        color: 'white',
    },

    password:{
        textTransform: 'capitalize',
        marginBottom: 10,
        fontSize: FormatFont.normal,
        marginTop: 20,
        color: 'white'
    },

    input: {
        borderWidth: 1,
        height: 40,
        borderColor: 'white',
        borderRadius: 20,
        borderStyle: 'solid',
        padding: 10
    },

    logo:{
        maxWidth: 35,
        maxHeight: 45,
    },

    button:{
        marginTop: 30,
        alignSelf: 'center',
        borderWidth: 1,
        height: 40,
        width: '40%',
        borderColor: 'white',
        borderRadius: 20,
        borderStyle: 'solid',
        padding: 10
    },

    buttonText:{
        alignSelf: 'center',
        color: 'white',
        textTransform:'uppercase',
    },

    facebook:{
        color: '#3b5998', paddingHorizontal: 20
    },

    google:{
        color: '#DB4437'
    },

    twitter:{
        color: '#1D9BF0', paddingHorizontal: 20
    },

    windows:{

    },

    text:{
        color: 'white',
        textTransform: 'capitalize',
        fontSize: FormatFont.normal,
        paddingBottom: 10,
    },

    header:{
        fontSize: FormatFont.h2,
        textTransform: 'uppercase',
        fontWeight: '800',
        color: 'white',
    },
    error:{
        color:'rgb(236, 100, 100)',
        fontSize:FormatFont.normal,
    },

  });