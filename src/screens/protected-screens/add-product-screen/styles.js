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
    backgroundColor: '#2196F3',
    borderRadius: wp(100),
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 36,
    color: '#7c5869',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
