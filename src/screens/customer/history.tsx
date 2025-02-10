import React from 'react';
import {View, Text as RNText} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(RNText);

type Props = NativeStackScreenProps<any, 'CustomerHistory'>;

const CustomerHistory: React.FC<Props> = () => {
  return (
    <StyledView className="flex-1 bg-white">
      <StyledView className="border-b border-gray-200">
        <StyledView className="px-6 py-6">
          <StyledText className="text-[28px] font-merriweather-bold">
            Request History
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="flex-1 items-center justify-center">
        <StyledText className="text-lg font-merriweather-regular text-gray-500">
          No requests yet
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default CustomerHistory; 