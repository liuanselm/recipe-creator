import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Home from './Home'
import Profile from './Profile'
import Add from './Add'

const Tab = createBottomTabNavigator();

export default function Tabs({ session }: { session: Session }){
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            else if (route.name === 'Add Recipe') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name="Add Recipe" children={()=><Add session={session}/>} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" children={()=><Profile session={session} />} options={{headerShown: false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}