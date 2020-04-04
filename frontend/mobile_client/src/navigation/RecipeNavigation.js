import {
  createStackNavigator,
} from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import RecipeScreen from '../screens/RecipeScreen'; // shows nutrition and option to view instructions
import InstructionsScreen from '../screens/InstructionsScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

export default createStackNavigator(
  {
    SearchScreen,
    SearchResultsScreen,
    RecipeScreen,
    InstructionsScreen,
  },
  {
    headerMode: 'none',
  },
);
