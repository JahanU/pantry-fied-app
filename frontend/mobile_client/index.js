/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';

// List of classes will go down here:
// import App from "./App";
import App from './src/App';

// YellowBox.ignoreWarnings(['Remote debugger']);
console.disableYellowBox = true;
// import Login from './src/components/Login';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => Login);
