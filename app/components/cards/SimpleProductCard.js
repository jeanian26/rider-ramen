/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import { Subtitle1, Subtitle2 } from '../text/CustomText';
import Icon from '../../components/icon/Icon';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// SimpleProductCard Config
const IOS = Platform.OS === 'ios';
const ITEM_WIDTH = Layout.SCREEN_WIDTH;
const imgHolder = require('../../assets/img/imgholder.png');
const RATING_ICON = IOS ? 'ios-star' : 'md-star';

// SimpleProductCard Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: ITEM_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  imageContainer: {
    marginRight: 20,
  },
  image: {
    width: 98,
    height: 82,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginRight: 10,
    fontWeight: '700',
    color: Colors.primaryText,
    textAlign: 'left',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  secondLine: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  descriptionText: {
    flex: 1,
    lineHeight: 20,
    color: Colors.secondaryText,
    textAlign: 'left',
  },
  descriptionText2: {
    flex: 1,
    lineHeight: 20,
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  priceText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  starContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
  },
  starText: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 4,
    color: Colors.white,
  },
});

// SimpleProductCard State
type State = {};

// SimpleProductCard Props
type Props = {
  onPress: () => {},
  activeOpacity: number,
  imageUri: string,
  title: string,
  price: number,
  description: string,
  stock: number
};

// SimpleProductCard
export default class SimpleProductCard extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      activeOpacity,
      onPress,
      imageUri,
      title,
      price = 0,
      rating = 4.5,
      description,
      stock = 0,
    } = this.props;

    let lowStockRender;

    if (stock == 0) {
      lowStockRender = (<View style={styles.secondLine}>
        <Subtitle2 numberOfLines={1} style={styles.descriptionText2}>
          NO STOCK!
        </Subtitle2>
      </View>);
    } else {
      if (stock <= 10) {
        lowStockRender = (<View style={styles.secondLine}>
          <Subtitle2 numberOfLines={1} style={styles.descriptionText2}>
            LOW STOCK!
          </Subtitle2>
        </View>);
      }
    }




    return (
      <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              defaultSource={imgHolder}
              source={getImgSource(imageUri)}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.firstLine}>
              <Subtitle1 numberOfLines={1} style={styles.title}>
                {title}
              </Subtitle1>
              <Text style={styles.priceText}>{`₱ ${price.toFixed(2)}`}</Text>
            </View>
            <View style={styles.secondLine}>
              <Subtitle2 numberOfLines={1} style={styles.descriptionText}>
                {description}
              </Subtitle2>
            </View>
            {lowStockRender}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
