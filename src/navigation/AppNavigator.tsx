import WorkerHistory from '../screens/worker/history';
// ... other imports

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* ... other screens */}
      <Stack.Screen 
        name="WorkerHistory" 
        component={WorkerHistory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator; 