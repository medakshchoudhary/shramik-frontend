import Toast from 'react-native-toast-message';

export const showToast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
      topOffset: 50,
      props: {
        text1Style: {
          fontSize: 24,
          fontFamily: 'Merriweather-Bold',
          paddingVertical: 8,
        },
        text2Style: {
          fontSize: 18,
          fontFamily: 'Merriweather-Regular',
          paddingBottom: 8,
        },
        contentContainerStyle: {
          padding: 16,
          width: '95%',
          minHeight: 120,
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
      topOffset: 50,
      props: {
        text1Style: {
          fontSize: 24,
          fontFamily: 'Merriweather-Bold',
          paddingVertical: 8,
        },
        text2Style: {
          fontSize: 18,
          fontFamily: 'Merriweather-Regular',
          paddingBottom: 8,
        },
        contentContainerStyle: {
          padding: 16,
          width: '95%',
          minHeight: 120,
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
      topOffset: 50,
      props: {
        text1Style: {
          fontSize: 24,
          fontFamily: 'Merriweather-Bold',
          paddingVertical: 8,
        },
        text2Style: {
          fontSize: 18,
          fontFamily: 'Merriweather-Regular',
          paddingBottom: 8,
        },
        contentContainerStyle: {
          padding: 16,
          width: '95%',
          minHeight: 120,
        },
      },
    });
  },
};
