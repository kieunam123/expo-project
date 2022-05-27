import React, { useState } from 'react';  
import {  
  StyleSheet,  
  View,  
  Text,  
  TouchableHighlight,  
} from 'react-native';  
  
import { authorize } from 'react-native-app-auth';  
  
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
  
const Microsoft: () => React$Node = () => {  
  const [result, setResult] = useState({});  
  
  loginWithOffice365 = async () => {  
    let tempResult = await authorize(config);  
    console.log(tempResult);  
    setResult(tempResult);  
  };  
  return (  
    <>  
      <View style={styles.container}>  
        <TouchableHighlight  
          style={[styles.buttonContainer, styles.loginButton]}  
          onPress={() => loginWithOffice365()}>  
          <Text style={styles.loginText}>Login with Office365</Text>  
        </TouchableHighlight>  
        <Text>{result.accessToken ? "Logged In" : "Error"}</Text>          
      </View>  
    </>  
  );  
};  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#DCDCDC',  
  },  
  buttonContainer: {  
    height: 45,  
    flexDirection: 'row',  
    justifyContent: 'center',  
    alignItems: 'center',  
    marginBottom: 20,  
    width: 250,  
    borderRadius: 30,  
  },  
  loginButton: {  
    backgroundColor: '#3659b8',  
  },  
  loginText: {  
    color: 'white',  
  },  
});  
  
export default Microsoft;  