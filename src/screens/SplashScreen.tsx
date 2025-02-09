import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

function SplashScreen({navigation}: SplashScreenProps): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo/shramik-no-bg.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Uplifting the Karigars</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp('70%'),
    height: hp('40%'),
    marginBottom: 5,
  },
  title: {
    fontSize: hp('3%'),
    color: '#000000',
    fontFamily: 'Poppins-Bold',
  },
});

export default SplashScreen;
