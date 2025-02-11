import React, {useEffect} from 'react';
import {View, Text, Image, PermissionsAndroid, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styled} from 'nativewind';
import {showToast} from '../utils/toast';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

type Props = NativeStackScreenProps<any, 'Splash'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const permissions = [
            {
              type: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              message: 'Microphone access is needed for voice notes',
            },
            {
              type: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              message: 'Storage access is needed to save recordings',
            },
            {
              type: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              message: 'Storage access is needed to play recordings',
            },
          ];

          for (const permission of permissions) {
            const granted = await PermissionsAndroid.request(
              permission.type,
              {
                title: 'Permission Required',
                message: permission.message,
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              showToast.error(`${permission.message}. Please enable in settings.`);
            }
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    const initializeApp = async () => {
      await requestPermissions();
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
    };

    initializeApp();
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
