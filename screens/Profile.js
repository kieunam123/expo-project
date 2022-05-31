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
import {Buttons,Header} from '../components';
import users from '../responsitories/users';

export default function Profile(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    users.getUserDetail().then(responseUser => setUser(responseUser))
  }, [])
  const { name, email, phone, gender, age, regdate, national, city } = user
  return (
    <View>
      <Header name={'Profile'} rightIconName={'menu'} />
      <View style={styles.container}>
        <Text style={styles.text}>name:{name}</Text>
        <Text style={styles.text}>mail:{email}</Text>
        <Text style={styles.text}>age:{age}</Text>
        <Text style={styles.text}>national:{national}</Text>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    
  },
  text: {
    fontSize: FormatFont.h2,
    alignSelf:'center',
    
  }
});