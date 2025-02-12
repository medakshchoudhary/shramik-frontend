import {useEffect, useState, useCallback} from 'react';
import {PermissionsAndroid, Platform, type Permission} from 'react-native';
import {showToast} from '../utils/toast';

const PERMISSIONS_SEQUENCE = [
  {
    type: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    title: 'Microphone Permission',
    message: 'App needs access to your microphone to record audio messages',
  },
  {
    type: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    title: 'Location Permission',
    message: 'App needs access to location to find nearby workers',
  },
  {
    type: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    title: 'Storage Permission',
    message: 'App needs access to storage to save recordings and data',
  }
];

export const checkPermission = async (permissionType: Permission) => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.check(permissionType);
    if (!granted) {
      const result = await PermissionsAndroid.request(
        permissionType,
        {
          title: PERMISSIONS_SEQUENCE.find(p => p.type === permissionType)?.title || 'Permission Required',
          message: PERMISSIONS_SEQUENCE.find(p => p.type === permissionType)?.message || 'This permission is required for app functionality',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } catch (err) {
    console.error('Permission check failed:', err);
    return false;
  }
};

export const usePermissionRequester = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const requestNextPermission = useCallback(async () => {
    if (currentIndex >= PERMISSIONS_SEQUENCE.length || Platform.OS !== 'android') {
      return;
    }

    const permission = PERMISSIONS_SEQUENCE[currentIndex];
    try {
      const granted = await PermissionsAndroid.request(
        permission.type,
        {
          title: permission.title,
          message: permission.message,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`${permission.title} granted`);
      } else {
        showToast.error(`${permission.title} is required for some features`);
      }

      // Move to next permission immediately
      setCurrentIndex(prev => prev + 1);
    } catch (err) {
      console.error('Permission request error:', err);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    // Start requesting permissions immediately
    requestNextPermission();
  }, [currentIndex, requestNextPermission]);
}; 