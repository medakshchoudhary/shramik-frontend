import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TextInput as RNTextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styled} from 'nativewind';
import {showToast} from '../../utils/toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import { getPincodeDetails } from '../../data/pincodes';

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
  const [districtOpen, setDistrictOpen] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState<{label: string; value: string; areas: string[]}[]>([]);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePincodeChange = async (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPincode(cleaned);

    if (cleaned.length === 6) {
      setIsPincodeLoading(true);
      try {
        const data = getPincodeDetails(cleaned);
        if (data) {
          setState(data.statename);
          
          const districtOptions = data.districts.map(d => ({
            label: d.name,
            value: d.name,
            areas: d.areas
          }));

          setAvailableDistricts(districtOptions);
          
          if (districtOptions.length === 1) {
            setDistrict(districtOptions[0].value);
            if (districtOptions[0].areas.length > 0) {
              setLocality(districtOptions[0].areas[0]);
            }
          }
        } else {
          showToast.error('Pincode not found in our database');
          resetLocationFields();
        }
      } finally {
        setIsPincodeLoading(false);
      }
    } else {
      resetLocationFields();
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDistrictChange = (value: any) => {
    setDistrict(value);
    
    // Find the selected district's areas
    const selectedDistrict = availableDistricts.find(d => d.value === value);
    if (selectedDistrict) {
      // Set locality to first area if available, but keep it editable
      if (selectedDistrict.areas.length > 0) {
        setLocality(selectedDistrict.areas[0]);
      } else {
        setLocality('');
      }
    } else {
      setLocality('');
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

  const resetLocationFields = () => {
    setState('');
    setDistrict('');
    setLocality('');
    setAvailableDistricts([]);
  };

  return (
    <StyledScrollView 
      className="flex-1 bg-white"
      keyboardShouldPersistTaps="handled"
    >
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
            placeholderTextColor="#6B7280"
            value={fullName}
            onChangeText={setFullName}
          />
        </StyledView>

        {/* Address Section */}
        <StyledView className="mb-4">
          <StyledText className="text-lg font-merriweather-bold mb-4">
            Address Details
          </StyledText>

          {/* Pincode Input with Loading Indicator */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              Pin Code <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledView className="relative">
              <StyledTextInput
                className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
                placeholder="Enter your pin code"
                placeholderTextColor="#6B7280"
                value={pincode}
                onChangeText={handlePincodeChange}
                keyboardType="numeric"
                maxLength={6}
                editable={!isPincodeLoading}
              />
              {isPincodeLoading && (
                <StyledView className="absolute right-3 top-3">
                  <ActivityIndicator color="#4B5563" />
                </StyledView>
              )}
            </StyledView>
          </StyledView>

          {/* Main Address Input */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              Main Address <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
              placeholder="House/Flat No., Street Name"
              placeholderTextColor="#6B7280"
              value={mainAddress}
              onChangeText={setMainAddress}
              multiline
            />
          </StyledView>

          {/* State Input */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              State <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular bg-gray-100"
              value={state}
              editable={false}
              placeholder="Will be auto-filled from pincode"
              placeholderTextColor="#6B7280"
            />
          </StyledView>

          {/* District Dropdown */}
          <StyledView className="mb-4 z-40">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              District <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <DropDownPicker
              open={districtOpen}
              value={district}
              items={availableDistricts}
              setOpen={setDistrictOpen}
              setValue={handleDistrictChange}
              placeholder="Select district"
              style={{
                borderColor: '#D1D5DB',
                minHeight: 48
              }}
              placeholderStyle={{
                color: '#6B7280',
                fontFamily: 'Merriweather-Regular'
              }}
              textStyle={{
                color: '#111827',
                fontFamily: 'Merriweather-Regular'
              }}
              zIndex={2000}
            />
          </StyledView>

          {/* Locality Input - Now always editable */}
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              Locality
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
              placeholder="Enter your locality"
              placeholderTextColor="#6B7280"
              value={locality}
              onChangeText={setLocality}
            />
          </StyledView>
        </StyledView>

        {/* Submit Button with Loading State */}
        <StyledTouchableOpacity
          className={`rounded-lg p-4 ${
            isFormValid() ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid() || isSubmitting}>
          <StyledView className="flex-row items-center justify-center">
            <StyledText className="text-white text-center font-merriweather-bold">
              Register
            </StyledText>
            {isSubmitting && (
              <ActivityIndicator color="white" style={{marginLeft: 8}} />
            )}
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledScrollView>
  );
};

export default CustomerRegistration; 