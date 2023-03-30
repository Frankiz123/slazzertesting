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
import base64 from 'base64-js';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ApplicationContext} from '../../../utils/context-api/Context';
import {SelectList} from 'react-native-dropdown-select-list';
import RNFS from 'react-native-fs';

import {styles} from './styles';
import {
  productsAddApi,
  slazzerApi,
  slazzerCustomApi,
  userBrand,
} from '../../../utils/apis-client';

const ImagesScreen = ({route}) => {
  const {scannedValue} = route.params;
  const {userBrandData, token} = useContext(ApplicationContext);

  const [brandData, setBrandData] = useState([]);
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

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

  const slazzerCustomApiPrimaryHandler = async (image, token) => {
    console.log('newapi', image);
    setLoading(true);
    try {
      const response = await slazzerCustomApi(image, token);
      console.log('hamza api Response Slazzer :: ', response.data);
      setFilePath1(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const slazzerCustomApiSecondaryHandler = async (image, token) => {
    console.log('newapi', image);
    setLoading(true);
    try {
      const response = await slazzerCustomApi(image, token);
      console.log('hamza api Response Slazzer :: ', response.data);
      setFilePath2(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const slazzerCustomApiMultipleHandler = async (image, token) => {
    console.log('newapi', image);
    setLoading(true);
    try {
      const response = await slazzerCustomApi(image, token);
      console.log('hamza api Response Slazzer :: ', response.data);
      setListBase64(prevImages => [...prevImages, response.data]);
      setFilePath3(prevImages => [...prevImages, response.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

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
    console.log('response :: ', response.data);
    const base64String = arrayBufferToBase64(response.data);
    console.log('base64String :: ', base64String);
    setFilePath1(base64String);
    // setImageUri(base64data);
    // const arrayBufferView = new Uint8Array(response.data);
    // const blob = new Blob([arrayBufferView], {type: 'image/jpeg'});
    // const reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onloadend = () => {
    //   const base64data = reader.result;
    //   console.log('base64Data :::: ', base64data);
    //   setImageUri(base64data);
    // };
  };

  const arrayBufferToBase64 = buffer => {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return base64.fromByteArray(binary);
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

        console.log('response camera :: ', response);
        // setFilePath(response.assets[0]);
        const fileName = response.assets[0].uri;
        RNFS.readFile(fileName, 'base64').then(base64 => {
          // Add base64 data to form data
          console.log('value of base64 :: ', base64);
          // setPrimaryBase64(base64);

          // Make API call with form data
          // ...
        });
        fetchURI3Image(response.assets[0].uri).catch(error => {
          console.log(error);
        });
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
        fetchURIImage(response.assets[0].uri);
        // setFilePath1(response.assets[0]);
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
        const fileName = response.assets[0].uri;
        RNFS.readFile(fileName, 'base64')
          .then(base64 => {
            // Add base64 data to form data
            console.log('value of base64 :: ', base64);

            // Make API call with form data
            // ...
          })
          .catch(error => {
            console.log(error);
          });
        fetchURI2Image(response.assets[0].uri);
      });
    }
  };
  const captureImageMulti = async type => {
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
        const fileName = response.assets[0].uri;
        RNFS.readFile(fileName, 'base64')
          .then(base64 => {
            // Add base64 data to form data
            console.log('value of base64 :: ', base64);
            slazzerCustomApiMultipleHandler(base64);
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
      fetchURIImage(response.assets[0].uri);
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
    console.log('response fetchbloob imagePath :: ', imagePath);
    const fileName = imagePath.split('/').pop();
    const fileType = fileName.split('.').pop();
    RNFS.readFile(imagePath, 'base64')
      .then(base64 => {
        // Add base64 data to form data
        console.log('value of base64 :: ', base64);
        slazzerCustomApiPrimaryHandler(base64, token);
      })
      .catch(error => {
        console.log(error);
      });
    return;
    const fileValue = imagePath;
    // const formData = new FormData();
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

  const fetchURI2Image = async imagePath => {
    console.log('response fetchbloob imagePath :: ', imagePath);
    const fileName = imagePath.split('/').pop();
    const fileType = fileName.split('.').pop();
    RNFS.readFile(imagePath, 'base64')
      .then(base64 => {
        // Add base64 data to form data
        console.log('value of base64 :: ', base64);
        slazzerCustomApiSecondaryHandler(base64, token);
      })
      .catch(error => {
        console.log(error);
      });
    return;
    const fileValue = imagePath;
    // const formData = new FormData();
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

  const fetchURI3Image = async imagePath => {
    RNFS.readFile(imagePath, 'base64')
      .then(base64 => {
        // Add base64 data to form data
        slazzerCustomApiMultipleHandler(base64, token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRemoveImage = index => console.log(index);

  const handleSubmit = async () => {
    if (filePath1 && filePath2 && filePath3.length > 0 && text.length > 0) {
      // console.log('primaryBase64 >> ', primaryBase64);
      // console.log('secondaryBase64 >> ', secondaryBase64);
      // console.log('listBase64 >> ', listBase64);
      // console.log('brandedId >> ', brandedId);
      // console.log('text >> ', text);
      // console.log('token >> ', token);
      let valarr = {
        Image: listBase64,
      };
      let response = await productsAddApi(
        text,
        scannedValue,
        brandedId,
        primaryBase64,
        secondaryBase64,
        valarr,
        token,
      );
      alert('Item is successfully added');
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
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView_Container}
      scrollEnabled
      nestedScrollEnabled>
      <View style={styles.main_Container}>
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
            source={{uri: `${filePath1}`}}
            style={{width: 200, height: 200}}
          />
        )}
        <Button
          title="Primary Image"
          disabled={loading}
          onPress={() => captureImagePrimary('photo')}
        />

        {filePath2 && (
          <Image source={{uri: filePath2}} style={{width: 200, height: 200}} />
        )}
        <Button
          title="Secondary Image"
          disabled={loading}
          onPress={() => captureImageSecondry('photo')}
        />

        {filePath3 &&
          filePath3?.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              disabled={loading}
              onPress={() => handleRemoveImage(index)}>
              <Image source={{uri: image}} style={styles.image} />
            </TouchableOpacity>
          ))}
        <Button
          title="Additional Images"
          disabled={loading}
          onPress={() => captureImage('photo')}
        />

        <TextInput
          placeholder="Enter your product name"
          value={text}
          onChangeText={setText}
          style={styles.inputStyling}
        />

        <TouchableOpacity
          style={styles.handleSubmitStyle}
          disabled={loading}
          onPress={handleSubmit}>
          <Text style={styles.textSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ImagesScreen;
