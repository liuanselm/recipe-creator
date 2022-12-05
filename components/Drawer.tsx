import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import Add from './Add'
import Recipes from './Recipes'
import Settings from './Settings'

export default function MyDrawer({ session }: { session: Session }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Add" children={()=><Add session={session}/>} />
        <Drawer.Screen name="My Recipes" children={()=><Recipes session={session}/>} />
        <Drawer.Screen name="Settings" children={()=><Settings session={session}/>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}