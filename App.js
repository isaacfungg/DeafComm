import { StyleSheet } from 'react-native';
import { CustomTabNavigator } from './components';
import { GlobalProvider } from './context/GlobalState';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import { ScreenStack } from './stacks'

export default function App() {
  const Stack = createStackNavigator();

  return (
    <GlobalProvider>
      <NavigationContainer> 
        <Stack.Navigator 
            screenOptions={{
              headerShown: false,
            }}>
            {/*----------Main Screens----------*/}
            <Stack.Screen name="Main" component={CustomTabNavigator}/>

            {/*----------Screen Stack----------*/}
            <Stack.Screen name="Screen Stack" component={ScreenStack}/>
          </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
