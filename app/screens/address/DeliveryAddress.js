/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import ActionButton from 'react-native-action-button';

// import components
import Icon from '../../components/icon/Icon';
import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

// DeliveryAddress Config
const IOS = Platform.OS === 'ios';
const RADIO_OFF_ICON = IOS ? 'ios-radio-button-off' : 'md-radio-button-off';
const RADIO_ON_ICON = IOS ? 'ios-radio-button-on' : 'md-radio-button-on';
const EDIT_ICON = IOS ? 'ios-create' : 'md-create';
const FAB_ICON = IOS ? 'ios-add' : 'md-add';
const HOME_ICON = IOS ? 'ios-home' : 'md-home';
const LOCATION_ICON = IOS ? 'ios-pin' : 'md-pin';

// DeliveryAddress Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  addressList: {
    paddingVertical: 8,
  },
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: Colors.surface,
  },
  leftAddresContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  addressInfo: {
    flex: 1,
    marginRight: 6,
  },
  caption: {
    paddingVertical: 2,
    color: Colors.accentColor,
    textAlign: 'left',
  },
  radioIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 24,
    height: 24,
  },
  addressText: {
    paddingVertical: 4,
    textAlign: 'left',
  },
  editIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
});

// DeliveryAddress Props
type Props = {
  onPress: () => {},
  onPressEdit: () => {},
  type: string,
  street: string,
  district: string,
  city: string,
  zip: string,
  number: string,
  active: boolean,
};

// DeliveryAddress Components
const Address = ({
  onPress,
  onPressEdit,
  type,
  street,
  district,
  city,
  zip,
  number,
  active,
}: Props) => (
  <TouchableItem onPress={onPress} useForeground>
    <View style={styles.addressCard}>
      <View style={styles.leftAddresContainer}>
        <View style={styles.radioIconContainer}>
          {active ? (
            <Icon
              name={RADIO_ON_ICON}
              size={21}
              color={Colors.secondaryColor}
            />
          ) : (
            <Icon
              name={RADIO_OFF_ICON}
              size={21}
              color={Colors.secondaryColor}
            />
          )}
        </View>

        <View style={styles.addressInfo}>
          {type !== '' && (
            <Caption style={styles.caption}>
              {`${type.toUpperCase()} ADDRESS`}
            </Caption>
          )}
          <Subtitle1 style={styles.addressText}>
            {`${number} ${street}, ${district}`}
          </Subtitle1>
          <Subtitle2 style={styles.addressText}>{`${city} ${zip}`}</Subtitle2>
        </View>
      </View>

      <View style={{height: 50}}>
        <TouchableItem onPress={onPressEdit} borderless>
          <View style={styles.editIconContainer}>
            <Icon name={EDIT_ICON} size={24} color={Colors.primaryColor} />
          </View>
        </TouchableItem>
      </View>
    </View>
  </TouchableItem>
);

// DeliveryAddress
export default class DeliveryAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [
        {
          id: 'address1',
          type: 'Office',
          street: 'Petunia Dr',
          district: '',
          city: 'Washington DC',
          zip: '48173',
          number: '18082',
          active: false,
        },
        {
          id: 'address2',
          type: 'Home',
          street: 'Cypress Ct',
          district: '',
          city: 'Washington DC',
          zip: '30115',
          number: '160',
          active: true,
        },
        {
          id: 'address3',
          type: 'Apartment',
          street: 'Green Gate Dr',
          district: 'Al Amal',
          city: 'Rosenberg',
          zip: '12643',
          number: '1846',
          active: false,
        },
      ],
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  setDeliveryAddress = item => () => {
    const {addresses} = this.state;
    const index = addresses.indexOf(item);
    const activeIndex = addresses.findIndex(e => e.active === true);

    if (activeIndex !== index) {
      addresses[activeIndex].active = false;
      addresses[index].active = true;

      this.setState({
        addresses: [...addresses],
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderAddressItem = ({item}) => (
    <Address
      key={item.id}
      onPress={this.setDeliveryAddress(item)}
      onPressEdit={this.navigateTo('EditAddress')}
      type={item.type}
      building={item.building}
      street={item.street}
      district={item.district}
      city={item.city}
      zip={item.zip}
      number={item.number}
      active={item.active}
    />
  );

  handleFabPress = () => {

  };

  renderFAB_ICON = () => (
    <Icon name={FAB_ICON} size={24} color={Colors.onAccentColor} />
  );

  render() {
    const {addresses} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <FlatList
            data={addresses}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderAddressItem}
            contentContainerStyle={styles.addressList}
          />

          <ActionButton
            buttonColor={Colors.primaryColor}
            onPress={this.navigateTo('AddAddress')}
            offsetX={20}
            offsetY={20}
            renderIcon={this.renderFAB_ICON}
            bgColor={Colors.primaryColor}
            hideShadow
            fixNativeFeedbackRadius/>
        </View>
      </SafeAreaView>
    );
  }
}
