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
    // Find all matches for the pincode
    const matches = pincodeRecords.filter(data => data.pincode === parseInt(pincode, 10));
    
    if (matches.length === 0) {
      console.log(`No match found for pincode: ${pincode}`);
      return null;
    }

    // Group areas by district
    const districtMap = matches.reduce((acc, curr) => {
      if (!acc[curr.district]) {
        acc[curr.district] = {
          name: curr.district,
          areas: []
        };
      }
      // Remove "SO" suffix and trim whitespace
      const cleanedOfficeName = curr.officename.replace(/\s+SO$/, '').trim();
      acc[curr.district].areas.push(cleanedOfficeName);
      return acc;
    }, {} as Record<string, { name: string; areas: string[] }>);

    return {
      statename: matches[0].statename,
      districts: Object.values(districtMap)
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