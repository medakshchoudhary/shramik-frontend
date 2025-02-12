import React from 'react';
import {StatusBar, Text as RNText, TextInput as RNTextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/authentication/Login';
import {typography} from './src/theme/typography';
import {styled} from 'nativewind';
import OTPVerification from './src/screens/authentication/OTPVerification';
import RoleSelection from './src/screens/RoleSelection';
import CustomerRegistration from './src/screens/customer/register';
import CustomerHome from './src/screens/customer/home';
import CustomerHistory from './src/screens/customer/history';
import CustomerProfile from './src/screens/customer/profile';
import {usePermissionRequester} from './src/components/PermissionRequester';
import WorkerRegistration from './src/screens/worker/register';
import WorkerHome from './src/screens/worker/home';
import WorkerProfile from './src/screens/worker/profile';
import TaskDetails from './src/screens/worker/TaskDetails';

// Create custom components with default styling
export const Text = (props: any) => (
  <RNText {...props} style={[typography.default, props.style]} />
);

export const TextInput = (props: any) => (
  <RNTextInput {...props} style={[typography.default, props.style]} />
);

// Create stack navigator
const Stack = createNativeStackNavigator();

// Wrap View with StyledComponent
const StyledView = styled(View);
const StyledText = styled(RNText);

// Example Home screen component
function HomeScreen(): React.JSX.Element {
  return (
    <StyledView className="flex-1 items-center justify-center bg-white p-5">
      <StyledText className="text-2xl font-merriweather-bold text-black">
        Welcome to Shramik
      </StyledText>
    </StyledView>
  );
}

function App(): React.JSX.Element {
  usePermissionRequester();

  console.log('App rendering');

  return (
    <NavigationContainer
      onStateChange={(state) => console.log('Navigation state:', state)}
    >
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerTitleStyle: typography.medium,
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          listeners={{
            focus: () => console.log('Splash screen focused'),
            blur: () => console.log('Splash screen blurred'),
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          listeners={{
            focus: () => console.log('Login screen focused'),
            blur: () => console.log('Login screen blurred'),
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Shramik',
            headerShown: true,
          }}
          listeners={{
            focus: () => console.log('Home screen focused'),
            blur: () => console.log('Home screen blurred'),
          }}
        />
        <Stack.Screen 
          name="OTPVerification" 
          component={OTPVerification}
          listeners={{
            focus: () => console.log('OTP screen focused'),
            blur: () => console.log('OTP screen blurred'),
          }}
        />
        <Stack.Screen 
          name="RoleSelection" 
          component={RoleSelection}
          listeners={{
            focus: () => console.log('Role selection screen focused'),
            blur: () => console.log('Role selection screen blurred'),
          }}
        />
        <Stack.Screen name="CustomerRegistration" component={CustomerRegistration} />
        <Stack.Screen 
          name="CustomerHome" 
          component={CustomerHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="CustomerHistory" 
          component={CustomerHistory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="CustomerProfile" 
          component={CustomerProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="WorkerRegistration" component={WorkerRegistration} />
        <Stack.Screen name="WorkerHome" component={WorkerHome} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
      <Toast onShow={() => console.log('Toast shown')} />
    </NavigationContainer>
  );
}

console.log('App component loaded');

export default App;
