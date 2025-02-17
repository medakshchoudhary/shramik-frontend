import React, {useState, useEffect} from 'react';
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
import {getPincodeDetails, isValidPincode} from '../../data/pincodes';

const StyledView = styled(View);
const StyledText = styled(RNText);
const StyledTextInput = styled(RNTextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = NativeStackScreenProps<any, 'WorkerRegistration'>;

const WorkerRegistration: React.FC<Props> = ({navigation}) => {
  // Form states
  const [fullName, setFullName] = useState('');
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

  // Add these states after other state declarations
  const [mainAddress, setMainAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');

  // Add state for district dropdown
  const [districtOpen, setDistrictOpen] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState<{label: string; value: string}[]>([]);

  useEffect(() => {
    // Log available pincodes on mount
    console.log('Available pincode data:', getPincodeDetails(pincode));
  }, []);

  useEffect(() => {
    const debugPincodeSystem = () => {
      console.log('Debugging Pincode System:');
      try {
        // Test with a valid pincode
        const testPincode = "400001";
        console.log(`Testing pincode: ${testPincode}`);
        const result = getPincodeDetails(testPincode);
        console.log('Result:', result);
      } catch (error) {
        console.error('Debug Error:', error);
      }
    };

    debugPincodeSystem();
  }, []);

  const handlePincodeChange = async (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPincode(cleaned);

    // Clear fields when pincode is being edited
    if (cleaned.length !== 6) {
      setState('');
      setDistrict('');
      setLocality('');
      setAvailableDistricts([]);
      return;
    }

    // Validate pincode format
    if (!isValidPincode(cleaned)) {
      showToast.error('Invalid pincode format');
      return;
    }

    // Get pincode details
    const data = getPincodeDetails(cleaned);

    if (data) {
      setState(data.statename);
      
      // Map districts to dropdown format
      const districtOptions = data.districts.map(d => ({
        label: d.name,
        value: d.name,
        areas: d.areas
      }));

      setAvailableDistricts(districtOptions);
      
      // If only one district, select it automatically
      if (districtOptions.length === 1) {
        setDistrict(districtOptions[0].value);
        
        // If district has areas, show first one as suggestion
        if (districtOptions[0].areas.length > 0) {
          setLocality(districtOptions[0].areas[0]);
        }
      }
    } else {
      showToast.error('Pincode not found in our database');
      setState('');
      setDistrict('');
      setLocality('');
      setAvailableDistricts([]);
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
    if (!mainAddress.trim()) {
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
          className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
          placeholder="Enter your full name"
          placeholderTextColor="#6B7280"
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
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
            placeholder="Enter your pin code"
            placeholderTextColor="#6B7280"
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
            placeholderTextColor="#6B7280"
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
            placeholderTextColor="#6B7280"
            value={locality}
            onChangeText={setLocality}
            />
        </StyledView>

        {/* District Input (Auto-filled) */}
        <StyledView className="mb-4 z-40">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            District <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          {availableDistricts.length > 1 ? (
            <DropDownPicker
            open={districtOpen}
            value={district}
            items={availableDistricts}
            setOpen={setDistrictOpen}
            setValue={setDistrict}
            placeholder="Select district"
            style={{
              borderColor: '#D1D5DB',
              minHeight: 48,
              borderWidth: 1,
              borderRadius: 8
            }}
            placeholderStyle={{
              color: '#6B7280',
              fontFamily: 'Merriweather-Regular'
            }}
            textStyle={{
              color: '#111827',
              fontFamily: 'Merriweather-Regular'
            }}
            listMode="MODAL"
            modalProps={{
              animationType: "fade"
            }}
            modalTitle="Select District"
            />
          ) : (
            <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular bg-gray-100"
              value={district}
              editable={false}
              placeholder="Will be auto-filled from pincode"
              placeholderTextColor="#6B7280"
              />
            )}
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
            placeholderTextColor="#6B7280"
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
          style={{
            borderColor: '#D1D5DB',
            minHeight: 48,
            borderWidth: 1,
            borderRadius: 8
          }}
          placeholder="Select your profession"
          placeholderStyle={{
            color: '#6B7280',
            fontFamily: 'Merriweather-Regular'
          }}
          textStyle={{
            color: '#111827',
            fontFamily: 'Merriweather-Regular'
          }}
          searchable={true}
          searchPlaceholder="Search profession..."
          listMode="MODAL"
          modalProps={{
            animationType: "fade"
          }}
          modalTitle="Select Profession"
        />
      </StyledView>

      {/* Other Profession Input */}
      {profession === 'other' && (
        <StyledView className="mb-4">
          <StyledText className="text-sm font-merriweather-medium mb-1">
            Specify Profession <StyledText className="text-red-500">*</StyledText>
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-3 font-merriweather-regular mt-2"
            placeholder="Specify your profession"
            placeholderTextColor="#6B7280"
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
          placeholder="Enter years of experience"
          placeholderTextColor="#6B7280"
          value={workingSince}
          onChangeText={handleWorkingSinceChange}
          keyboardType="numeric"
        />
      </StyledView>

      {/* Qualifications Input */}
      <StyledView className="mb-4">
        <StyledText className="text-sm font-merriweather-medium mb-1">
          Technical Qualifications
        </StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-3 font-merriweather-regular"
          placeholder="Enter your qualifications"
          placeholderTextColor="#6B7280"
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
          placeholder="Enter your UPI ID"
          placeholderTextColor="#6B7280"
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
          placeholder="Enter 12-digit Aadhaar number"
          placeholderTextColor="#6B7280"
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
      style={{ flex: 1, backgroundColor: 'white' }}
      keyExtractor={item => item.key}
    />
  );
};

export default WorkerRegistration; 