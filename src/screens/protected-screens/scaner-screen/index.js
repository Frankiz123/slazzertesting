import React, {useState, useEffect, useContext} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {userBrand} from '../../../utils/apis-client';

import {styles} from './styles';
import {ApplicationContext} from '../../../utils/context-api/Context';

const ScannerScreen = () => {
  const navigation = useNavigation();
  const {setUserBrandData} = useContext(ApplicationContext);
  const [scannedData, setScannedData] = useState(null);
  const [scannerBool, setScannerBool] = useState(false);
  useEffect(() => {
    if (scannedData) {
      // The QR code value has been scanned
      const scannedValue = scannedData.data;
      navigation.navigate('ImagesScreen', {scannedValue: scannedValue});
      console.log('Scanned value:', scannedValue);
    }
    userBrandApiHanlder();
  }, [scannedData]);

  const handleScanned = result => {
    setScannedData(result);
  };

  const userBrandApiHanlder = async () => {
    try {
      const response = await userBrand();
      console.log('brand response :: ', response);
      setUserBrandData(response);
    } catch (error) {
      console.log('error :: ', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {!scannerBool ? (
        <View
          style={{
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setScannerBool(true);
            }}
            style={{
              backgroundColor: '#a1cdf1',
              width: 300,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 24}}>Scan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <QRCodeScanner
            onRead={handleScanned}
            showMarker={true}
            reactivate={true}
            permissionDialogMessage="Need permission to access camera"
            reactivateTimeout={5000}
          />
          {scannedData && (
            <View style={{position: 'absolute', top: 50}}>
              <Text>Scanned value: {scannedData.data}</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScannerScreen;
