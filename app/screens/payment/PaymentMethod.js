/**
 * ramennado - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  I18nManager,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

// import components
import BottomSheet from '../../components/bottomsheet/BottomSheet';
import Button from '../../components/buttons/Button';
import CreditCard from '../../components/creditcard/CreditCard';
import Icon from '../../components/icon/Icon';
import {Caption, Subtitle1} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

// PaymentMethod Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MORE_ICON = IOS ? 'ios-settings' : 'md-settings';
const EDIT_ICON = IOS ? 'ios-create' : 'md-create';
const SAVE_ICON = IOS ? 'ios-save' : 'md-save';
const REMOVE_ICON = IOS ? 'ios-remove-circle' : 'md-remove-circle';
const BOTTOM_SHEET_PB = IOS ? 16 : 0;

// PaymentMethod Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  swiperContainer: {
    height: 236, // cardContainer.height + dot.height
  },
  dot: {
    backgroundColor: Colors.primaryColor,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primaryColor,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationStyle: {
    bottom: 0,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  cardContainer: {
    width: '100%',
    height: 228,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 32,
    right: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  buttonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  bottomSheetItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    height: 64,
  },
  bottomSheetCaption: {paddingVertical: 2},
  bottomSheetAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 56,
  },
  bottomSheetIconContainer: {
    marginRight: IOS ? 24 : 32,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// PaymentMethod
export default class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  openBottomSheet = (cardNumber) => () => {
    this.setState(
      {
        cardNumber,
      },
      this.bottomSheet.open(), // callback
    );
  };

  render() {
    const {cardNumber} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.swiperContainer}>
          <Swiper
            loop={false}
            showsPagination
            index={isRTL ? 1 : 0}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            paginationStyle={styles.paginationStyle}>
            <View style={styles.cardContainer}>
              <CreditCard
                colors={['#784BA0', '#2B86C5']}
                brand="visa"
                last4Digits="7654"
                cardHolder="John Doe"
                expiry="09 / 21"
              />
              <View style={styles.editButtonContainer}>
                <TouchableItem
                  onPress={this.openBottomSheet('7654')}
                  borderless>
                  <View style={styles.editButton}>
                    <Icon name={MORE_ICON} size={22} color={Colors.black} />
                  </View>
                </TouchableItem>
              </View>
            </View>

            <View style={styles.cardContainer}>
              <CreditCard
                colors={['#0D324D', '#7F5A83']}
                brand="discover"
                last4Digits="0123"
                cardHolder="John Doe"
                expiry="08 / 20"
              />
              <View style={styles.editButtonContainer}>
                <TouchableItem
                  onPress={this.openBottomSheet('0123')}
                  borderless>
                  <View style={styles.editButton}>
                    <Icon name={MORE_ICON} size={22} color={Colors.black} />
                  </View>
                </TouchableItem>
              </View>
            </View>
          </Swiper>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.navigateTo('AddCreditCard')}
            title="Add Credit Card"
          />
        </View>

        <BottomSheet
          ref={(ref) => {
            this.bottomSheet = ref;
          }}
          // FIX: closeOnSwipeDown need height to work properly
          height={232 + BOTTOM_SHEET_PB} // height of BottomSheet = 64 + 3 * 56 + 16
        >
          <View style={styles.bottomSheetItem}>
            <Caption style={styles.bottomSheetCaption}>
              {'Payment Method'.toUpperCase()}
            </Caption>
            <Subtitle1>xxxx xxxx xxxx {cardNumber}</Subtitle1>
          </View>

          <TouchableItem>
            <View style={styles.bottomSheetAction}>
              <View style={styles.bottomSheetIconContainer}>
                <Icon name={EDIT_ICON} size={22} color={Colors.primaryColor} />
              </View>
              <Subtitle1>Edit card details</Subtitle1>
            </View>
          </TouchableItem>

          <TouchableItem>
            <View style={styles.bottomSheetAction}>
              <View style={styles.bottomSheetIconContainer}>
                <Icon name={SAVE_ICON} size={22} color={Colors.primaryColor} />
              </View>
              <Subtitle1>Save for checkouts</Subtitle1>
            </View>
          </TouchableItem>

          <TouchableItem>
            <View style={styles.bottomSheetAction}>
              <View style={styles.bottomSheetIconContainer}>
                <Icon
                  name={REMOVE_ICON}
                  size={22}
                  color={Colors.primaryColor}
                />
              </View>
              <Subtitle1>Remove card</Subtitle1>
            </View>
          </TouchableItem>
        </BottomSheet>
      </SafeAreaView>
    );
  }
}
