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
  const [mainAddress, setMainAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const validateForm = () => {
    if (!fullName.trim()) {
      showToast.error('Please enter your full name');
      return false;
    }
    if (!mainAddress.trim()) {
      showToast.error('Please enter your main address');
      return false;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      showToast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    if (!district.trim() || !state.trim()) {
      showToast.error('Please enter a valid district and state');
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
        mainAddress,
        locality,
        district,
        state,
        pincode,
        phoneNumber: route.params?.phoneNumber,
      });
    } catch (error) {
      showToast.error('Registration failed');
    }
  };

  const handlePincodeChange = async (text: string) => {
    // Only allow numbers
    const cleaned = text.replace(/[^0-9]/g, '');
    setPincode(cleaned);

    if (cleaned.length === 6) {
      try {
        // TODO: Replace with actual API call
        const response = {
          district: 'Mumbai',
          state: 'Maharashtra'
        };
        setDistrict(response.district);
        setState(response.state);
      } catch (error) {
        console.error('Error fetching location data:', error);
        showToast.error('Error fetching location data');
      }
    } else {
      setDistrict('');
      setState('');
    }
  };

  const isFormValid = () => {
    return (
      fullName.trim() !== '' &&
      pincode.trim().length === 6 &&
      mainAddress.trim() !== '' &&
      district !== '' &&
      state !== ''
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
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </StyledView>

        {/* Address Section */}
        <StyledView className="mb-4">
          <StyledText className="text-lg font-merriweather-bold mb-4">
            Address Details
          </StyledText>

          {/* Pincode Input */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              Pin Code <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
              placeholder="Enter your pin code"
              value={pincode}
              onChangeText={handlePincodeChange}
              keyboardType="numeric"
              maxLength={6}
            />
          </StyledView>

          {/* Main Address Input */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              Main Address <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
              placeholder="House/Flat No., Street Name"
              value={mainAddress}
              onChangeText={setMainAddress}
              multiline
            />
          </StyledView>

          {/* Locality Input */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              Locality
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
              placeholder="Area/Locality (Optional)"
              value={locality}
              onChangeText={setLocality}
            />
          </StyledView>

          {/* District Input (Auto-filled) */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              District <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular bg-gray-100"
              value={district}
              editable={false}
              placeholder="Will be auto-filled from pincode"
            />
          </StyledView>

          {/* State Input (Auto-filled) */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              State <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular bg-gray-100"
              value={state}
              editable={false}
              placeholder="Will be auto-filled from pincode"
            />
          </StyledView>
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