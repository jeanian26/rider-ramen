/**
 *
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';

import {YellowBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {LogBox} from 'react-native';

enableScreens();

// TODO: Remove when fixed
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigatorB from './app/navigation/MainNavigator';

// APP
function App() {
  return (
    <SafeAreaProvider>
      <MainNavigatorB />
    </SafeAreaProvider>
  );
}

export default App;
