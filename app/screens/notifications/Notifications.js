/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import remove from 'lodash/remove';

// import components
import EmptyState from '../../components/emptystate/EmptyState';
import NotificationItem from '../../components/cards/NotificationItem';

// import colors
import Colors from '../../theme/colors';

// Notifications Config
const EMPTY_STATE_ICON = 'bell-ring-outline';

//import sample data
import sample_data from '../../config/sample-data';

// Notifications Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  notificationsContainer: {
    paddingVertical: 8,
  },
});

// Notifications
export default class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: sample_data.notifications,
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

  swipeoutOnPressRemove = (item) => () => {
    let {notifications} = this.state;
    const index = notifications.indexOf(item);

    notifications = remove(
      notifications,
      (n) => notifications.indexOf(n) !== index,
    );

    this.setState({
      notifications,
    });
  };

  keyExtractor = (item) => item.notificationId.toString();

  renderItem = ({item, index}) => (
    <NotificationItem
      activeOpacity={0.85}
      type={item.type}
      title={item.title}
      text={item.text}
      meta={item.meta}
      readOut={item.readOut}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
    />
  );

  render() {
    const {notifications} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <View style={styles.container}>
          {notifications.length === 0 ? (
            <EmptyState
              showIcon
              iconName={EMPTY_STATE_ICON}
              title="Your Notifications List is Empty"
              message="Stay tuned! Notifications about your orders will show up here"
            />
          ) : (
            <FlatList
              data={notifications}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              contentContainerStyle={styles.notificationsContainer}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
