import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, FlatList, ScrollView, onChangeText, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal'
import { Ios, screenWidth } from '../ulities/Device';

export default function Popup(props){
    const [modalOpen, setModalOpen] = useState(true)
    const {
        openModal,
        modalTitle,
        modalButtonOnPress,
        modalButtonText,
        modalContent,
    } = props

    return (   
        <Modal
            hasBackdrop={true}
            position='center'
            isVisible={true}
            onBackdropPress={() => setModalOpen(false)} 
        >
            <View style={styles.container} keyboardShouldPersistTaps='handled' >
                <View style={styles.modalHeader}>
                    <View />
                    <Text style={styles.text}>{modalTitle}</Text>
                    <Icon style={styles.close} name={'close'} size={25} onPress={() => setModalOpen(false)} />
                </View>
                <View style={styles.modalBody}>
                    <>{modalContent}</>
                    <TouchableOpacity
                        style={styles.button} onPress={modalButtonOnPress}
                    >
                        <Text style={styles.buttonText}>{modalButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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