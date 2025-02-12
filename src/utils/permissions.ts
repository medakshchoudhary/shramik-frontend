import {PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PERMISSIONS = {
  microphone: {
    type: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    title: 'Microphone Permission',
    message: 'App needs access to your microphone to record audio messages',
  },
  storage: {
    read: {
      type: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      title: 'Storage Read Permission',
      message: 'App needs access to read from storage to play audio recordings',
    },
    write: {
      type: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      title: 'Storage Write Permission',
      message: 'App needs access to write to storage to save audio recordings',
    },
  },
  location: {
    type: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    title: 'Location Permission',
    message: 'App needs access to location to find nearby services',
  },
};

const PERMISSIONS_STORAGE_KEY = '@permissions_status';

type PermissionStatus = {
  microphone: boolean;
  storageRead: boolean;
  storageWrite: boolean;
  location: boolean;
};

export const checkAndRequestPermissions = async (forceRequest = false): Promise<PermissionStatus> => {
  if (Platform.OS !== 'android') {
    return {
      microphone: true,
      storageRead: true,
      storageWrite: true,
      location: true,
    };
  }

  try {
    // Get stored permissions status
    const storedPermissions = await AsyncStorage.getItem(PERMISSIONS_STORAGE_KEY);
    const currentPermissions: PermissionStatus = storedPermissions 
      ? JSON.parse(storedPermissions)
      : {
          microphone: false,
          storageRead: false,
          storageWrite: false,
          location: false,
        };

    // Check if we need to request permissions
    if (!forceRequest) {
      const hasAllPermissions = Object.values(currentPermissions).every(status => status);
      if (hasAllPermissions) {
        return currentPermissions;
      }
    }

    // Request each permission if not granted
    const results = await Promise.all([
      // Microphone
      !currentPermissions.microphone && PermissionsAndroid.request(
        PERMISSIONS.microphone.type,
        {
          title: PERMISSIONS.microphone.title,
          message: PERMISSIONS.microphone.message,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ),
      // Storage Read
      !currentPermissions.storageRead && PermissionsAndroid.request(
        PERMISSIONS.storage.read.type,
        {
          title: PERMISSIONS.storage.read.title,
          message: PERMISSIONS.storage.read.message,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ),
      // Storage Write
      !currentPermissions.storageWrite && PermissionsAndroid.request(
        PERMISSIONS.storage.write.type,
        {
          title: PERMISSIONS.storage.write.title,
          message: PERMISSIONS.storage.write.message,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ),
      // Location
      !currentPermissions.location && PermissionsAndroid.request(
        PERMISSIONS.location.type,
        {
          title: PERMISSIONS.location.title,
          message: PERMISSIONS.location.message,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ),
    ]);

    // Update permission status
    const newPermissions: PermissionStatus = {
      microphone: results[0] === PermissionsAndroid.RESULTS.GRANTED || currentPermissions.microphone,
      storageRead: results[1] === PermissionsAndroid.RESULTS.GRANTED || currentPermissions.storageRead,
      storageWrite: results[2] === PermissionsAndroid.RESULTS.GRANTED || currentPermissions.storageWrite,
      location: results[3] === PermissionsAndroid.RESULTS.GRANTED || currentPermissions.location,
    };

    // Store updated permissions
    await AsyncStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(newPermissions));

    return newPermissions;
  } catch (error) {
    console.error('Error handling permissions:', error);
    return {
      microphone: false,
      storageRead: false,
      storageWrite: false,
      location: false,
    };
  }
};

export const getMissingPermissions = async (): Promise<string[]> => {
  const permissions = await checkAndRequestPermissions(false);
  const missing: string[] = [];

  if (!permissions.microphone) missing.push('Microphone');
  if (!permissions.storageRead) missing.push('Storage Read');
  if (!permissions.storageWrite) missing.push('Storage Write');
  if (!permissions.location) missing.push('Location');

  return missing;
}; 