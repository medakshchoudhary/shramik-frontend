import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text as RNText,
  TouchableOpacity,
  TextInput as RNTextInput,
  Platform,
  ScrollView,
} from 'react-native';
import {styled} from 'nativewind';
import DropDownPicker from 'react-native-dropdown-picker';
import {showToast} from '../../utils/toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {PermissionsAndroid} from 'react-native';
import {checkPermission} from '../../components/PermissionRequester';
import RNFS from 'react-native-fs';


const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

type Props = NativeStackScreenProps<any, 'CustomerHome'>;

const CustomerHome: React.FC<Props> = ({route, navigation}) => {
  const scrollViewRef = useRef<any>(null);

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingPath, setRecordingPath] = useState<string | null>(null);

  // Initialize AudioRecorderPlayer
  const [audioRecorderPlayer] = useState(() => new AudioRecorderPlayer());

  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      if (isRecording) {
        audioRecorderPlayer.stopRecorder();
      }
      if (isPlaying) {
        audioRecorderPlayer.stopPlayer();
      }
      audioRecorderPlayer.removePlayBackListener();
    };
  }, [audioRecorderPlayer, isRecording, isPlaying]);

  const handleRecordAudio = async () => {
    try {
      // Check permissions before recording
      const micPermission = await checkPermission(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      const storagePermission = await checkPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      
      if (!micPermission || !storagePermission) {
        showToast.error('Required permissions not granted. Please enable in settings.');
        return;
      }

      if (!isRecording) {
        // Start recording
        const path = Platform.select({
          ios: 'voice_note.m4a',
          android: `${RNFS.DocumentDirectoryPath}/voice_note.mp4`,
        });
        
        if (!path) {
          showToast.error('Could not determine recording path');
          return;
        }

        await audioRecorderPlayer.startRecorder(path);
        setRecordingPath(path);
        setIsRecording(true);
        showToast.info('Recording started...');

        // Add recording finished listener
        audioRecorderPlayer.addRecordBackListener((e) => {
          console.log('Recording progress:', e);
        });
      } else {
        // Remove recording listener
        audioRecorderPlayer.removeRecordBackListener();
        
        // Stop recording
        const result = await audioRecorderPlayer.stopRecorder();
        setRecordingPath(result);
        setIsRecording(false);
        setHasAudioMessage(true);
        showToast.success('Audio recorded successfully');
      }
    } catch (error) {
      console.error('Recording error:', error);
      showToast.error('Failed to record audio');
      setIsRecording(false);
      // Cleanup on error
      audioRecorderPlayer.removeRecordBackListener();
    }
  };

  const handlePlayAudio = async () => {
    try {
      if (!recordingPath) {
        showToast.error('No recording available to play');
        return;
      }

      if (!isPlaying) {
        await audioRecorderPlayer.startPlayer(recordingPath);
        setIsPlaying(true);
        
        // Add playback finished listener
        audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.currentPosition === e.duration) {
            setIsPlaying(false);
            audioRecorderPlayer.removePlayBackListener();
          }
        });
      } else {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Playback error:', error);
      showToast.error('Failed to play audio');
      setIsPlaying(false);
      audioRecorderPlayer.removePlayBackListener();
    }
  };

  const handleDiscardAudio = async () => {
    try {
      if (isPlaying) {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
      }
      if (isRecording) {
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
      }
      setRecordingPath(null);
      setHasAudioMessage(false);
      setIsPlaying(false);
      setIsRecording(false);
    } catch (error) {
      console.error('Discard error:', error);
      showToast.error('Failed to discard audio');
    }
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
      // Check location permission before submitting request
      const locationPermission = await checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (!locationPermission) {
        showToast.error('Location permission is required to find nearby workers');
        return;
      }

      // TODO: Implement API call to create request
      showToast.success('Request created successfully');
      // Navigate to confirmation screen
    } catch (error) {
      showToast.error('Failed to create request');
    }
  };

  const handleDropdownOpen = (dropdownName: string, position: number) => {
    // Close other dropdowns
    if (dropdownName !== 'workerType') setWorkerTypeOpen(false);
    if (dropdownName !== 'complexity') setComplexityOpen(false);
    if (dropdownName !== 'duration') setDurationOpen(false);
    if (dropdownName !== 'location') setLocationOpen(false);
    if (dropdownName !== 'taskType') setTaskTypeOpen(false);

    // Scroll to position
    scrollViewRef.current?.scrollTo({
      y: position,
      animated: true,
    });
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'new_request':
        // Already on new request screen
        break;
      case 'history':
        navigation.navigate('CustomerHistory');
        break;
      case 'profile':
        navigation.navigate('CustomerProfile', {
          fullName: customerName,
          phoneNumber: route.params?.phoneNumber,
          address: route.params?.address,
          pincode: route.params?.pincode,
        });
        break;
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

      {/* Main Content Area - Extend to bottom navigation */}
      <StyledView className="flex-1 px-4 pb-16">
        <StyledText className="text-2xl font-merriweather-bold mt-6 mb-4 px-2">
          Create New Request
        </StyledText>

        {/* Form container now fills remaining space */}
        <StyledView className="flex-1 bg-gray-50 rounded-xl">
          <StyledScrollView
            ref={scrollViewRef}
            className="p-4"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: 20}}
          >
            <StyledView className="space-y-4">
              {/* Worker Type */}
              <StyledView style={{zIndex: 50}}>
                <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                  Worker Type
                </StyledText>
                <DropDownPicker
                  open={workerTypeOpen}
                  value={workerType}
                  items={workerTypes}
                  setOpen={setWorkerTypeOpen}
                  setValue={setWorkerType}
                  onOpen={() => handleDropdownOpen('workerType', 0)}
                  searchable
                  placeholder="Select worker type"
                  style={{borderColor: '#D1D5DB', borderRadius: 8}}
                  textStyle={{fontFamily: 'Merriweather-Regular'}}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </StyledView>

              {/* Complexity */}
              <StyledView style={{zIndex: 40}}>
                <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                  Task Complexity
                </StyledText>
                <DropDownPicker
                  open={complexityOpen}
                  value={complexity}
                  items={complexities}
                  setOpen={setComplexityOpen}
                  setValue={setComplexity}
                  onOpen={() => handleDropdownOpen('complexity', 100)}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  placeholder="Select task complexity"
                  style={{borderColor: '#D1D5DB', borderRadius: 8}}
                  textStyle={{fontFamily: 'Merriweather-Regular'}}
                />
              </StyledView>

              {/* Duration */}
              <StyledView style={{zIndex: 30}}>
                <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                  Estimated Time
                </StyledText>
                <DropDownPicker
                  open={durationOpen}
                  value={duration}
                  items={durations}
                  setOpen={setDurationOpen}
                  setValue={setDuration}
                  onOpen={() => handleDropdownOpen('duration', 200)}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  placeholder="Select estimated duration"
                  style={{borderColor: '#D1D5DB', borderRadius: 8}}
                  textStyle={{fontFamily: 'Merriweather-Regular'}}
                />
              </StyledView>

              {/* Location */}
              <StyledView style={{zIndex: 20}}>
                <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                  Location in House
                </StyledText>
                <DropDownPicker
                  open={locationOpen}
                  value={location}
                  items={locations}
                  setOpen={setLocationOpen}
                  setValue={setLocation}
                  onOpen={() => handleDropdownOpen('location', 300)}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  placeholder="Select location"
                  style={{borderColor: '#D1D5DB', borderRadius: 8}}
                  textStyle={{fontFamily: 'Merriweather-Regular'}}
                />
              </StyledView>

              {/* Task Type */}
              <StyledView style={{zIndex: 10}}>
                <StyledText className="text-gray-600 font-merriweather-regular mb-2">
                  Task Type
                </StyledText>
                <DropDownPicker
                  open={taskTypeOpen}
                  value={taskType}
                  items={taskTypes}
                  setOpen={setTaskTypeOpen}
                  setValue={setTaskType}
                  onOpen={() => handleDropdownOpen('taskType', 400)}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
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
          </StyledScrollView>
        </StyledView>
      </StyledView>

      {/* Bottom Navigation Bar - Now overlays on form */}
      <StyledView className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <StyledView className="flex-row py-2">
          <StyledTouchableOpacity 
            className="flex-1 items-center py-2"
            onPress={() => handleNavigation('new_request')}
          >
            <StyledText className="text-sm font-merriweather-medium text-blue-600">
              🔨 New Request
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity 
            className="flex-1 items-center py-2"
            onPress={() => handleNavigation('history')}
          >
            <StyledText className="text-sm font-merriweather-medium text-gray-500">
              📋 History
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity 
            className="flex-1 items-center py-2"
            onPress={() => handleNavigation('profile')}
          >
            <StyledText className="text-sm font-merriweather-medium text-gray-500">
              👤 Profile
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default CustomerHome;