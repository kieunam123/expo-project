import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

//   import Tabs from './Tabs'                                             
import { Login, WelcomeScreen, FoodList } from '../screens'
import Tabs from './Tabs';
import Microsoft from '../Microsoft';

  const stack = createNativeStackNavigator();
  export default function App(props){
      return <NavigationContainer>
          <stack.Navigator initialRouteName='tab' screenOptions={{headerShown:false}}>
                <stack.Screen name={"Home"} component={WelcomeScreen}/>
                <stack.Screen name={"Login"} component={Login}/>
                <stack.Screen name={"Menu"} component={FoodList}/>
                <stack.Screen name={"tab"} component={Tabs}/>
                <stack.Screen name={"microsoft"} component={Microsoft}/>
          </stack.Navigator>
      </NavigationContainer>
  }