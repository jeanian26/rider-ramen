/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView as SafeView} from 'react-native-safe-area-context';

// import colors
import Colors from '../theme/colors';

// SafeAreaView Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});

// SafeAreaView Props
type Prpos = {
  children: React.ReactNode,
  style: ViewStyle,
};

// SafeAreaView
const SafeAreaView = ({children, style, ...rest}: Prpos) => {
  return (
    <SafeView
      style={[
        styles.safeArea,
        // {backgroundColor: Colors.background},
        style,
      ]}
      {...rest}>
      {children}
    </SafeView>
  );
};

// export SafeAreaView
export default SafeAreaView;
