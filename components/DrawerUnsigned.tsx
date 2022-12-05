import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import Add from './Add'
import Auth from './Auth'

export default function MyDrawer({ session }: { session: Session }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Sign in" children={()=><Auth/>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}