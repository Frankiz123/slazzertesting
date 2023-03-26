import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ApplicationContext} from '../../../utils/context-api/Context';
import {SelectList} from 'react-native-dropdown-select-list';
import RNFS from 'react-native-fs';

import {styles} from './styles';
import {slazzerApi, userBrand} from '../../../utils/apis-client';

const ImagesScreen = ({route}) => {
  const {scannedValue} = route.params;
  const {userBrandData, token} = useContext(ApplicationContext);

  const [brandData, setBrandData] = useState([]);
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');

  const [primaryBase64, setPrimaryBase64] = useState(null);
  const [secondaryBase64, setSecondaryBase64] = useState(null);
  const [listBase64, setListBase64] = useState([]);
  const [brandedId, setBrandedId] = useState('');
  const [filePath1, setFilePath1] = useState(null);
  const [filePath2, setFilePath2] = useState(null);
  const [filePath3, setFilePath3] = useState([]);

  useEffect(() => {
    userBrandHandler(token);
  }, []);

  const userBrandHandler = async token => {
    const response = await userBrand(token);
    console.log('response Brands :: ', response);
    const newarr = [];
    response.map((val, index) =>
      newarr.push({key: index, value: val.Name, id: val._id}),
    );
    setBrandData(newarr);
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

  const slazzerApiHandler = async imageUrl => {
    const response = await slazzerApi(imageUrl);
    console.log('response :: ', response);
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
        const fileName = response.assets[0].uri;
        RNFS.readFile(fileName, 'base64')
          .then(base64 => {
            // Add base64 data to form data
            console.log('value of base64 :: ', base64);
            // setPrimaryBase64(base64);
            setListBase64(prevImages => [...prevImages, base64]);
            // Make API call with form data
            // ...
          })
          .catch(error => {
            console.log(error);
          });
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
        console.log('response camera :: ', response.assets);
        // slazzerApiHandler(response.assets[0].uri);
        const fileName = response.assets[0].uri;
        RNFS.readFile(fileName, 'base64')
          .then(base64 => {
            // Add base64 data to form data
            console.log('value of base64 :: ', base64);
            setPrimaryBase64(base64);
            // Make API call with form data
            // ...
          })
          .catch(error => {
            console.log(error);
          });
        // fetchURIImage(response.assets[0].uri);
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
        // console.log('response camera :: ', response.assets);
        const fileName = response.assets[0].uri;
        RNFS.readFile(fileName, 'base64')
          .then(base64 => {
            // Add base64 data to form data
            console.log('value of base64 :: ', base64);
            setSecondaryBase64(base64);
            // Make API call with form data
            // ...
          })
          .catch(error => {
            console.log(error);
          });
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
      includeBase64: true,
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
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      console.log('Real Response -> ', response);
      // setFilePath2(response.assets[0]);
      fetchURIImage(response.assets[0].uri);
    });
  };

  const fetchURIImage = async imagePath => {
    // console.log('response fetchbloob imagePath :: ', imagePath);
    // const fileName = imagePath.split('/').pop();
    // const fileType = fileName.split('.').pop();
    // const formData = new FormData();
    // // formData.append('file', {
    // //   uri: imagePath,
    // //   name: fileName,
    // //   type: `image/${fileType}`,
    // // });
    // RNFS.readFile(imagePath, 'base64')
    //   .then(base64 => {
    //     // Add base64 data to form data
    //     console.log('value of base64 :: ', base64);
    //     formData.append('source_image_base64', base64);
    //     // Make API call with form data
    //     // ...
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // slazzerApiHandler(formData);
    // return;
    const fileValue = imagePath;
    const formData = new FormData();
    let newFiles = {
      uri:
        Platform.OS === 'ios'
          ? fileValue
          : fileValue.replace('file://', 'file:'),
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    formData.append('source_image_file', newFiles);
    // slazzerApiHandler(response.assets[0].uri.replace('/^file?:///i, ""'));
    slazzerApiHandler(formData);
    setFilePath1(response.assets[0].uri);
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
      console.log('primaryBase64 >> ', primaryBase64);
      console.log('secondaryBase64 >> ', secondaryBase64);
      console.log('listBase64 >> ', listBase64);
      console.log('brandedId >> ', brandedId);
      console.log('text >> ', text);
      console.log('token >> ', token);
    } else {
      alert('you are missing somethings');
    }
  };

  const onChangeSectionList = val => {
    console.log('section change :: ', val);
    const indexval = brandData[val];
    console.log('index val: ', indexval.id);
    setBrandedId(indexval.id);
    setSelected(val);
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
        <Text style={{fontSize: 32}}>Scanned Value is ::: {scannedValue}</Text>
        <View>
          <SelectList
            setSelected={onChangeSectionList}
            data={brandData}
            save="id"
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
          // onPress={() => chooseFile2('photo')}
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
