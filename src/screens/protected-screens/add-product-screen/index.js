import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';

const AddProductScreen = () => {
  const navigation = useNavigation();
  const ButtonHandler = () => navigation.navigate('ScannerScreen');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ButtonHandler} style={styles.button}>
        <Icon name="plus" size={100} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.textButton}>Add Product</Text>
    </View>
  );
};

export default AddProductScreen;
