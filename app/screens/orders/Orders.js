/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  BackHandler,
  Alert,
} from 'react-native';

import OrderItem from '../../components/cards/OrderItem';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import Colors from '../../theme/colors';
import sample_data from '../../config/sample-data';
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  productsContainer: {
    paddingVertical: 8,
  },
});
export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // orders: sample_data.orders,
      orders: [],
    };
  }
  componentDidMount() {
    //this.addData();
    this.getData();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction
    );
  }
  backAction = () => {
    const { navigation } = this.props;
    // console.log(this.props.navigation.state.routeName);
    if (navigation.isFocused()) {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }
  getData() {
    let products = [];
    let orderlist = [];
    const auth = getAuth();
    const user = auth.currentUser;
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'order/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          products = snapshot.val();
          for (var key in products) {
            let ordersItem = products[key];
            for (var item in ordersItem) {
              console.log(ordersItem[item]);
              if (ordersItem[item].orderStatus !== 'delivered'){
                orderlist.push(products[key][item]);
              }
            }
          }

          console.log('this is the final list', orderlist);
          this.setState({ orders: orderlist });
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = (screen, orderID, orderUserId) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen, { orderID: orderID, orderUserId: orderUserId });
  };
  changeDate(date) {
    if (!date) {
      return '';
    }
    date = date.slice(0, 24);
    return date;
  }

  keyExtractor = (item) => item.orderNumber.toString();

  renderItem = ({ item, index }) => (
    <OrderItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.orderNumber}
      orderDate={this.changeDate(item.orderDate)}
      orderItems={item.orderItems}
      orderStatus={item.orderStatus}
      onPress={this.navigateTo('RiderOrder', item.orderNumber, item.orderUserId)}
    // onPress={()=>{}}
    />
  );

  render() {
    const { orders } = this.state;


    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <FlatList
            data={orders}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={styles.productsContainer}
          />
        </View>
      </SafeAreaView>
    );
  }
}
