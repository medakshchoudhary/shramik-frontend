import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/authentication/Login';

// Configure Text component to use custom font by default
Text.defaultProps = {
  ...Text.defaultProps,
  style: {fontFamily: 'Poppins-Regular'},
};

// Create stack navigator
const Stack = createNativeStackNavigator();

// Example Home screen component
function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Welcome to Shramik</Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
          },
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Shramik',
            headerShown: true
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Poppins-Bold',
  },
});

export default App;
