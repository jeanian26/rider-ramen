/**
 * ramennado - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {Image, StyleSheet, ViewStyle} from 'react-native';

// Logo Config
const LOGO = require('../../assets/img/logo-ramen-nado.png');
const LOGO_TEXT_WIDE = require('../../assets/img/logo_text_wide.png');

// Logo Styles
const styles = StyleSheet.create({
  smallImg: {
    width: 40,
    height: 40,
  },
  mediumImg: {
    width: 56,
    height: 56,
  },
  largeImg: {
    width: 72,
    height: 72,
  },
  textWideImg: {
    width: 144,
  },
});

// Logo Props
type Props = {
  logoStyle: ViewStyle,
  size: 'small' | 'medium' | 'large' | number,
  tintColor: string,
  type: 'text-wide',
};

const logoSource = (type) => {
  if (type === 'text-wide') {
    return LOGO_TEXT_WIDE;
  }
  return LOGO;
};

// Logo
const Logo = ({logoStyle, size, tintColor, type}: Props) => (
  <Image
    source={logoSource(type)}
    style={[
      styles.smallImg,
      size === 'medium' && styles.mediumImg,
      size === 'large' && styles.largeImg,
      type === 'text-wide' && styles.textWideImg,
      typeof size === 'number' && {width: size, height: size},
      {tintColor},
      logoStyle && logoStyle,
    ]}
    tintColor={tintColor}
    resizeMode="contain"
  />
);

export default Logo;
