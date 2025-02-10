import React from 'react';
import {View, Text as RNText, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<any, 'CustomerProfile'>;

const CustomerProfile: React.FC<Props> = ({route}) => {
  const customerName = route.params?.fullName || 'Customer Name';
  const initial = customerName.charAt(0).toUpperCase();

  return (
    <StyledView className="flex-1 bg-white">
      <StyledView className="border-b border-gray-200">
        <StyledView className="px-6 py-6">
          <StyledText className="text-[28px] font-merriweather-bold">
            Profile
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="px-6 pt-6">
        <StyledView className="items-center mb-8">
          <StyledView className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center mb-4">
            <StyledText className="text-4xl text-white font-merriweather-bold">
              {initial}
            </StyledText>
          </StyledView>
          <StyledText className="text-2xl font-merriweather-bold text-gray-900">
            {customerName}
          </StyledText>
        </StyledView>

        <StyledView className="space-y-4">
          <StyledView className="border-b border-gray-200 pb-4">
            <StyledText className="text-sm font-merriweather-regular text-gray-500">
              Phone Number
            </StyledText>
            <StyledText className="text-lg font-merriweather-medium text-gray-900">
              +91 {route.params?.phoneNumber || 'Not available'}
            </StyledText>
          </StyledView>

          <StyledView className="border-b border-gray-200 pb-4">
            <StyledText className="text-sm font-merriweather-regular text-gray-500">
              Address
            </StyledText>
            <StyledText className="text-lg font-merriweather-medium text-gray-900">
              {route.params?.address || 'Not available'}
            </StyledText>
          </StyledView>

          <StyledView className="border-b border-gray-200 pb-4">
            <StyledText className="text-sm font-merriweather-regular text-gray-500">
              Pincode
            </StyledText>
            <StyledText className="text-lg font-merriweather-medium text-gray-900">
              {route.params?.pincode || 'Not available'}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default CustomerProfile; 