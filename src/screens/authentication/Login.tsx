import React, {useState, useRef, useEffect} from 'react';
import {View, Text as RNText, TextInput as RNTextInput, Image, TouchableOpacity, Keyboard} from 'react-native';
import {styled} from 'nativewind';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {showToast} from '../../utils/toast';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

function LoginScreen({navigation}: LoginScreenProps): React.JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef<any>(null);

  useEffect(() => {
    // Ensure keyboard is shown immediately
    const timer = setTimeout(() => {
      phoneInput.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleaned);

    // Auto-submit when 10 digits are entered, without showing any toast
    if (cleaned.length === 10) {
      Keyboard.dismiss();
      navigation.navigate('OTPVerification', {phoneNumber: cleaned});
    }
  };

  const handleLogin = () => {
    if (phoneNumber.length !== 10) {
      showToast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    navigation.navigate('OTPVerification', {phoneNumber});
  };

  return (
    <StyledView className="flex-1 bg-white px-6">
      {/* Logo Section */}
      <StyledView className="flex-1 items-center justify-end">
        <StyledImage
          source={require('../../assets/images/logo/shramik-no-bg.png')}
          style={{width: wp('70%'), height: hp('20%')}}
          resizeMode="contain"
          className="mb-10"
        />
      </StyledView>

      {/* Form Section */}
      <StyledView className="flex-1 justify-start">
        {/* Phone Input */}
        <StyledView className="w-full flex-row items-center border border-gray-300 rounded-lg mb-2">
          <StyledText className="text-lg font-merriweather-regular px-4 py-3 text-gray-500 border-r border-gray-300">
            +91
          </StyledText>
          <StyledTextInput
            ref={phoneInput}
            className="flex-1 px-4 py-3 text-lg font-merriweather-regular text-black"
            placeholder="Mobile Number"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            selectTextOnFocus={true}
            autoComplete="tel"
            showSoftInputOnFocus={true}
            autoFocus={true}
          />
        </StyledView>

        {/* Helper Text */}
        <StyledView className="mb-8">
          <StyledText className="text-gray-500 font-merriweather-regular text-left mb-1">
            An OTP will be sent on given phone number for verification.
          </StyledText>
          <StyledText className="text-gray-500 font-merriweather-regular text-left">
            Standard message and data rates apply.
          </StyledText>
        </StyledView>

        {/* Login Button */}
        <StyledTouchableOpacity
          className={`w-full rounded-lg py-4 items-center ${
            phoneNumber.length === 10 ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          activeOpacity={0.8}
          onPress={handleLogin}
          disabled={phoneNumber.length !== 10}
        >
          <StyledText
            className={`text-xl font-merriweather-medium ${
              phoneNumber.length === 10 ? 'text-white' : 'text-gray-600'
            }`}
          >
            Login
          </StyledText>
        </StyledTouchableOpacity>

        {/* Phone number validation message */}
        {phoneNumber.length > 0 && phoneNumber.length !== 10 && (
          <StyledText className="text-red-500 text-sm font-merriweather-regular mt-2 text-center">
            Please enter a valid 10-digit mobile number
          </StyledText>
        )}
      </StyledView>

      {/* Bottom Spacing */}
      <StyledView className="h-10" />
    </StyledView>
  );
}

console.log('LoginScreen component loaded');

export default LoginScreen;
