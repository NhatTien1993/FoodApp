/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['RCTBridge required dispatch_sync to load REAModule'])

// import TestLifeCycle from './TestLifeCycle';


AppRegistry.registerComponent(appName, () => App);
