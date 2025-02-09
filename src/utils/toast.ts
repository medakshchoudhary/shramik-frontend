import Toast from 'react-native-toast-message';

export const showToast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
      topOffset: 60,
      props: {
        text1Style: {
          fontSize: 32,
          fontFamily: 'Merriweather-Bold',
          paddingVertical: 8,
        },
        text2Style: {
          fontSize: 20,
          fontFamily: 'Merriweather-Regular',
          paddingBottom: 8,
        },
        contentContainerStyle: {
          padding: 16,
        },
      },
    });
  },
  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
      topOffset: 60,
      props: {
        text1Style: {
          fontSize: 32,
          fontFamily: 'Merriweather-Bold',
          paddingVertical: 8,
        },
        text2Style: {
          fontSize: 20,
          fontFamily: 'Merriweather-Regular',
          paddingBottom: 8,
        },
        contentContainerStyle: {
          padding: 16,
        },
      },
    });
  },
  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
      topOffset: 60,
      props: {
        text1Style: {
          fontSize: 32,
          fontFamily: 'Merriweather-Bold',
          paddingVertical: 8,
        },
        text2Style: {
          fontSize: 20,
          fontFamily: 'Merriweather-Regular',
          paddingBottom: 8,
        },
        contentContainerStyle: {
          padding: 16,
        },
      },
    });
  },
};
