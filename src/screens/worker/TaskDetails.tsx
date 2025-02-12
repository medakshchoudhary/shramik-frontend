import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TouchableOpacity,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showToast} from '../../utils/toast';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(RNTextInput);

type Props = NativeStackScreenProps<any, 'TaskDetails'>;

const TaskDetails: React.FC<Props> = ({route, navigation}) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [taskAccepted, setTaskAccepted] = useState(false);

  const handleAccept = () => {
    setTaskAccepted(true);
    setShowOtpInput(true);
  };

  const handleReject = () => {
    navigation.goBack();
    showToast.info('Task rejected');
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      showToast.success('Task started successfully');
      navigation.replace('WorkerHome');
    } else {
      showToast.error('Invalid OTP');
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="bg-white p-6 border-b border-gray-200">
        <StyledText className="text-2xl font-merriweather-bold">
          Task Details
        </StyledText>
      </StyledView>

      <StyledScrollView className="flex-1">
        <StyledView className="p-6">
          {/* Customer Details */}
          <StyledView className="mb-6">
            <StyledText className="text-lg font-merriweather-bold mb-2">
              Customer Details
            </StyledText>
            <StyledText className="text-gray-600 font-merriweather-regular">
              Name: {route.params?.customerName}
            </StyledText>
            <StyledText className="text-gray-600 font-merriweather-regular">
              Location: Andheri East, Mumbai
            </StyledText>
            {taskAccepted && (
              <StyledText className="text-gray-600 font-merriweather-regular">
                Phone: +91 9876543210
              </StyledText>
            )}
          </StyledView>

          {/* Task Information */}
          <StyledView className="mb-6">
            <StyledText className="text-lg font-merriweather-bold mb-2">
              Task Information
            </StyledText>
            <StyledText className="text-gray-600 font-merriweather-regular">
              Service: Plumbing
            </StyledText>
            <StyledText className="text-gray-600 font-merriweather-regular">
              Type: Pipe Fix
            </StyledText>
            <StyledText className="text-gray-600 font-merriweather-regular">
              Complexity: Basic Fix
            </StyledText>
            <StyledText className="text-gray-600 font-merriweather-regular">
              Expected Duration: 30 mins - 1 hour
            </StyledText>
          </StyledView>

          {/* Map Section Placeholder */}
          <StyledView className="mb-6">
            <StyledText className="text-lg font-merriweather-bold mb-2">
              Location
            </StyledText>
            <StyledView className="h-40 bg-gray-100 rounded-lg items-center justify-center">
              <StyledText className="text-gray-500">Map View</StyledText>
            </StyledView>
          </StyledView>

          {/* OTP Input Section */}
          {showOtpInput && (
            <StyledView className="mb-6">
              <StyledText className="text-lg font-merriweather-bold mb-2">
                Enter OTP to Start Task
              </StyledText>
              <StyledTextInput
                className="border border-gray-300 rounded-lg p-3 font-merriweather-regular mb-4"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
              />
              <StyledTouchableOpacity
                className="bg-blue-500 rounded-lg p-4"
                onPress={verifyOtp}>
                <StyledText className="text-white text-center font-merriweather-bold">
                  Verify & Start Task
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          )}
        </StyledView>
      </StyledScrollView>

      {/* Action Buttons */}
      {!showOtpInput && (
        <StyledView className="flex-row p-6 border-t border-gray-200">
          <StyledTouchableOpacity
            className="flex-1 bg-red-500 rounded-lg p-4 mr-2"
            onPress={handleReject}>
            <StyledText className="text-white text-center font-merriweather-bold">
              Reject
            </StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            className="flex-1 bg-green-500 rounded-lg p-4 ml-2"
            onPress={handleAccept}>
            <StyledText className="text-white text-center font-merriweather-bold">
              Accept
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      )}
    </StyledView>
  );
};

export default TaskDetails; 