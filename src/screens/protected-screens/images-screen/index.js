import React, {useState, useContext} from 'react';
import {
  View,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ApplicationContext} from '../../../utils/context-api/Context';
import {SelectList} from 'react-native-dropdown-select-list';

import {styles} from './styles';

const ImagesScreen = ({route}) => {
  // const {scannedValue} = route.params;
  const {userBrandData} = useContext(ApplicationContext);

  const settings = {
    url: 'https://api.slazzer.com/v2.0/remove_image_background',
    apiKey: '2c3a3aac72434b0888c439bca78ae6d9',
    sourceImagePath: filePath1,
    outputImagePath: RNFS.DocumentDirectoryPath + '/output.png',
  };

  const [imageSource, setImageSource] = useState(null);
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');

  const [filePath, setFilePath] = useState([]);
  const [filePath1, setFilePath1] = useState(null);
  const [filePath2, setFilePath2] = useState(null);
  const [filePath3, setFilePath3] = useState([]);

  const slazzerApi = async () => {
    await RNFetchBlob.fetch(
      'POST',
      settings.url,
      {
        'API-KEY': settings.apiKey,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'source_image_file',
          filename: settings.sourceImagePath,
          data: RNFetchBlob.wrap(settings.sourceImagePath),
        },
      ],
    )
      .then(response => {
        if (response.info().status !== 200) {
          console.log(response.data);
          return;
        }
        RNFS.writeFile(settings.outputImagePath, response.data, 'base64')
          .then(() => {
            console.log('File saved successfully');
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      allowsMultipleSelection: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        console.log('response camera :: ', response);
        // setFilePath(response.assets[0]);
        slazzerApi();
        setFilePath3(prevImages => [...prevImages, response.assets[0]]);
      });
    }
  };

  const captureImagePrimary = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      allowsMultipleSelection: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        console.log('response camera :: ', response.assets);
        setFilePath1(response.assets[0]);
      });
    }
  };

  const captureImageSecondry = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      allowsMultipleSelection: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        console.log('response camera :: ', response.assets);
        setFilePath2(response.assets[0]);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath1(response.assets[0]);
    });
  };

  const chooseFile2 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath2(response.assets[0]);
    });
  };

  const chooseFile3 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 150,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath3(response.assets);
    });
  };

  const handleRemoveImage = index => console.log(index);

  const handleSubmit = () => {
    if (filePath1 && filePath2 && filePath3.length > 0 && text.length > 0) {
      alert('image is saved');
    } else {
      alert('you are missing somethings');
    }
  };

  console.log('img 1 : ', filePath3);
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
      }}
      scrollEnabled
      nestedScrollEnabled>
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text style={{fontSize: 32}}>Scanned Value is ::: {scannedValue}</Text> */}
        <View>
          <SelectList
            setSelected={val => setSelected(val)}
            data={userBrandData}
            save="value"
          />
        </View>
        {filePath1 && (
          <Image
            source={{uri: filePath1?.uri}}
            style={{width: 200, height: 200}}
          />
        )}
        <Button
          title="Primary Image"
          onPress={() => captureImagePrimary('photo')}
        />
        {filePath2 && (
          <Image
            source={{uri: filePath2?.uri}}
            style={{width: 200, height: 200}}
          />
        )}
        <Button
          title="Secondary Image"
          onPress={() => captureImageSecondry('photo')}
        />
        {/* {filePath3 && (
          <Image
            source={{uri: filePath3.uri}}
            style={{width: 200, height: 200}}
          />
        )} */}
        {filePath3 &&
          filePath3?.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              onPress={() => handleRemoveImage(index)}>
              <Image source={{uri: image.uri}} style={styles.image} />
            </TouchableOpacity>
          ))}
        <Button
          title="Additional Images"
          onPress={() => captureImage('photo')}
        />
        <TextInput
          placeholder="Enter your product name"
          value={text}
          onChangeText={setText}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 5,
            width: '80%',
            fontSize: 18,
            marginTop: 30,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#d496a7',
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
            width: '80%',
            alignItems: 'center',
          }}
          onPress={handleSubmit}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ImagesScreen;
