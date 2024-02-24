import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen, PhoneScreen, RecentScreen } from '../screens';
import tabs from '../assets/tabIcons/TabIcons';

const CustomTabBarButton = ({ children, onPress, focused }) => {

  return (
    <TouchableOpacity
      style={{
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={() => {
        if (focused) {
            onPress('double');
        } else {
            onPress();
        }
      }

      }
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#00b200',
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default function CustomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Recents"
        component={RecentScreen}
        options={{
          title: 'Recents',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={tabs.recents}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#00b200' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#00b200' : '#748c94', fontSize: 12 }}>Recents</Text>
            </View>
          ),
        }}
      />

        <Tab.Screen 
            name="Phone" 
            component={PhoneScreen}
            options={({ navigation, route }) => ({
                tabBarIcon: ({focused}) => (
                <Image 
                    source={tabs.phone}
                    resizeMode='contain'
                    style={{
                    width: 30,
                    height: 30,
                    tintColor: '#fff',
                    }}
                />
                ),
                tabBarButton: (props) => (
                <CustomTabBarButton 
                    {...props}
                    focused={props.accessibilityState.selected}
                    onPress={(action) => {
                    if (action === 'double') {
                        navigation.navigate('Phone', { call: true });
                    } else {
                        navigation.navigate('Phone');
                    }
                    }}
                />
                )
            })}
        />


      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={tabs.account}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#00b200' : '#748c94',
                }}
              />
              <Text style={{ color: focused ? '#00b200' : '#748c94', fontSize: 12 }}>Phone</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
});
