import React, {useState} from 'react';
import {
  View,
  TextInput as RNTextInput,
} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledTextInput = styled(RNTextInput);

type Props = NativeStackScreenProps<any, 'Login'>;

const PhoneNumber: React.FC<Props> = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text.replace(/[^0-9]/g, ''));
  };

  return (
    <StyledView className="flex-1 bg-white p-6">
      <StyledTextInput
        className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
        placeholder="Enter your phone number"
        placeholderTextColor="#6B7280"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType="numeric"
        maxLength={10}
      />
    </StyledView>
  );
};

export default PhoneNumber; 