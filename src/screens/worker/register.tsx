import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TextInput as RNTextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styled} from 'nativewind';
import DropDownPicker from 'react-native-dropdown-picker';
import {showToast} from '../../utils/toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<any, 'WorkerRegistration'>;

const WorkerRegistration: React.FC<Props> = ({navigation}) => {
  // Form states
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [workingSince, setWorkingSince] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [upiId, setUpiId] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  // Profession dropdown states
  const [professionOpen, setProfessionOpen] = useState(false);
  const [profession, setProfession] = useState(null);
  const [professions] = useState([
    {label: 'Plumber', value: 'plumber'},
    {label: 'Electrician', value: 'electrician'},
    {label: 'Carpenter', value: 'carpenter'},
    {label: 'Gardener', value: 'gardener'},
    {label: 'Other', value: 'other'},
  ]);
  const [otherProfession, setOtherProfession] = useState('');

  const validateForm = () => {
    if (!fullName.trim()) {
      showToast.error('Please enter your full name');
      return false;
    }
    if (!address.trim()) {
      showToast.error('Please enter your address');
      return false;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      showToast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    if (!profession) {
      showToast.error('Please select your profession');
      return false;
    }
    if (profession === 'other' && !otherProfession.trim()) {
      showToast.error('Please specify your profession');
      return false;
    }
    if (!workingSince.trim()) {
      showToast.error('Please enter your working experience');
      return false;
    }
    if (!upiId.trim()) {
      showToast.error('Please enter your UPI ID');
      return false;
    }
    if (!aadhaar.trim() || aadhaar.length !== 12) {
      showToast.error('Please enter a valid 12-digit Aadhaar number');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // TODO: Implement API call to register worker
      showToast.success('Registration successful');
      navigation.replace('WorkerHome');
    } catch (error) {
      showToast.error('Registration failed');
    }
  };

  const isFormValid = () => {
    return (
      fullName.trim() !== '' &&
      address.trim() !== '' &&
      pincode.trim().length === 6 &&
      profession !== null &&
      (profession !== 'other' || otherProfession.trim() !== '') &&
      workingSince.trim() !== '' &&
      upiId.trim() !== '' &&
      aadhaar.trim().length === 12
    );
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="p-6">
        <StyledText className="text-2xl font-merriweather-bold mb-6">
          Worker Registration
        </StyledText>

        {/* Required fields note */}
        <StyledText className="text-sm text-gray-500 mb-4">
          Fields marked with * are required
        </StyledText>

        {/* Name Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Full Name <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </StyledView>

        {/* Address Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Address <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </StyledView>

        {/* Pincode Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Pin Code <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your pin code"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            maxLength={6}
          />
        </StyledView>

        {/* Profession Dropdown */}
        <StyledView className="mb-4 z-50">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Profession <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <DropDownPicker
            open={professionOpen}
            value={profession}
            items={professions}
            setOpen={setProfessionOpen}
            setValue={setProfession}
            className="border border-gray-300 rounded-lg"
            placeholder="Select your profession"
          />
        </StyledView>

        {/* Other Profession Input */}
        {profession === 'other' && (
          <StyledView className="mb-4">
            <StyledText className="text-sm font-merriweather-medium mb-1">
              Specify Profession <StyledText className="text-red-500">*</StyledText>
            </StyledText>
            <StyledTextInput
              className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
              placeholder="Enter your profession"
              value={otherProfession}
              onChangeText={setOtherProfession}
            />
          </StyledView>
        )}

        {/* Working Since Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Working Since <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="e.g., 2012 - Present"
            value={workingSince}
            onChangeText={setWorkingSince}
          />
        </StyledView>

        {/* Qualifications Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Technical Qualifications
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your qualifications (if any)"
            value={qualifications}
            onChangeText={setQualifications}
            multiline
          />
        </StyledView>

        {/* UPI ID Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            UPI ID <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter UPI ID"
            value={upiId}
            onChangeText={setUpiId}
          />
        </StyledView>

        {/* Aadhaar Input */}
        <StyledView className="mb-6">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Aadhaar Number <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter Aadhaar Number"
            value={aadhaar}
            onChangeText={setAadhaar}
            keyboardType="numeric"
            maxLength={12}
          />
        </StyledView>

        {/* Submit Button */}
        <StyledTouchableOpacity
          className={`rounded-lg p-4 ${
            isFormValid() ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid()}>
          <StyledText className="text-white text-center font-merriweather-bold">
            Register
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledScrollView>
  );
};

export default WorkerRegistration; 