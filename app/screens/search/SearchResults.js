/**
 * ramennado - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';

// import components
import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';

// import colors
import Colors from '../../theme/colors';

//import sample data
import sample_data from '../../config/sample-data';

// SearchResults Config

// SearchResults Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productList: {
    // spacing = padding + ActionProductCardHorizontal margin = 12 + 4 = 16
    padding: 12,
  },
});

// SearchResults
export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: sample_data.search_products,
    };
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  onPressRemove = (item) => () => {
    let {quantity} = item;
    quantity -= 1;

    const {products} = this.state;
    const index = products.indexOf(item);

    if (quantity < 0) {
      return;
    }
    products[index].quantity = quantity;

    this.setState({
      products: [...products],
    });
  };

  onPressAdd = (item) => () => {
    const {quantity} = item;
    const {products} = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState({
      products: [...products],
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderProductItem = ({item, index}) => (
    <ActionProductCardHorizontal
      onPress={this.navigateTo('Product')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      onCartPress={this.navigateTo('Cart')}
      swipeoutDisabled
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
      cartButton={true}
    />
  );

  render() {
    const {products} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <FlatList
          data={products}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderProductItem}
          contentContainerStyle={styles.productList}
        />
      </SafeAreaView>
    );
  }
}
