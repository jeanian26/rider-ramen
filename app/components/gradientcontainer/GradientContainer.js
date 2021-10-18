/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// import colors
import Colors from '../../theme/colors';

// GradientContainer Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flex: 1,
    // backgroundColor: Colors.primaryGradientColor,
  },
});

// GradientContainer Props
type Props = {
  colors: Array,
  start: {x: number, y: number}, // number in range [0, 1]
  end: {x: number, y: number}, // number in range [0, 1]
  children: any,
  containerStyle: ViewStyle,
};

// GradientContainer
const GradientContainer = ({
  colors,
  start,
  end,
  containerStyle,
  children,
}: Props) => (
  <LinearGradient
    start={start || {x: 0, y: 0}}
    end={end || {x: 0, y: 1}}
    colors={
      colors || [Colors.primaryGradientColor, Colors.secondaryGradientColor]
    }
    style={[styles.container, containerStyle]}>
    {children}
  </LinearGradient>
  // <View style={[styles.container, containerStyle]}>{children}</View>
);

export default GradientContainer;
