import React, {useState, useRef, useEffect} from 'react';
import {View, Text as RNText, TextInput as RNTextInput, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showToast} from '../../utils/toast';
import {RootStackParamList} from '../../types/navigation';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

const OTPVerification: React.FC<Props> = ({navigation, route}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<any>>([]);
  const DEMO_OTP = '123456'; // For testing purposes

  useEffect(() => {
    console.log('OTP screen loaded with phone:', route.params.phoneNumber);
  }, [route.params.phoneNumber]);

  const handleOtpChange = (text: string, index: number) => {
    console.log('OTP digit changed:', text, 'at index:', index);
    const cleaned = text.replace(/[^0-9]/g, '');
    if (text !== cleaned) {
      showToast.info('Please enter numbers only');
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (cleaned.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    console.log('Verifying OTP:', enteredOTP);

    if (enteredOTP === DEMO_OTP) {
      console.log('OTP verified successfully');
      showToast.success('OTP verified successfully');
      setTimeout(() => {
        navigation.replace('RoleSelection');
      }, 1000);
    } else {
      console.warn('Invalid OTP entered');
      showToast.error('Invalid OTP. Please try again');
    }
  };

  const handleResendOTP = () => {
    showToast.info('New OTP has been sent to your mobile number');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <StyledView className="flex-1 bg-white px-6">
      <StyledView className="flex-1 justify-center">
        <StyledText className="text-2xl font-merriweather-bold text-center mb-4">
          Enter verification code
        </StyledText>
        <StyledText className="text-gray-500 font-merriweather-regular text-center mb-8">
          We have sent you a 6 digit verification code on{'\n'}
          +91 {route.params.phoneNumber}
        </StyledText>

        <StyledView className="flex-row justify-between mb-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <StyledTextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-merriweather-bold"
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </StyledView>

        <StyledTouchableOpacity
          className={`w-full rounded-lg py-4 items-center ${
            otp.every((digit) => digit !== '') ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          activeOpacity={0.8}
          onPress={handleVerifyOTP}
          disabled={!otp.every((digit) => digit !== '')}
        >
          <StyledText
            className={`text-xl font-merriweather-medium ${
              otp.every((digit) => digit !== '') ? 'text-white' : 'text-gray-600'
            }`}
          >
            Next
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="mt-4"
          onPress={handleResendOTP}
        >
          <StyledText className="text-blue-600 font-merriweather-medium text-center">
            Resend OTP
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default OTPVerification;
