import React from 'react';
import {
  View,
  Text as RNText,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styled} from 'nativewind';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<any, 'WorkerHistory'>;

const TaskCard = ({
  customerName,
  taskType,
  date,
  status,
  amount,
}: {
  customerName: string;
  taskType: string;
  date: string;
  status: 'completed' | 'cancelled';
  amount?: string;
}) => (
  <StyledView className="bg-white rounded-lg shadow-sm p-4 mb-4">
    <StyledView className="flex-row justify-between items-start mb-2">
      <StyledText className="font-merriweather-bold text-lg">
        {customerName}
      </StyledText>
      <StyledView
        className={`px-3 py-1 rounded-full ${
          status === 'completed' ? 'bg-green-100' : 'bg-red-100'
        }`}>
        <StyledText
          className={`text-sm font-merriweather-medium ${
            status === 'completed' ? 'text-green-700' : 'text-red-700'
          }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </StyledText>
      </StyledView>
    </StyledView>
    <StyledText className="text-gray-600 font-merriweather-regular">
      {taskType}
    </StyledText>
    <StyledText className="text-gray-500 font-merriweather-regular text-sm mt-1">
      {date}
    </StyledText>
    {status === 'completed' && amount && (
      <StyledText className="text-green-600 font-merriweather-bold mt-2">
        ₹{amount}
      </StyledText>
    )}
  </StyledView>
);

const WorkerHistory: React.FC<Props> = () => {
  // Sample data - replace with actual API data
  const tasks = [
    {
      id: '1',
      customerName: 'John Doe',
      taskType: 'Pipe Fix',
      date: '15 Mar 2024',
      status: 'completed' as const,
      amount: '500',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      taskType: 'Tap Repair',
      date: '14 Mar 2024',
      status: 'cancelled' as const,
    },
    // Add more sample tasks
  ];

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="bg-white p-6 border-b border-gray-200">
        <StyledText className="text-2xl font-merriweather-bold">
          Task History
        </StyledText>
      </StyledView>

      {/* Task List */}
      <StyledScrollView className="flex-1 bg-gray-50">
        <StyledView className="p-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              customerName={task.customerName}
              taskType={task.taskType}
              date={task.date}
              status={task.status}
              amount={task.amount}
            />
          ))}
        </StyledView>
      </StyledScrollView>

      {/* Bottom Navigation Bar */}
      <StyledView className="flex-row bg-white border-t border-gray-200">
        <StyledTouchableOpacity
          className="flex-1 py-4 items-center"
          onPress={() => navigation.navigate('WorkerHome')}>
          <StyledText className="font-merriweather-medium text-gray-500">
            Home
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className="flex-1 py-4 items-center">
          <StyledText className="font-merriweather-medium text-blue-500">
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

export default WorkerHistory; 