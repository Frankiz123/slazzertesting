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
});
