import React, {useState} from 'react';
import {View, Text as RNText, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getPincodeDetails} from '../data/pincodes';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTouchableOpacity = styled(TouchableOpacity);

type RoleSelectionProps = {
  navigation: NativeStackNavigationProp<any>;
  route: any;
};

const RoleSelection: React.FC<RoleSelectionProps> = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleRoleSelect = async (role: string) => {
    setIsLoading(role);
    try {
      if (role === 'worker') {
        // Pre-load pincode data for worker registration
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate data loading
        const testData = getPincodeDetails('400001');
        if (!testData) {
          throw new Error('Failed to load location data');
        }
      }
      
      navigation.navigate(
        role === 'customer' ? 'CustomerRegistration' : 'WorkerRegistration',
        route.params
      );
    } catch (error) {
      console.error('Role selection error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <StyledView className="flex-1 bg-white px-6 justify-center">
      <StyledText className="text-3xl font-merriweather-bold text-center mb-8">
        Select Your Role
      </StyledText>
      
      {/* Customer Button */}
      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4 mb-4"
        onPress={() => handleRoleSelect('customer')}
        disabled={isLoading !== null}
      >
        <StyledView className="flex-row items-center justify-center px-4">
          <StyledText className="text-xl font-merriweather-bold text-white">
            Customer
          </StyledText>
          {isLoading === 'customer' && (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          )}
        </StyledView>
      </StyledTouchableOpacity>

      {/* Worker Button */}
      <StyledTouchableOpacity 
        className="w-full bg-blue-600 rounded-lg py-4"
        onPress={() => handleRoleSelect('worker')}
        disabled={isLoading !== null}
      >
        <StyledView className="flex-row items-center justify-center px-4">
          <StyledText className="text-xl font-merriweather-bold text-white">
            Worker
          </StyledText>
          {isLoading === 'worker' && (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          )}
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default RoleSelection; 