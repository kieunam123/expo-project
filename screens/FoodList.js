import React, { useState, useEffect } from 'react';
import { Alert, TouchableWithoutFeedback, StyleSheet, FlatList, ScrollView, onChangeText, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
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
            let array = []
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
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [dropdown, setDropdownOpen] = useState(false)
    const [dropdownProduct, setDropdownProductOpen] = useState(false);
    const [nameItems, setNameItems] = useState([
        { label: 'Cần Thơ', value: 'Cần Thơ' },
        { label: 'Đồng Nai', value: 'Đồng Nai' },
        { label: 'Đà Lạt', value: 'Đà Lạt' },
        { label: 'Vũng Tàu', value: 'Vũng Tàu' },
        { label: 'Tây Ninh', value: 'Tây Ninh' },
        { label: 'Phan Thiết', value: 'Phan Thiết' },
        { label: 'Hà Nội', value: 'Hà Nội' },
        { label: 'TP Hồ Chí Minh', value: 'TP Hồ Chí Minh' },
    ]);
    const [dropdownValue, setDropdownValue] = useState([]);
    const [dropdownItems, setdropdownItems] = useState([
        { label: 'Thanh toán bằng tiền mặt', value: 'Thanh toán bằng tiền mặt' },
        { label: 'tài khoản ngân hàng / ATM', value: 'tài khoản ngân hàng / ATM' },
        { label: 'Thẻ tín dụng', value: 'Thẻ tín dụng' },
    ]);
    const [id, setId] = useState();
    const [name, setName] = useState([]);
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
    function Edit(name, price, img, dropdownValue) {
        firebaseSet(firebaseRef(database, `foods/${name}`), {
            name: name,
            price: price,
            img: img,
            status: dropdownValue,
        });
    }
    //delete product
    function Delete(name) {
        remove(firebaseRef(database, `foods/${name}`))

    }

    function handleSelectProduct(itemSelected){
        switch(itemSelected){
            case 'Cần Thơ':
                return '10000';
            case 'Đồng Nai':
                return '50000';
            case 'Đà Lạt':
                return '90000';
            case 'Vũng Tàu':
                return '20000';
            case 'Tây Ninh':
                return '15000';
            case 'Phan Thiết':
                return '40000';
            case 'Hà Nội':
                return '200000';
            case 'TP Hồ Chí Minh':
                return '5000';
            default: return '0';
        };
    };

    function handleSelectProductImg(itemSelected){
        switch(itemSelected){
            case 'Cần Thơ':
                return 'https://fantasea.vn/wp-content/uploads/2018/10/c%E1%BA%A7n-th%C6%A1.jpg';
            case 'Đồng Nai':
                return 'https://znews-photo.zingcdn.me/w660/Uploaded/qxjwpprjv/2022_02_20/DJI_0439_zing_28_.jpg';
            case 'Đà Lạt':
                return 'https://nucuoimekong.com/wp-content/uploads/tour-can-tho-di-da-lat-bang-may-bay.jpg';
            case 'Vũng Tàu':
                return 'https://vtr.org.vn/FileManager/Anh%20web%202022/Thang%206/1120/Trai%20nghiem%20thanh%20pho%20bien%20Vung%20Tau%20(2).jpg';
            case 'Tây Ninh':
                return 'https://baokhanhhoa.vn/dataimages/201812/original/images5350546_A5.jpg';
            case 'Phan Thiết':
                return 'https://pix10.agoda.net/geo/city/16264/1_16264_02.jpg?ca=6&ce=1&s=1920x822';
            case 'Hà Nội':
                return 'https://i.ytimg.com/vi/-TaHACg8IMw/maxresdefault.jpg';
            case 'TP Hồ Chí Minh':
                return 'https://cdnmedia.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2020/11/04/thanh-pho-thu-duc-tp-ho-chi-minh-41120.jpg';
            default: return 'https://www.primetravels.com/images-tour/new-home/travel-icon2.png';
        };
    };

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

                {
                    text: "Sửa",
                    onPress: () => { setModalEditOpen(true) }
                },

                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
            ]
        );



    return (
        <View style={{ flex: 1 }}>
            <Header name={'Vé Của Tôi'} />

            <FlatList
                data={foods}
                renderItem={({ item }) => <FoodItem
                    swipeOutBtn={[
                        {
                            text: 'Sửa',
                            type: 'primary',
                            onPress: () => {
                                setModalEditOpen(true);
                            }
                        },
                        {
                            text: 'Xoá',
                            type: 'delete',
                            onPress: () => {
                                Alert.alert(
                                    `Xoá ${item.name}`,
                                    'Bạn chắc chắn muốn xoá?',
                                    [
                                        { text: 'No', onPress: () => { }, style: 'cancel' },
                                        {
                                            text: 'Yes', onPress: () => {
                                                Delete(item.name)
                                                get_data()
                                            }
                                        },
                                    ],

                                    { cancelable: true }
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
                <View style={styles.container2} keyboardShouldPersistTaps='handled' >
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
                        {/* <ScrollView contentContainerStyle={styles.row}>
                            <Text>Chọn sản phẩm</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setName(text) }} />
                            <Icon name="check" color="green" size={30} />
                            
                        </ScrollView> */}
                        <View style={styles.row}>
                            <Text>Chọn sản phẩm</Text>
                        </View>
                        <DropDownPicker
                            style={styles.dropdown}
                            open={dropdownProduct}
                            items={nameItems}
                            value={name}
                            containerStyle={styles.dropdownContainer}
                            labelStyle={styles.dropdownContainer}
                            setOpen={setDropdownProductOpen}
                            setValue={setName}
                            setItems={setNameItems} />
                        <View>
                            <Text style={{ marginRight: 77, paddingTop: 15, paddingBottom:5 }}>Giá (VNĐ)</Text>
                            <ScrollView contentContainerStyle={styles.normal} keyboardShouldPersistTaps='handled'>
                                <View style={styles.row}>
                                    <TextInput style={styles.input} keyboardType='numeric' defaultValue={handleSelectProduct(name)} onChangeText={(text) => { setPrice(text) }} />
                                    {/* <Icon name="check" color="green" size={30} /> */}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={{ marginRight: 23, paddingVertical: 5, paddingTop: 5 }}>Hình ảnh</Text>
                            <ScrollView contentContainerStyle={styles.normal} keyboardShouldPersistTaps='handled'>
                                <View style={styles.row}>
                                    <Image source={{ uri: handleSelectProductImg(name)}} style={styles.img} />
                                    {/* <TextInput style={{display:'none'}} value={handleSelectProductImg(name)} onChangeText={(text) => { setImg(text) }} placeholder='default' placeholderTextColor={'grey'} /> */}
                                    {/* <Icon name="check" color="green" size={30} /> */}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={{ marginRight: 23, paddingVertical: 5, paddingTop: 10, paddingBottom: 10 }}>Phương thức thanh toán</Text>
                            <View>
                                <DropDownPicker
                                    dropDownDirection='TOP'
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
                        </View>

                        <TouchableOpacity
                            style={styles.button} onPress={() => {
                                Push(name, handleSelectProduct(name), handleSelectProductImg(name), dropdownValue)
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
                <View style={styles.container2} keyboardShouldPersistTaps='handled' >
                    <View style={styles.modalHeader}>
                        <View />
                        <Text style={styles.text}>Sửa sản phẩm</Text>
                        <Icon style={styles.close} name={'close'} size={25} onPress={() => setModalEditOpen(false)} />
                    </View>
                    <View style={styles.modalBody}>
                        {/* <ScrollView contentContainerStyle={styles.row} keyboardShouldPersistTaps='handled'>
                            <Text>ID    </Text>
                            <TextInput style={styles.input2} onChangeText={(text) => { setId(text) }}  />
                            <Icon name="check" color="green" size={30} />
                        </ScrollView> */}
                        {/* <ScrollView contentContainerStyle={styles.row}>
                            <Text>Chọn sản phẩm</Text>
                            <TextInput style={styles.input} onChangeText={(text) => { setName(text) }} />
                            <Icon name="check" color="green" size={30} />
                            
                        </ScrollView> */}
                        <View style={styles.row}>
                            <Text>Chọn sản phẩm</Text>
                        </View>
                        <DropDownPicker
                            style={styles.dropdown}
                            open={dropdownProduct}
                            items={nameItems}
                            value={name}
                            containerStyle={styles.dropdownContainer}
                            labelStyle={styles.dropdownContainer}
                            setOpen={setDropdownProductOpen}
                            setValue={setName}
                            setItems={setNameItems} />
                        <View>
                            <Text style={{ marginRight: 77, paddingTop: 10 }}>Giá </Text>
                            <ScrollView contentContainerStyle={styles.normal} keyboardShouldPersistTaps='handled'>
                                <View style={styles.row}>
                                    <TextInput style={styles.input} keyboardType='numeric' defaultValue={handleSelectProduct(name)} onChangeText={(text) => { setPrice(text) }} />
                                    {/* <Icon name="check" color="green" size={30} /> */}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={{ marginRight: 23, paddingVertical: 5, paddingTop: 5 }}>Hình ảnh</Text>
                            <ScrollView contentContainerStyle={styles.normal} keyboardShouldPersistTaps='handled'>
                                <View style={styles.row}>
                                    <Image source={{ uri: handleSelectProductImg(name)}} style={styles.img} />
                                    {/* <TextInput style={{display:'none'}} value={handleSelectProductImg(name)} onChangeText={(text) => { setImg(text) }} placeholder='default' placeholderTextColor={'grey'} /> */}
                                    {/* <Icon name="check" color="green" size={30} /> */}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={{ marginRight: 23, paddingVertical: 5, paddingTop: 10, paddingBottom: 10 }}>Phương thức thanh toán</Text>
                            <View>
                                <DropDownPicker
                                    dropDownDirection='TOP'
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
                        </View>
                        <TouchableOpacity
                            style={styles.button} onPress={() => {
                                Edit(name, handleSelectProduct(name), handleSelectProductImg(name), dropdownValue)
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
    container2: {
        paddingTop: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: Ios() ? 30 : 0,
        shadowRadius: 10,
        height: 670,
        alignSelf: 'center',
        paddingHorizontal: 20,
        zIndex: -1
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
        // margin: 10,
        padding: 10,
        marginHorizontal: -20,
        alignItems: 'center',
        backgroundColor: 'pink',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: 20,

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
        width: 235.5,
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
        paddingTop: 5,
    },
    dropdownContainer: {
        marginRight: 25,
        marginLeft: 24,
        width: 235.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },

    normal: {
        paddingHorizontal: 10,
        alignItems: 'left',


    },
    button: {
        backgroundColor: 'pink',
        marginTop: 40,
        alignSelf: 'center',
        height: 60,
        width: '120%',
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
    img:{
        width:250,
        height:200,
        resizeMode:'cover',
        borderRadius:10,
        marginRight:15,
    },

})