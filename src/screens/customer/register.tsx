import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TextInput as RNTextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showToast} from '../../utils/toast';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

type Props = NativeStackScreenProps<any, 'CustomerRegistration'>;

const CustomerRegistration: React.FC<Props> = ({navigation}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
  });

  const isFormValid = () => {
    return (
      formData.fullName.trim().length > 0 &&
      formData.address.trim().length > 0 &&
      formData.pincode.length === 6
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      showToast.error('Please fill all fields correctly');
      return;
    }

    try {
      // TODO: Implement API call to register customer
      showToast.success('Registration successful!');
      navigation.replace('CustomerHome', {
        fullName: formData.fullName,
        address: formData.address,
        pincode: formData.pincode,
      });
    } catch (error) {
      showToast.error('Registration failed. Please try again.');
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="border-b border-gray-200">
        <StyledView className="px-6 py-6">
          <StyledText className="text-[28px] font-merriweather-bold">
            Enter Your Details
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledScrollView className="flex-1 px-6">
        <StyledView className="space-y-4 pt-6">
          {/* Full Name */}
          <StyledView>
            <StyledText className="text-gray-600 font-merriweather-regular mb-2">
              Full Name
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-lg font-merriweather-regular"
              value={formData.fullName}
              onChangeText={(text) => setFormData({...formData, fullName: text})}
              placeholder="Enter your full name"
              autoFocus={true}
            />
          </StyledView>

          {/* Address */}
          <StyledView>
            <StyledText className="text-gray-600 font-merriweather-regular mb-2">
              Address
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-lg font-merriweather-regular"
              value={formData.address}
              onChangeText={(text) => setFormData({...formData, address: text})}
              placeholder="Enter your address"
              multiline
              numberOfLines={3}
            />
          </StyledView>

          {/* Pincode */}
          <StyledView>
            <StyledText className="text-gray-600 font-merriweather-regular mb-2">
              Pincode
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-lg font-merriweather-regular"
              value={formData.pincode}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setFormData({...formData, pincode: cleaned});
              }}
              placeholder="Enter pincode"
              keyboardType="number-pad"
              maxLength={6}
            />
          </StyledView>

          {/* Register Button */}
          <StyledTouchableOpacity
            className={`w-full rounded-lg py-4 items-center mt-8 ${
              isFormValid() ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onPress={handleRegister}
            disabled={!isFormValid()}
          >
            <StyledText
              className={`text-xl font-merriweather-medium ${
                isFormValid() ? 'text-white' : 'text-gray-600'
              }`}
            >
              Finish
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Bottom Spacing */}
        <StyledView className="h-10" />
      </StyledScrollView>
    </StyledView>
  );
};

export default CustomerRegistration; 