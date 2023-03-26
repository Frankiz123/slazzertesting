import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {userLogIn} from '../../../utils/apis-client';
import {ApplicationContext} from '../../../utils/context-api/Context';

const Login = () => {
  const [email, setEmail] = useState('a@gmail.com');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);

  const {setToken} = useContext(ApplicationContext);

  const navigation = useNavigation();

  const onEmailChangeHandler = e => {
    setEmail(e);
  };

  const onChangePassword = e => {
    setPassword(e);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const isLoggedIn = await userLogIn(email, password);
      console.log('isLoggedIn ; ', isLoggedIn);
      if (isLoggedIn.token) {
        // successful login
        setLoading(false);
        setToken(isLoggedIn?.token);
        navigation.navigate('AddProductScreen');
        console.log('Logged in successfully');
      } else {
        // incorrect email or password
        setLoading(false);
        console.log('Incorrect email or password');
      }
    } catch (error) {
      // login failed
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        placeholder="Enter Email"
        keyboardType="email-address"
        returnKeyType="next"
        value={email}
        style={styles.inputStyle}
        onChangeText={onEmailChangeHandler}
      />
      <View style={styles.dividerVerticalInput} />
      <TextInput
        placeholder="Enter Password"
        keyboardType="default"
        secureTextEntry={true}
        returnKeyType="done"
        value={password}
        style={styles.inputStyle}
        onChangeText={onChangePassword}
      />
      <View style={styles.dividerVerticalInput} />
      <View style={styles.dividerVerticalInput} />
      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={handleSignIn}>
        {loading ? (
          <ActivityIndicator size={20} color={'red'} />
        ) : (
          <Text style={styles.textButton}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
