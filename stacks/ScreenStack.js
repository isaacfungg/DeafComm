import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, CreateAccountScreen, CallScreen } from '../screens';

export default function ScreenStack() {
  const Stack = createStackNavigator();

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Log In */}
        <Stack.Screen 
          name="Log In" 
          component={LoginScreen}
          options={({ navigation }) => ({
            title:"Log In",
            headerShown: true,
            headerTitleStyle: {
              fontFamily: 'Helvetica Neue',
              fontWeight: '900',
              fontSize: 18,
            },
            headerStyle: {
              height: 100,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
              <Image
                source={require('../assets/header/back.png')}
                style={{ width: 30, height: 30 }}
              />
              </TouchableOpacity>
            ),
          })}
        />

        {/* Create Account */}
        <Stack.Screen 
          name="Create Account" 
          component={CreateAccountScreen}
          options={({ navigation }) => ({
            title:"Create Account",
            headerShown: true,
            headerTitleStyle: {
              fontFamily: 'Helvetica Neue',
              fontWeight: '900',
            },
            headerStyle: {
              height: 100,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
              <Image
                source={require('../assets/header/back.png')}
                style={{ width: 30, height: 30 }}
              />
              </TouchableOpacity>
            ),
          })}
        />

      <Stack.Screen 
          name="Call Screen" 
          component={CallScreen}
          options={({ navigation }) => ({
            title:"Call Screen",
            headerShown: false,
            headerTitleStyle: {
              fontFamily: 'Helvetica Neue',
              fontWeight: '900',
            },
            headerStyle: {
              height: 100,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
              <Image
                source={require('../assets/header/back.png')}
                style={{ width: 30, height: 30 }}
              />
              </TouchableOpacity>
            ),
          })}
        />



      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  cartCountContainer: {
    position: 'absolute',
    right: 18,
    top: 0,
    backgroundColor: '#eb0000',
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  shopIcon: {
    paddingRight: 21,
  }
});
