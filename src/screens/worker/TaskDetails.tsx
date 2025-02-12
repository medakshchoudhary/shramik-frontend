import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showToast} from '../../utils/toast';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<any, 'TaskDetails'>;

const TaskDetails: React.FC<Props> = ({navigation, route}) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const task = route.params?.task;

  const handleAcceptTask = async () => {
    setIsAccepting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      navigation.navigate('OTPVerification', {
        taskId: task.id,
        customerId: task.customerId,
      });
    } catch (error) {
      showToast.error('Failed to accept task');
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="border-b border-gray-200">
        <StyledView className="px-6 py-6">
          <StyledText className="text-[28px] font-merriweather-bold">
            Task Details
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="p-6">
        {/* Customer Details */}
        <StyledView className="mb-6">
          <StyledText className="text-lg font-merriweather-bold text-gray-900 mb-2">
            Customer Details
          </StyledText>
          <StyledText className="text-base font-merriweather-regular text-gray-700">
            {task?.customerName}
          </StyledText>
          <StyledText className="text-base font-merriweather-regular text-gray-700">
            {task?.address}
          </StyledText>
        </StyledView>

        {/* Task Description */}
        <StyledView className="mb-6">
          <StyledText className="text-lg font-merriweather-bold text-gray-900 mb-2">
            Task Description
          </StyledText>
          <StyledText className="text-base font-merriweather-regular text-gray-700">
            {task?.description}
          </StyledText>
        </StyledView>

        {/* Service Type */}
        <StyledView className="mb-6">
          <StyledText className="text-lg font-merriweather-bold text-gray-900 mb-2">
            Service Required
          </StyledText>
          <StyledText className="text-base font-merriweather-regular text-gray-700">
            {task?.serviceType}
          </StyledText>
        </StyledView>

        {/* Time Availability */}
        <StyledView className="mb-6">
          <StyledText className="text-lg font-merriweather-bold text-gray-900 mb-2">
            Time Availability
          </StyledText>
          <StyledText className="text-base font-merriweather-regular text-gray-700">
            {task?.timeAvailability}
          </StyledText>
        </StyledView>

        {/* Map will be added here */}
        <StyledView className="h-48 bg-gray-100 rounded-lg mb-6">
          <StyledText className="text-center py-20 text-gray-500">
            Map View Coming Soon
          </StyledText>
        </StyledView>

        {/* Action Buttons */}
        <StyledView className="flex-row space-x-4">
          <StyledTouchableOpacity
            className="flex-1 bg-green-500 rounded-lg p-4"
            onPress={handleAcceptTask}
            disabled={isAccepting}>
            {isAccepting ? (
              <ActivityIndicator color="white" />
            ) : (
              <StyledText className="text-white text-center font-merriweather-bold">
                Accept
              </StyledText>
            )}
          </StyledTouchableOpacity>
          
          <StyledTouchableOpacity
            className="flex-1 bg-red-500 rounded-lg p-4"
            onPress={() => navigation.goBack()}>
            <StyledText className="text-white text-center font-merriweather-bold">
              Reject
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default TaskDetails; 