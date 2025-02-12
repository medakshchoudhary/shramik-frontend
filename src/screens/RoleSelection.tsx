import React from 'react';
import {View, Text as RNText, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {showToast} from '../utils/toast';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTouchableOpacity = styled(TouchableOpacity);

type RoleSelectionProps = {
  navigation: NativeStackNavigationProp<any>;
  route: any;
};

const RoleSelection: React.FC<RoleSelectionProps> = ({navigation, route}) => {
  const handleRoleSelect = (role: string) => {
    if (role === 'customer') {
      navigation.navigate('CustomerRegistration', route.params);
    } else if (role === 'worker') {
      navigation.navigate('WorkerRegistration', route.params);
    }
  };

  return (
    <StyledView className="flex-1 bg-white px-6 justify-center">
      <StyledText className="text-3xl font-merriweather-bold text-center mb-8">
        Select Your Role
      </StyledText>
      
      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4 items-center mb-4"
        onPress={() => handleRoleSelect('customer')}
      >
        <StyledText className="text-xl font-merriweather-medium text-white">
          Customer
        </StyledText>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4 items-center"
        onPress={() => handleRoleSelect('worker')}
      >
        <StyledText className="text-xl font-merriweather-medium text-white">
          Worker
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default RoleSelection; 