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
  const handleRoleSelection = (role: 'karigar' | 'contractor') => {
    showToast.success(`You have selected ${role} role`);
    // Navigate to appropriate screen based on role
    console.log(`${role} selected`);
    // navigation.navigate(...);
  };

  return (
    <StyledView className="flex-1 bg-white px-6 justify-center">
      <StyledText className="text-3xl font-merriweather-bold text-center mb-8">
        Select Your Role
      </StyledText>
      
      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4 items-center mb-4"
        onPress={() => handleRoleSelection('karigar')}
      >
        <StyledText className="text-xl font-merriweather-medium text-white">
          Karigar
        </StyledText>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4 items-center"
        onPress={() => handleRoleSelection('contractor')}
      >
        <StyledText className="text-xl font-merriweather-medium text-white">
          Contractor
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}

export default RoleSelection; 