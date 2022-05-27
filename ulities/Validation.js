import React, { useState } from 'react';  
import {  
  StyleSheet,  
  View,  
  Text,  
  TouchableHighlight,  
} from 'react-native';  
import { authorize } from 'react-native-app-auth';  

//  

const AuthConfig = {  
   appId: "2b935271-cf4c-4517-b2c4-df2a779039b4",  
   tenantId: "a0fa61c2-f75a-48c9-8351-f224da1fd515",  
   appScopes: [  
     'openid',  
     'offline_access',  
     'profile',  
     'User.Read',  
   ],  
 };  

const config = {  
   warmAndPrefetchChrome: true,  
   clientId: AuthConfig.appId,  
   redirectUrl: Platform.OS === 'ios' ? 'urn:ietf:wg:oauth:2.0:oob' : 'mlogin://react-native-auth',  
   scopes: AuthConfig.appScopes,  
   additionalParameters: { prompt: 'select_account' },  
   serviceConfiguration: {  
     authorizationEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/authorize',  
     tokenEndpoint: 'https://login.microsoftonline.com/' + AuthConfig.tenantId + '/oauth2/v2.0/token',  
   },  
 };  
     

export const isValidEmail = (stringEmail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
    }

export const isValidPassword = (stringPassword) => {
   return (/^[A-Za-z]\w{7,14}$/.test(stringPassword))
}

export const loginwithOffice365 = async() => {
   const [result, setResult] = useState({});  
   let tempResult = await authorize(config);
   console.log(tempResult);
   setResult(tempResult);
}

