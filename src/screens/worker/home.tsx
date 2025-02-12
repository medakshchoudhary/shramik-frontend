import React from 'react';
import {
  View,
  Text as RNText,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

type Props = NativeStackScreenProps<any, 'WorkerHome'>;

const WorkerHome: React.FC<Props> = ({route, navigation}) => {
  // Get worker data from route params
  const workerName = route.params?.fullName || 'Worker Name';
  const initial = workerName.charAt(0).toUpperCase();
  const profession = route.params?.profession || 'Professional';

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header Section */}
      <StyledView className="bg-white p-6 border-b border-gray-200">
        <StyledView className="flex-row items-center">
          {/* Profile Circle */}
          <StyledView className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center mr-4">
            <StyledText className="text-2xl text-white font-merriweather-bold">
              {initial}
            </StyledText>
          </StyledView>
          
          {/* Welcome Text */}
          <StyledView>
            <StyledText className="text-lg text-gray-600 font-merriweather-regular">
              Hello,
            </StyledText>
            <StyledText className="text-2xl font-merriweather-bold">
              {workerName}
            </StyledText>
            <StyledText className="text-sm text-gray-600 font-merriweather-regular">
              {profession}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Task Notifications Section */}
      <StyledScrollView className="flex-1 bg-gray-50">
        <StyledView className="p-6">
          <StyledText className="text-xl font-merriweather-bold mb-4">
            Available Tasks
          </StyledText>

          {/* Task Notification Card */}
          <StyledView className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <StyledView className="flex-row justify-between items-start">
              <StyledView className="flex-1">
                <StyledText className="font-merriweather-bold text-lg">
                  John Doe
                </StyledText>
                <StyledText className="text-gray-600 font-merriweather-regular mt-1">
                  Requirement of Plumbing for Pipe Fix
                </StyledText>
                <StyledText className="text-gray-500 font-merriweather-regular mt-1">
                  Location: Andheri East
                </StyledText>
              </StyledView>
              <StyledTouchableOpacity
                className="bg-gray-100 rounded-lg px-4 py-2"
                onPress={() => navigation.navigate('TaskDetails', {
                  taskId: '123',
                  customerName: 'John Doe'
                })}>
                <StyledText className="font-merriweather-medium">
                  View
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>

      {/* Bottom Navigation Bar */}
      <StyledView className="flex-row bg-white border-t border-gray-200">
        <StyledTouchableOpacity
          className="flex-1 py-4 items-center"
          onPress={() => {}}>
          <StyledText className="font-merriweather-medium text-blue-500">
            Home
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className="flex-1 py-4 items-center"
          onPress={() => navigation.navigate('WorkerHistory')}>
          <StyledText className="font-merriweather-medium text-gray-500">
            History
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className="flex-1 py-4 items-center"
          onPress={() => navigation.navigate('WorkerProfile')}>
          <StyledText className="font-merriweather-medium text-gray-500">
            Profile
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default WorkerHome; 