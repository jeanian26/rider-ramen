/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import OrderItem from '../../components/cards/OrderItem';

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

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  keyExtractor = (item) => item.orderNumber.toString();

  renderItem = ({item, index}) => (
    <OrderItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.orderNumber}
      orderDate={item.orderDate}
      orderItems={item.orderItems}
      orderStatus={item.orderStatus}
      onPress={this.navigateTo('Product')}
    />
  );

  render() {
    const {orders} = this.state;

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
