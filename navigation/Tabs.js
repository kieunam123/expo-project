import * as React from 'react'
import {Chat, FoodList,Profile,Products} from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';
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
  import {Buttons} from '../components';

const tab = createBottomTabNavigator();
const screenOptions =({route})=>({
    headerShown:false,
    tabBarActiveTintColor:'white',
    tabBarActiveBackgroundColor : 'pink',
    tabBarInactiveBackgroundColor:'pink',
    tabBarBackground: () => (
        <View style={{backgroundColor:'pink',flex:1}}/>
    ),
    tabBarIcon : ({focused,color,size}) => {
        return <Icon
        name={route.name=='Profile' ? 'person-circle-outline' : (
            route.name=='Menu' ? 'menu' : ( route.name=='Chat' ? 'chatbubble-ellipses-sharp' :'cart')
        ) }
        size={23}
        color={focused ? 'white':'grey'}/>
    }
})
export default function Tabs(props){
    return(
        <tab.Navigator screenOptions={screenOptions} >
            <tab.Screen name={"Menu"} component={FoodList} />
            <tab.Screen name={"Products"} component={Products} />
            <tab.Screen name={"Chat"} component={Chat} />
            <tab.Screen name={"Profile"} component={Profile} />
        </tab.Navigator>
    );
}
