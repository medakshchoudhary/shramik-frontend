import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TouchableOpacity,
  ScrollView,
  TextInput as RNTextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {styled} from 'nativewind';
import DropDownPicker from 'react-native-dropdown-picker';
import {showToast} from '../../utils/toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(RNTextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<any, 'CustomerHome'>;

const CustomerHome: React.FC<Props> = ({navigation, route}) => {
  // Get customer data from route params or could be from a global state/context
  const customerName = route.params?.fullName || 'Customer Name';
  const initial = customerName.charAt(0).toUpperCase();

  // Dropdown states
  const [workerTypeOpen, setWorkerTypeOpen] = useState(false);
  const [workerType, setWorkerType] = useState(null);
  const [workerTypes] = useState([
    {label: 'Plumber', value: 'plumber'},
    {label: 'Electrician', value: 'electrician'},
    {label: 'Carpenter', value: 'carpenter'},
    {label: 'Gardener', value: 'gardener'},
  ]);

  const [complexityOpen, setComplexityOpen] = useState(false);
  const [complexity, setComplexity] = useState(null);
  const [complexities] = useState([
    {label: 'Basic Fix', value: 'simple'},
    {label: 'Standard Work', value: 'moderate'},
    {label: 'Complex Project', value: 'complex'},
  ]);

  const [durationOpen, setDurationOpen] = useState(false);
  const [duration, setDuration] = useState(null);
  const [durations] = useState([
    {label: '30 mins - 1 hour', value: 'quick'},
    {label: '1-3 hours', value: 'medium'},
    {label: '3+ hours', value: 'long'},
  ]);

  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [locations] = useState([
    {label: 'Kitchen', value: 'kitchen'},
    {label: 'Bathroom', value: 'bathroom'},
    {label: 'Garden', value: 'garden'},
    {label: 'Balcony', value: 'balcony'},
    {label: 'Lobby', value: 'lobby'},
  ]);

  const [taskTypeOpen, setTaskTypeOpen] = useState(false);
  const [taskType, setTaskType] = useState(null);
  const [taskTypes] = useState([
    {label: 'Fix a pipe', value: 'pipe_fix'},
    {label: 'Repair furniture', value: 'furniture_repair'},
    {label: 'Build furniture', value: 'furniture_build'},
    {label: 'Other', value: 'other'},
  ]);

  const [otherDetails, setOtherDetails] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasAudioMessage, setHasAudioMessage] = useState(false);

  // Add new states for audio
  const [audioPermission, setAudioPermission] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone to record audio messages',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setAudioPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleRecordAudio = async () => {
    if (!audioPermission) {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        showToast.error('Microphone permission is required to record audio');
        return;
      }
    }
    // TODO: Implement actual audio recording
    setIsRecording(!isRecording);
    if (isRecording) {
      // Stop recording and save
      setAudioUri('dummy-uri');
      setHasAudioMessage(true);
      showToast.success('Audio message recorded');
    }
  };

  const handlePlayAudio = () => {
    // TODO: Implement actual audio playback
    setIsPlaying(!isPlaying);
  };

  const handleDiscardAudio = () => {
    setAudioUri(null);
    setHasAudioMessage(false);
  };

  const isFormValid = () => {
    return (
      workerType &&
      complexity &&
      duration &&
      location &&
      taskType &&
      (taskType !== 'other' || otherDetails.trim().length > 0)
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      showToast.error('Please fill all required fields');
      return;
    }

    try {
      // TODO: Implement API call to create request
      showToast.success('Request created successfully');
      // Navigate to confirmation screen
    } catch (error) {
      showToast.error('Failed to create request');
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header with Profile */}
      <StyledView className="border-b border-gray-200">
        <StyledView className="px-6 py-4 flex-row items-center">
          <StyledView className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center">
            <StyledText className="text-xl text-white font-merriweather-bold text-center">
              {initial}
            </StyledText>
          </StyledView>
          <StyledView className="ml-4">
            <StyledText className="text-base text-gray-500 font-merriweather-regular">
              Hello,
            </StyledText>
            <StyledText className="text-lg text-gray-900 font-merriweather-medium">
              {customerName}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledScrollView className="flex-1 px-4">
        <StyledText className="text-2xl font-merriweather-bold mt-6 mb-4 px-2">
          Create New Request
        </StyledText>

        {/* Request Form Card */}
        <StyledView className="bg-gray-50 rounded-xl p-4 mb-6">
          <StyledView className="space-y-4">
            {/* Worker Type */}
            <StyledView className="z-50">
              <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                Worker Type
              </StyledText>
              <DropDownPicker
                open={workerTypeOpen}
                value={workerType}
                items={workerTypes}
                setOpen={setWorkerTypeOpen}
                setValue={setWorkerType}
                searchable
                placeholder="Select worker type"
                style={{borderColor: '#D1D5DB', borderRadius: 8}}
                textStyle={{fontFamily: 'Merriweather-Regular'}}
              />
            </StyledView>

            {/* Complexity */}
            <StyledView className="z-40">
              <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                Task Complexity
              </StyledText>
              <DropDownPicker
                open={complexityOpen}
                value={complexity}
                items={complexities}
                setOpen={setComplexityOpen}
                setValue={setComplexity}
                placeholder="Select task complexity"
                style={{borderColor: '#D1D5DB', borderRadius: 8}}
                textStyle={{fontFamily: 'Merriweather-Regular'}}
              />
            </StyledView>

            {/* Duration */}
            <StyledView className="z-30">
              <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                Estimated Time
              </StyledText>
              <DropDownPicker
                open={durationOpen}
                value={duration}
                items={durations}
                setOpen={setDurationOpen}
                setValue={setDuration}
                placeholder="Select estimated duration"
                style={{borderColor: '#D1D5DB', borderRadius: 8}}
                textStyle={{fontFamily: 'Merriweather-Regular'}}
              />
            </StyledView>

            {/* Location */}
            <StyledView className="z-20">
              <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                Location in House
              </StyledText>
              <DropDownPicker
                open={locationOpen}
                value={location}
                items={locations}
                setOpen={setLocationOpen}
                setValue={setLocation}
                placeholder="Select location"
                style={{borderColor: '#D1D5DB', borderRadius: 8}}
                textStyle={{fontFamily: 'Merriweather-Regular'}}
              />
            </StyledView>

            {/* Task Type */}
            <StyledView className="z-10">
              <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                Task Type
              </StyledText>
              <DropDownPicker
                open={taskTypeOpen}
                value={taskType}
                items={taskTypes}
                setOpen={setTaskTypeOpen}
                setValue={setTaskType}
                placeholder="Select task type"
                style={{borderColor: '#D1D5DB', borderRadius: 8}}
                textStyle={{fontFamily: 'Merriweather-Regular'}}
              />
            </StyledView>

            {/* Other Details */}
            {taskType === 'other' && (
              <StyledView>
                <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                  Additional Details
                </StyledText>
                <StyledTextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base font-merriweather-regular"
                  multiline
                  numberOfLines={4}
                  value={otherDetails}
                  onChangeText={setOtherDetails}
                  placeholder="Please describe your task"
                  textAlignVertical="top"
                />
              </StyledView>
            )}

            {/* Audio Message Section */}
            <StyledView className="mt-4">
              <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                Voice Note (Optional)
              </StyledText>
              
              {!hasAudioMessage ? (
                <StyledTouchableOpacity
                  onPress={handleRecordAudio}
                  className={`flex-row items-center justify-center py-3 px-4 rounded-lg ${
                    isRecording ? 'bg-red-50' : 'bg-white'
                  } border ${isRecording ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <StyledText
                    className={`font-merriweather-medium ${
                      isRecording ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    {isRecording ? '⏺ Recording... Tap to stop' : '🎤 Record voice note'}
                  </StyledText>
                </StyledTouchableOpacity>
              ) : (
                <StyledView className="bg-white border border-gray-300 rounded-lg p-4">
                  <StyledView className="flex-row items-center justify-between">
                    <StyledTouchableOpacity
                      onPress={handlePlayAudio}
                      className="flex-row items-center"
                    >
                      <StyledText className="font-merriweather-medium text-blue-600">
                        {isPlaying ? '⏸ Playing...' : '▶️ Play recording'}
                      </StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                      onPress={handleDiscardAudio}
                      className="flex-row items-center"
                    >
                      <StyledText className="font-merriweather-medium text-red-500">
                        🗑️ Discard
                      </StyledText>
                    </StyledTouchableOpacity>
                  </StyledView>
                </StyledView>
              )}
            </StyledView>

            {/* Submit Button */}
            <StyledTouchableOpacity
              className={`w-full rounded-lg py-4 items-center mt-6 ${
                isFormValid() ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              onPress={handleSubmit}
              disabled={!isFormValid()}
            >
              <StyledText
                className={`text-xl font-merriweather-medium ${
                  isFormValid() ? 'text-white' : 'text-gray-600'
                }`}
              >
                Submit Request
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
};

export default CustomerHome; 