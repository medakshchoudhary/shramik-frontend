import pincodeData from './pincode-data.json';

interface PincodeData {
  circlename: string;
  regionname: string;
  divisionname: string;
  officename: string;
  pincode: number;
  officetype: string;
  delivery: string;
  district: string;
  statename: string;
  latitude: string;
  longitude: string;
}

interface PincodeResponse {
  statename: string;
  districts: Array<{
    name: string;
    areas: string[];
  }>;
}

// Access the pincodes array from the JSON structure
const pincodeRecords: PincodeData[] = pincodeData.pincodes;

export const getPincodeDetails = (pincode: string): PincodeResponse | null => {
  try {
    // Find the matching pincode (convert input string to number for comparison)
    const match = pincodeRecords.find(data => data.pincode === parseInt(pincode, 10));
    
    if (!match) {
      console.log(`No match found for pincode: ${pincode}`);
      return null;
    }

    // Return formatted response
    return {
      statename: match.statename,
      districts: [{
        name: match.district,
        areas: [match.officename] // Using officename as area since that's what we have
      }]
    };
  } catch (error) {
    console.error('Error in getPincodeDetails:', error);
    return null;
  }
};

// Helper function to get all available pincodes (useful for debugging)
export const getAllPincodes = (): string[] => {
  return pincodeRecords.map(data => data.pincode.toString());
};

// Helper function to validate pincode format
export const isValidPincode = (pincode: string): boolean => {
  return /^[1-9][0-9]{5}$/.test(pincode);
}; 