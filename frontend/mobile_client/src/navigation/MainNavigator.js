import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import SearchStack from './RecipeNavigation';
import FavouritesScreen from '../screens/FavouritesScreen';
import SettingsStack from './SettingsNavigation';

// stack is like one screen loading on top of another one
const FavouritesStack = createStackNavigator(
  {
    Favourites: FavouritesScreen,
  },
  {
    headerMode: 'none',
  },
);

FavouritesStack.navigationOptions = {
  tabBarLabel: 'Favourites',
};

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
};

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
};

// tab navigator is like buttons at the bottom side scrolling through screens
export default createBottomTabNavigator({
  FavouritesStack,
  SearchStack,
  SettingsStack,
});
