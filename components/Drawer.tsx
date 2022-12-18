import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import Add from './Add'
import Recipes from './Recipes'
import Settings from './Settings'
import RecipesList from './RecipesList'
import Shopping from './Shopping'
import Home from './Home'
import Friends from './Friends';

export default function MyDrawer({ session }: { session: Session }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" children={()=><Home session={session}/>} />
        <Drawer.Screen name="Add" children={()=><Add session={session}/>} />
        <Drawer.Screen name="My Recipes" children={()=><RecipesList session={session}/>} />
        <Drawer.Screen name="Shopping List" children={()=><Shopping session={session}/>} />
        <Drawer.Screen name="Friends" children={()=><Friends session={session}/>} />
        <Drawer.Screen name="Settings" children={()=><Settings session={session}/>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}