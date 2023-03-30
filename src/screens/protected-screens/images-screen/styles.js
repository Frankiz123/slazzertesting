import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#808080',
    width: wp('80%'),
    paddingVertical: hp(2),
    paddingLeft: wp(3),
  },
  dividerVerticalInput: {marginVertical: hp(1.5)},
  button: {
    width: wp('60%'),
    paddingVertical: hp(2),
    backgroundColor: '#2196F3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    color: 'white',
  },
  imageWrapper: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputStyling: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    fontSize: 18,
    marginTop: 30,
  },
  handleSubmitStyle: {
    backgroundColor: '#d496a7',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  main_Container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView_Container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  textSubmit: {
    color: '#fff',
    fontSize: 18,
  },
});
