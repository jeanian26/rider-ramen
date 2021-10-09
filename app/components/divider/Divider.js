/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, View} from 'react-native';

// Divider Styles
const styles = StyleSheet.create({
  container: {
    height: 1,
    
  },
  mh16: {
    marginHorizontal: 16,
  },
});

// Divider Props
type Props = {
  marginLeft: number,
  type: 'full-bleed' | 'inset' | 'middle'
};

// Divider
const Divider = ({marginLeft, type, color}: Props) => (
  <View
    style={[
      styles.container,
      type === 'inset' && {marginLeft},
      type === 'middle' && styles.mh16,
      {backgroundColor: color? color:'#eeeeee',}
    ]}
  />
);

export default Divider;
