import React, {useState} from 'react';
import {
  View,
  Text as RNText,
  TextInput as RNTextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {styled} from 'nativewind';
import DropDownPicker from 'react-native-dropdown-picker';
import {showToast} from '../../utils/toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
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
    {label: 'Painter', value: 'painter'},
    {label: 'Mason', value: 'mason'},
    {label: 'Welder', value: 'welder'},
    {label: 'AC Technician', value: 'ac_tech'},
    {label: 'TV Repair', value: 'tv_repair'},
    {label: 'Other', value: 'other'},
  ]);
  const [otherProfession, setOtherProfession] = useState('');

  // Add search state and handlers for profession dropdown
  const [professionSearch, setProfessionSearch] = useState('');

  // Add these states after other state declarations
  const [mainAddress, setMainAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');

  // Add this function to handle pincode changes
  const handlePincodeChange = async (text: string) => {
    // Only allow numbers
    const cleaned = text.replace(/[^0-9]/g, '');
    setPincode(cleaned);

    if (cleaned.length === 6) {
      try {
        // TODO: Replace with actual API call
        // For now using dummy data
        const response = {
          district: 'Mumbai',
          state: 'Maharashtra'
        };
        setDistrict(response.district);
        setState(response.state);
      } catch (error) {
        console.error('Error fetching location data:', error);
        showToast.error('Error fetching location data');
      }
    } else {
      setDistrict('');
      setState('');
    }
  };

  // Add validation for numeric fields
  const handleWorkingSinceChange = (text: string) => {
    // Only allow numbers
    const cleaned = text.replace(/[^0-9]/g, '');
    setWorkingSince(cleaned);
  };

  const handleAadhaarChange = (text: string) => {
    // Only allow numbers
    const cleaned = text.replace(/[^0-9]/g, '');
    setAadhaar(cleaned);
  };

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
      pincode.trim().length === 6 &&
      mainAddress.trim() !== '' &&
      district !== '' &&
      state !== '' &&
      profession !== null &&
      (profession !== 'other' || otherProfession.trim() !== '') &&
      workingSince.trim() !== '' &&
      upiId.trim() !== '' &&
      aadhaar.trim().length === 12
    );
  };

  const renderFormFields = () => (
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
          className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </StyledView>

      {/* Address Section */}
      <StyledView className="mb-4">
        <StyledText className="text-lg font-merriweather-bold mb-4">
          Address Details
        </StyledText>

        {/* Pincode Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Pin Code <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
            placeholder="Enter your pin code"
            value={pincode}
            onChangeText={handlePincodeChange}
            keyboardType="numeric"
            maxLength={6}
          />
        </StyledView>

        {/* Main Address Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Main Address <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
            placeholder="House/Flat No., Street Name"
            value={mainAddress}
            onChangeText={setMainAddress}
            multiline
          />
        </StyledView>

        {/* Locality Input */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Locality
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
            placeholder="Area/Locality (Optional)"
            value={locality}
            onChangeText={setLocality}
          />
        </StyledView>

        {/* District Input (Auto-filled) */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            District <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular bg-gray-100"
            value={district}
            editable={false}
            placeholder="Will be auto-filled from pincode"
          />
        </StyledView>

        {/* State Input (Auto-filled) */}
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            State <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular bg-gray-100"
            value={state}
            editable={false}
            placeholder="Will be auto-filled from pincode"
          />
        </StyledView>
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
          searchable={true}
          searchPlaceholder="Search profession..."
          searchTextInputProps={{
            maxLength: 40,
            autoCapitalize: 'none',
          }}
          searchTextInputStyle={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 8,
            paddingHorizontal: 36,
            paddingVertical: 8,
            fontFamily: 'Merriweather-Regular',
            fontSize: 14,
            marginHorizontal: 12,
            marginVertical: 8,
            height: 40,
          }}
          searchContainerStyle={{
            borderBottomColor: '#E5E7EB',
            borderBottomWidth: 1,
            padding: 0,
          }}
          ListEmptyComponent={() => (
            <StyledText className="text-center py-4 text-gray-500 font-merriweather-regular">
              No profession found
            </StyledText>
          )}
          CustomInput={({style, ...props}) => (
            <StyledView className="relative mx-3 my-2">
              <Icon
                name="search"
                size={20}
                color="#9CA3AF"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 10,
                  zIndex: 1,
                }}
              />
              <StyledTextInput
                {...props}
                style={[style, { paddingLeft: 36 }]}
              />
            </StyledView>
          )}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
      </StyledView>

      {/* Other Profession Input */}
      {profession === 'other' && (
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Specify Profession <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
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
          className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
          placeholder="Enter years of experience (e.g., 5)"
          value={workingSince}
          onChangeText={handleWorkingSinceChange}
          keyboardType="numeric"
          maxLength={2} // Max 99 years
        />
      </StyledView>

      {/* Qualifications Input */}
      <StyledView className="mb-4">
        <StyledText className="text-sm font-merriweather-medium mb-1">
          Technical Qualifications
        </StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
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
          className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
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
          className="border border-gray-300 rounded-lg p-3 font-merriweather-regular placeholder:text-gray-900"
          placeholder="Enter Aadhaar Number"
          value={aadhaar}
          onChangeText={handleAadhaarChange}
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
  );

  return (
    <FlatList
      data={[{ key: 'form' }]}
      renderItem={() => renderFormFields()}
      className="flex-1 bg-white"
      keyExtractor={item => item.key}
    />
  );
};

export default WorkerRegistration; 