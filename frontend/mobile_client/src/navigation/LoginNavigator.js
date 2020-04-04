import {
  createStackNavigator,
} from 'react-navigation';

import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

export default createStackNavigator(
  {
    LoginPage,
    RegisterPage,
  },
  {
    headerMode: 'none',
  },
);
