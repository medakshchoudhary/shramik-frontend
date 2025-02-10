import {PermissionsAndroid, Platform} from 'react-native';

export const PERMISSIONS = {
  microphone: {
    title: 'Microphone Permission',
    message: 'App needs access to your microphone to record audio messages',
    permission: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  },
  // Add other permissions here as needed
};

export const requestPermissions = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    const microphoneGranted = await PermissionsAndroid.request(
      PERMISSIONS.microphone.permission,
      {
        title: PERMISSIONS.microphone.title,
        message: PERMISSIONS.microphone.message,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return {
      microphone: microphoneGranted === PermissionsAndroid.RESULTS.GRANTED,
    };
  } catch (err) {
    console.warn('Error requesting permissions:', err);
    return {
      microphone: false,
    };
  }
}; 