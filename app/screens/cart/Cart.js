/* eslint-disable prettier/prettier */

import React, {Component, Fragment} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import remove from 'lodash/remove';

import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import Button from '../../components/buttons/Button';
import {Heading6, Subtitle1} from '../../components/text/CustomText';
import Divider from '../../components/divider/Divider';
import EmptyState from '../../components/emptystate/EmptyState';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, child, get, set} from 'firebase/database';
import Colors from '../../theme/colors';

import sample_data from '../../config/sample-data';

const EMPTY_STATE_ICON = 'cart-remove';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  titleText: {
    fontWeight: '700',
  },
  productList: {
    paddingHorizontal: 12,
  },
  subTotalText: {
    top: -2,
    fontWeight: '500',
    color: Colors.onSurface,
  },
  subTotalPriceText: {
    fontWeight: '700',
    color: Colors.primaryColor,
  },
  bottomButtonContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0.0,
      products: sample_data.cart_products,
      //products: [],
    };
  }

  componentDidMount = () => {
    this.updateTotalAmount();
    this.getData();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  };
  getTotalatLoad() {
    console.log('price', this.state.products[0].price);
  }
  getData() {
    const dbRef = ref(getDatabase());
    let array = [];
    const auth = getAuth();
    const user = auth.currentUser;
    const self = this;
    let total = 0;
    get(child(dbRef, 'cart/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          console.log(Object.values(snapshot.val()));
          array = Object.values(snapshot.val());
          for (const index in array) {
            if (array[index].userid === user.uid) {
              console.log(array[index].price);
              total = total + array[index].price;
            } else {
              console.log(array[index].cartID);
              array.pop(index);
            }
          }
          this.setState({total: total});
          this.setState({products: array});
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  navigateTo = (screen, key) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
    navigation.navigate(screen, {
      key: key,
    });
  };

  swipeoutOnPressRemove = (item) => () => {
    let {products} = this.state;
    const index = products.indexOf(item);

    products = remove(products, (n) => products.indexOf(n) !== index);

    this.setState(
      {
        products,
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };

  onRefreshCart = () => {
    let {products} = this.state;
  };
  onPressRemove = (item) => () => {
    console.log('Remove', item.cartID);
    let {quantity} = item;
    quantity -= 1;

    let {products} = this.state;
    const index = products.indexOf(item);

    if (quantity === 0) {
      products = remove(products, (n) => products.indexOf(n) !== index);
    } else {
      products[index].quantity = quantity;
    }

    this.setState(
      {
        products: [...products],
      },
      () => {
        this.updateTotalAmount();
      },
    );
    const db = ref(getDatabase());
    console.log(item.cartID);
    set(child(db, `cart/${item.cartID}`), {});
  };

  onPressAdd = (item) => () => {
    const {quantity} = item;
    const {products} = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState(
      {
        products: [...products],
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };

  updateTotalAmount = () => {
    const {products} = this.state;
    let total = 0.0;

    products.forEach((product) => {
      let {price} = product;
      const {discountPercentage, quantity} = product;

      if (typeof discountPercentage !== 'undefined') {
        price -= price * discountPercentage * 0.01;
      }
      total += price * quantity;
    });

    this.setState({
      total,
    });
  };

  keyExtractor = (item) => item.id.toString();

  renderProductItem = ({item}) => (
    <ActionProductCardHorizontal
      key={item.id}
      onPress={this.navigateTo('EditCartProduct', item.cartID)}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
      showTrash={true}
    />
  );

  render() {
    const {total, products} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Cart</Heading6>
          {products.length > 0 && (
            <View style={styles.inline}>
              <Subtitle1 style={styles.subTotalText}> Subtotal: </Subtitle1>
              <Heading6 style={styles.subTotalPriceText}>
                {`₱ ${parseFloat(Math.round(total * 100) / 100).toFixed(2)}`}
              </Heading6>
            </View>
          )}
        </View>

        {products.length === 0 ? (
          <EmptyState title="Your Cart is Empty" message="" />
        ) : (
          <Fragment>
            <View style={styles.flex1}>
              <FlatList
                data={products}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderProductItem}
                contentContainerStyle={styles.productList}
                refreshControl={this.refreshCart}
              />
            </View>

            <Divider />

            <View style={styles.bottomButtonContainer}>
              <Button onPress={() => console.log('test')} title="Checkout" />
            </View>
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}
