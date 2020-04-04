import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainNavigator from './MainNavigator';
import LoginNavigator from './LoginNavigator';


export default createAppContainer(
  createSwitchNavigator({
    Login: LoginNavigator,
    Main: MainNavigator,
  }),
);
