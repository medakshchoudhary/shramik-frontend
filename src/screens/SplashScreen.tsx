import React, {useEffect} from 'react';
import {View, Text, Image, PermissionsAndroid, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styled} from 'nativewind';
import {showToast} from '../utils/toast';
import {checkAndRequestPermissions, getMissingPermissions} from '../utils/permissions';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

type Props = NativeStackScreenProps<any, 'Splash'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    // Simply navigate after delay
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledImage
        source={require('../assets/images/logo/shramik-no-bg.png')}
        style={{width: wp('70%'), height: hp('40%'), marginBottom: hp('1%')}}
        resizeMode="contain"
      />
      <StyledText className="text-black font-merriweather-bold" style={{fontSize: hp('2.5%')}}>
        Uplifting the Karigars
      </StyledText>
    </StyledView>
  );
};

export default SplashScreen;
