import React, {useState} from 'react';
import {View, Text as RNText, TouchableOpacity, ScrollView} from 'react-native';
import {styled} from 'nativewind';
import DropDownPicker from 'react-native-dropdown-picker';
import {showToast} from '../../utils/toast';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledScrollView = styled(ScrollView);

type CustomerHomeProps = {
  navigation: any;
  route: any;
};

function CustomerHome({navigation}: CustomerHomeProps): React.JSX.Element {
  const [workerType, setWorkerType] = useState(null);
  const [workerTypeOpen, setWorkerTypeOpen] = useState(false);
  const [workerTypes] = useState([
    {label: 'Plumber', value: 'plumber'},
    {label: 'Electrician', value: 'electrician'},
    {label: 'Carpenter', value: 'carpenter'},
    {label: 'Gardener', value: 'gardener'},
  ]);

  const [complexity, setComplexity] = useState(null);
  const [complexityOpen, setComplexityOpen] = useState(false);
  const [complexities] = useState([
    {label: 'Basic Task', value: 'simple'},
    {label: 'Standard Task', value: 'moderate'},
    {label: 'Advanced Task', value: 'complex'},
  ]);

  const handleSubmit = () => {
    if (!workerType || !complexity) {
      showToast.error('Please fill all required fields');
      return;
    }

    // TODO: Implement job request submission
    showToast.success('Request submitted successfully');
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="p-6">
        {/* Profile Section */}
        <StyledView className="flex-row items-center mb-8">
          <StyledView className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center">
            <StyledText className="text-xl text-white font-merriweather-bold">
              J
            </StyledText>
          </StyledView>
          <StyledText className="ml-4 text-xl font-merriweather-medium">
            Hello, John
          </StyledText>
        </StyledView>

        {/* Request Form */}
        <StyledText className="text-2xl font-merriweather-bold mb-6">
          Create New Request
        </StyledText>

        <StyledView className="space-y-4">
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
              searchable={true}
              placeholder="Select worker type"
            />
          </StyledView>

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
            />
          </StyledView>

          {/* Submit Button */}
          <TouchableOpacity
            className={`w-full rounded-lg py-4 items-center mt-8 ${
              workerType && complexity ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onPress={handleSubmit}
            disabled={!workerType || !complexity}
          >
            <StyledText
              className={`text-xl font-merriweather-medium ${
                workerType && complexity ? 'text-white' : 'text-gray-600'
              }`}
            >
              Submit Request
            </StyledText>
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
}

export default CustomerHome; 