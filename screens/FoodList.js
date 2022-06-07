import React, { useState, useEffect } from 'react';
import { Alert, TouchableWithoutFeedback, StyleSheet, FlatList, ScrollView, onChangeText, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header} from '../components';
import FoodItem from './FoodItem';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Device from '../ulities/Device'
import Modal from 'react-native-modal'
import DropDownPicker from 'react-native-dropdown-picker';
import { Ios, screenWidth } from '../ulities/Device';

import {
    remove,
    push,
    firebase,
    app,
    database,
    onAuthStateChanged,
    firebaseRef,
    firebaseSet,
    get,
    child,
    signInWithEmailAndPassword,
    auth,
    onValue,
} from '../firebase/firebase';

export default function FoodList(props) {
    const dbref = firebaseRef(database)
    const [foods, setFoods] = useState([])

//auto get all data from database
    useEffect(() => {
        get(child(dbref, `foods`)).then((snapshot) => {
            if (snapshot.exists()) {
                let value = snapshot.val()
                setFoods(Object.values(value).map(eachObject => {
                    return {
                        img: eachObject.img,
                        name: eachObject.name,
                        price: eachObject.price,
                        status: eachObject.status,
                    }
                }))
            } else {
                console.log('No data available')
            }
        })
    }, [])


//get each data after modified
    const get_data = () => {
        get(child(dbref, 'foods')).then((snapshot) => {
            let array=[]
            if (snapshot.exists()) {
                let value = snapshot.val()
                setFoods(Object.values(value).map(eachObject => {
                    return {
                        img: eachObject.img,
                        name: eachObject.name,
                        price: eachObject.price,
                        status: eachObject.status,
                    }
                }))
            } else {
                console.log('No data available')
            }
        })
    }

    const [modalOpen, setModalOpen] = useState()
    const [modalEditOpen,setModalEditOpen] = useState(false)
    const [dropdown, setDropdownOpen] = useState(false)
    const [dropdownValue, setDropdownValue] = useState([]);
    const [dropdownItems, setdropdownItems] = useState([
        { label: 'đang phục vụ', value: 'đang phục vụ' },
        { label: 'hết món', value: 'hết món' }
    ]);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [img, setImg] = useState('https://image.winudf.com/v2/image1/Y29tLmJlc3Rfc2VsbGVyX2ljb25fMTYyNTQ0NDQ5OF8wMzQ/icon.png?w=100&fakeurl=1&type=.webp');
    const [status, setStatus] = useState();

    //add product
    function Push(name, price, img, dropdownValue) {
       firebaseSet(firebaseRef(database, `foods/${name}`), {
            name: name,
            price: price,
            img: img,
            status: dropdownValue
        });
    }

    //modify product
    function Edit(name,price,img,dropdownValue){
        firebaseSet(firebaseRef(database,`foods/${name}`),{
            name:name,
            price:price,
            img:img,
            status:dropdownValue,
        });
    }
    //delete product
    function Delete(name){
        remove(firebaseRef(database,`foods/${name}`))
        
    }

    const createThreeButtonAlert = (item) =>
    Alert.alert(
      `${item.name}`,
      " ",
      [

        {
          text: "Xoá",
          onPress: () => {
              Delete(item.name)
              get_data()
            }
        },
       
        { text: "Sửa",
        onPress: () => {setModalEditOpen(true)} },
       
        {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
      ]
    );
    

    
    return (
        <View style={{ flex: 1 }}>
            <Header name={'Menu'} />
            
                <FlatList
                    data={foods}
                    renderItem={({ item }) => <FoodItem
                        swipeOutBtn={ [
                            {
                                text:'Sửa',
                                type:'primary',
                                onPress:()=>{
                                    setModalEditOpen(true)
                                    
                                }
                            },
                            {
                                text:'Xoá',
                                type:'delete',
                                onPress:()=>{
                                    Alert.alert(
                                        `Xoá ${item.name}`,
                                        'Bạn chắc chắn muốn xoá?',
                                        [
                                            {text:'No',onPress:()=>{},style:'cancel'},
                                            {text:'Yes',onPress:()=>{
                                                Delete(item.name)
                                                get_data()
                                            }},
                                        ],
                        
                                        {cancelable:true}
                                    );
                                }
                            },
                        ]
                    }
                        onPress={() => {
                            createThreeButtonAlert(item)
                            // setModalEditOpen(true)
                        }}
                        food={item} key={item.name} />}
                    keyExtractor={eachFood => eachFood.name}
                />

            <Modal
                hasBackdrop={true}
                position='center'
                isVisible={modalOpen}
                onBackdropPress={() => setModalOpen(false)}
            >
                <View style={styles.container} keyboardShouldPersistTaps='handled' >
                    <View style={styles.modalHeader}>
                        <View />
                        <Text style={styles.text}>Thêm sản phẩm</Text>
                        <Icon style={styles.close} name={'close'} size={25} onPress={() => setModalOpen(false)} />
                    </View>
                    <View style={styles.modalBody}>
                        {/* <ScrollView contentContainerStyle={styles.row} keyboardShouldPersistTaps='handled'>
                            <Text>ID    </Text>
                            <TextInput style={styles.input2} onChangeText={(text) => { setId(text) }}  />
                            <Icon name="check" color="green" size={30} />
                        </ScrollView> */}
                        <ScrollView contentContainerStyle={styles.row}>
                            <Text>Tên sản phẩm</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setName(text) }} />
                            <Icon name="check" color="green" size={30} />
                        </ScrollView>
                        <ScrollView contentContainerStyle={styles.row} keyboardShouldPersistTaps='handled'>
                            <Text style={{ marginRight: 77 }}>Giá</Text>
                            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(text) => { setPrice(text) }} />
                            <Icon name="check" color="green" size={30} />
                        </ScrollView>
                        <ScrollView contentContainerStyle={styles.row} keyboardShouldPersistTaps='handled'>
                            <Text style={{ marginRight: 23 }}>Image URL</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setImg(text) }} placeholder='default' placeholderTextColor={'grey'}/>
                            <Icon name="check" color="green" size={30} />
                        </ScrollView>
                        <View style={styles.row}>
                            <Text>Trạng thái</Text>
                            <DropDownPicker
                                style={styles.dropdown}
                                open={dropdown}
                                items={dropdownItems}
                                value={dropdownValue}
                                containerStyle={styles.dropdownContainer}
                                labelStyle={styles.dropdownContainer}
                                setOpen={setDropdownOpen}
                                setValue={setDropdownValue}
                                setItems={setdropdownItems} />
                        </View>
                        <TouchableOpacity
                            style={styles.button} onPress={() => {
                                Push(name, price, img, dropdownValue)
                                get_data()
                                setModalOpen(false)
                            }}
                        >
                            <Text style={styles.buttonText}>THÊM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* edit product modal */}
            <Modal
                hasBackdrop={true}
                position='center'
                isVisible={modalEditOpen}
                onBackdropPress={() => setModalEditOpen(false)}
            >
                <View style={styles.container} keyboardShouldPersistTaps='handled' >
                    <View style={styles.modalHeader}>
                        <View />
                        <Text style={styles.text}>SỬA SẢN PHẨM</Text>
                        <Icon style={styles.close} name={'close'} size={25} onPress={() => setModalEditOpen(false)} />
                    </View>
                    <View style={styles.modalBody}>
                        {/* <ScrollView contentContainerStyle={styles.row} keyboardShouldPersistTaps='handled'>
                     <Text>ID    </Text>
                     <TextInput style={styles.input2} onChangeText={(text) => { setId(text) }} value={id} />
                     <Icon name="check" color="green" size={30} />
                 </ScrollView> */}
                        <ScrollView contentContainerStyle={styles.row}>
                            <Text>Tên sp cần sửa</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setName(text) }} values={foods.name} placeholder={name} placeholderTextColor={'grey'} />
                            <Icon name="check" color="green" size={30} />
                        </ScrollView>
                        <ScrollView contentContainerStyle={styles.row} keyboardShouldPersistTaps='handled'>
                            <Text style={{ marginRight: 77 }}>Giá</Text>
                            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(text) => { setPrice(text) }} />
                            <Icon name="check" color="green" size={30} />
                        </ScrollView>
                        <ScrollView contentContainerStyle={styles.row} keyboardShouldPersistTaps='handled'>
                            <Text style={{ marginRight: 23 }}>Image URL</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setImg(text) }} placeholder='default' placeholderTextColor={'grey'} />
                            <Icon name="check" color="green" size={30} />
                        </ScrollView>
                        <View style={styles.row}>
                            <Text>Trạng thái</Text>
                            <DropDownPicker
                                style={styles.dropdown}
                                open={dropdown}
                                items={dropdownItems}
                                value={dropdownValue}
                                containerStyle={styles.dropdownContainer}
                                labelStyle={styles.dropdownContainer}
                                setOpen={setDropdownOpen}
                                setValue={setDropdownValue}
                                setItems={setdropdownItems} />
                        </View>
                        <TouchableOpacity
                            style={styles.button} onPress={() => {
                                Edit(name,price, img, dropdownValue)
                                get_data()
                                setModalEditOpen(false)
                            }}
                        >
                            <Text style={styles.buttonText}>SỬA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={{ position: 'absolute', marginTop: Ios() ? 700 : 500, marginStart: 300 }}
                onPress={() =>
                    setModalOpen(true)
                }>
                <Icon name={'plus'} size={80} style={{ marginEnd: 20, color: 'grey' }} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'pink',
        borderRadius: Ios() ? 30 : 0,
        shadowRadius: 10,
        height: 500,
    },
    text: {
        color: 'white'
    },

    close: {
        color: 'white',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center',

    },
    modalBody: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        borderBottomStartRadius: Ios() ? 30 : 0,
        borderBottomEndRadius: Ios() ? 30 : 0,
    },

    input: {
        borderWidth: 1,
        height: 40,
        width: 190,
        borderColor: 'black',
        borderRadius: 10,
        borderStyle: 'solid',
        marginHorizontal: 10,
        paddingHorizontal: 15,


    },
    input2: {
        borderWidth: 1,
        height: 40,
        width: 50,
        borderColor: 'black',
        borderRadius: 5,
        borderStyle: 'solid',
        marginLeft: 80,
        marginRight: 20,
        paddingHorizontal: 10
    },
    dropdown: {
        width: 235.5,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    dropdownContainer: {
        marginRight: 25,
        marginLeft: 24,
        width: 235.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    button: {
        backgroundColor: 'pink',
        marginTop: 104,
        alignSelf: 'center',
        height: 60,
        top:10,
        width: '106%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderStyle: 'solid',
        padding: 10,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        textTransform: 'uppercase',
        paddingTop: 6,
        fontWeight: 'bold',
        fontSize: 20
    },

})