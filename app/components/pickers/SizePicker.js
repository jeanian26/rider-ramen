/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';

// import components
import TouchableItem from '../TouchableItem';

// import colors
import Colors from '../../theme/colors';

// SizePicker Config
const PICKED_BACKGROUND_COLOR = Colors.primaryColor;
const PICKED_TEXT_COLOR = Colors.primaryColorDark;

// SizePicker Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    marginRight: 8,
    height: 32,
    borderRadius: 4,
    backgroundColor: 'rgba(35, 47, 52, 0.08)',
    overflow: 'hidden',
  },
  picker: {flex: 1, justifyContent: 'center'},
  title: {
    top: -1,
    color: 'rgb(35, 47, 52)',
    paddingHorizontal: 12,
  },
});

// SizePicker Props
type Props = {
  activeOpacity: number,
  color: string,
  onPress: () => void,
  picked: boolean,
  title: string,
  titleStyle: TextStyle,
};

// SizePicker
const SizePicker = ({
  activeOpacity,
  color,
  onPress,
  picked,
  title,
  titleStyle,
}: Props) => (
  <View
    style={[
      styles.container,
      color && {backgroundColor: color},
      picked && {backgroundColor: PICKED_BACKGROUND_COLOR},
    ]}>
    <TouchableItem
      onPress={onPress}
      activeOpacity={activeOpacity || 0.85}
      style={styles.picker}>
      <View style={styles.picker}>
        <Text
          style={[
            styles.title,
            titleStyle,
            picked && {color: PICKED_TEXT_COLOR},
          ]}>
          {title !== undefined ? title : 'Size'}
        </Text>
      </View>
    </TouchableItem>
  </View>
);

export default SizePicker;
