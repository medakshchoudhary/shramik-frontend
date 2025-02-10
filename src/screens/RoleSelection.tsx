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
};

function RoleSelection({navigation}: RoleSelectionProps): React.JSX.Element {
  const handleRoleSelection = (role: 'customer' | 'worker') => {
    switch (role) {
      case 'customer':
        navigation.navigate('CustomerRegistration');
        break;
      case 'worker':
        // TODO: Add worker registration later
        showToast.info('Worker registration coming soon');
        break;
    }
  };

  return (
    <StyledView className="flex-1 bg-white px-6 justify-center">
      <StyledText className="text-3xl font-merriweather-bold text-center mb-8">
        Select Your Role
      </StyledText>
      
      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4 items-center mb-4"
        onPress={() => handleRoleSelection('customer')}
      >
        <StyledText className="text-xl font-merriweather-medium text-white">
          Customer
        </StyledText>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4 items-center"
        onPress={() => handleRoleSelection('worker')}
      >
        <StyledText className="text-xl font-merriweather-medium text-white">
          Worker
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}

export default RoleSelection; 