import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text as RNText,
  TextInput as RNTextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showToast} from '../../utils/toast';
import {RootStackParamList} from '../../types/navigation';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CELL_COUNT = 6;
const DEMO_OTP = '123456';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

const OTPVerification: React.FC<Props> = ({navigation, route}) => {
  const [otp, setOtp] = useState<string[]>(Array(CELL_COUNT).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<any>>([]);
  const firstInput = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    firstInput.current?.focus();

    // Show toast message when screen mounts
    showToast.info(`OTP sent to +91 ${route.params.phoneNumber}`);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setTimer(30);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    // Only allow numbers and auto-clean input
    const cleaned = value.replace(/[^0-9]/g, '');
    newOtp[index] = cleaned;
    setOtp(newOtp);

    // Auto-advance to next input
    if (cleaned && index < CELL_COUNT - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are filled
    if (cleaned) {
      const fullOtp = [...newOtp].join('');
      if (fullOtp.length === CELL_COUNT) {
        Keyboard.dismiss();
        handleVerifyOTP(fullOtp);
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleVerifyOTP = async (enteredOTP: string) => {
    if (isVerifying) return; // Prevent multiple verification attempts
    setIsVerifying(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (enteredOTP === DEMO_OTP) {
        showToast.success('Verification successful');
        setTimeout(() => {
          navigation.replace('RoleSelection');
        }, 500);
      } else {
        showToast.error('Invalid verification code');
        setOtp(Array(CELL_COUNT).fill(''));
        firstInput.current?.focus();
      }
    } catch (error) {
      showToast.error('Verification failed');
      setOtp(Array(CELL_COUNT).fill(''));
      firstInput.current?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtp(Array(CELL_COUNT).fill(''));
      firstInput.current?.focus();
      startTimer(); // Restart timer
      showToast.info('Verification code sent');
    } catch (error) {
      showToast.error('Failed to resend code');
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="border-b border-gray-200">
        <StyledView className="px-6 py-6">
          <StyledText className="text-[28px] font-merriweather-bold">
            Verify OTP
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="px-6 pt-10">
        <StyledText className="text-base font-merriweather-regular text-gray-600 mb-1">
          Enter the verification code sent to
        </StyledText>
        <StyledText className="text-lg font-merriweather-bold text-gray-900 mb-8">
          +91 {route.params.phoneNumber}
        </StyledText>

        {/* OTP Input */}
        <StyledView className="flex-row justify-between mb-6">
          {Array(CELL_COUNT).fill(null).map((_, index) => (
            <StyledTextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
                if (index === 0) firstInput.current = ref;
              }}
              className={`w-12 h-12 border rounded-lg text-center font-merriweather-bold
                ${otp[index] ? 'border-blue-600 border-2' : 'border-gray-300'}`}
              style={{
                fontSize: 20,
                lineHeight: Platform.OS === 'ios' ? 24 : 28,
              }}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              editable={!isVerifying}
              caretHidden={false}
              selectTextOnFocus={true}
              autoComplete="off"
              returnKeyType="next"
              blurOnSubmit={false}
              showSoftInputOnFocus={true}
              autoFocus={index === 0}
              textContentType="oneTimeCode"
            />
          ))}
        </StyledView>

        {/* Resend Section */}
        <StyledView className="flex-row justify-center items-center mb-8">
          <StyledText className="text-base font-merriweather-regular text-gray-600">
            Didn't receive code?{' '}
          </StyledText>
          <StyledTouchableOpacity
            onPress={handleResendOTP}
            disabled={timer > 0 || isVerifying}
          >
            <StyledText 
              className={`font-merriweather-medium ${
                timer > 0 ? 'text-gray-400' : 'text-blue-600'
              }`}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Verify Button */}
        <StyledTouchableOpacity
          className={`w-full rounded-lg py-4 items-center ${
            isVerifying || otp.every(digit => digit !== '') 
              ? 'bg-blue-600' 
              : 'bg-gray-200'
          }`}
          onPress={() => handleVerifyOTP(otp.join(''))}
          disabled={isVerifying || !otp.every(digit => digit !== '')}
        >
          {isVerifying ? (
            <StyledView className="flex-row items-center justify-center w-full">
              <ActivityIndicator 
                color="white" 
                size={20} 
                style={{marginRight: 8}}
              />
              <StyledText className="text-lg font-merriweather-medium text-white">
                Verifying...
              </StyledText>
            </StyledView>
          ) : (
            <StyledText
              className={`text-lg font-merriweather-medium ${
                otp.every(digit => digit !== '') ? 'text-white' : 'text-gray-600'
              }`}
            >
              Verify & Proceed
            </StyledText>
          )}
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default OTPVerification;
