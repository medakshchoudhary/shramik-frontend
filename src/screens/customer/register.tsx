import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TextInput as RNTextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styled} from 'nativewind';
import {showToast} from '../../utils/toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<any, 'CustomerRegistration'>;

const CustomerRegistration: React.FC<Props> = ({navigation, route}) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const validateForm = () => {
    if (!fullName.trim()) {
      showToast.error('Please enter your full name');
      return false;
    }
    if (!address.trim()) {
      showToast.error('Please enter your address');
      return false;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      showToast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // TODO: Implement API call to register customer
      showToast.success('Registration successful');
      navigation.replace('CustomerHome', {
        fullName,
        address,
        pincode,
        phoneNumber: route.params?.phoneNumber,
      });
    } catch (error) {
      showToast.error('Registration failed');
    }
  };

  const isFormValid = () => {
    return (
      fullName.trim() !== '' &&
      address.trim() !== '' &&
      pincode.trim().length === 6
    );
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="p-6">
        <StyledText className="text-2xl font-merriweather-bold mb-6">
          Customer Registration
        </StyledText>

        {/* Required fields note */}
        <StyledText className="text-sm text-gray-500 mb-4">
          Fields marked with * are required
        </StyledText>

        {/* Name Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Full Name <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </StyledView>

        {/* Address Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Address <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </StyledView>

        {/* Pincode Input */}
        <StyledView className="mb-6">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Pin Code <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your pin code"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            maxLength={6}
          />
        </StyledView>

        {/* Submit Button */}
        <StyledTouchableOpacity
          className={`rounded-lg p-4 ${
            isFormValid() ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid()}>
          <StyledText className="text-white text-center font-merriweather-bold">
            Register
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledScrollView>
  );
};

export default CustomerRegistration; 