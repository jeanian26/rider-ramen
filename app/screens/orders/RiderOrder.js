/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ImageBackground,
} from 'react-native';

import OrderItem from '../../components/cards/OrderItem';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, child, get, set,update } from 'firebase/database';
import { Caption, Subtitle1, Subtitle2 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import Colors from '../../theme/colors';
import sample_data from '../../config/sample-data';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/buttons/Button';
const styles = StyleSheet.create({
    pt16: { paddingTop: 16 },
    screenContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // padding:12,
    },
    productsContainer: {
        paddingVertical: 8,
    },
    form: {
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    overline: {
        color: Colors.primaryColor,
        textAlign: 'left',
    },
    orderInfo: {
        paddingVertical: 8,
        textAlign: 'left',
    },
    orderInfo1: {
        paddingVertical: 15,
        textAlign: 'left',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
    },
    bottomButtonContainer: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
});
export default class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            Address: {},
            orderList: {},

        };
    }
    componentDidMount() {
        //this.addData();
        this.getData();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getData();
        });
    }
    getData() {
        const { route } = this.props;
        const { orderID, orderUserId } = route.params;
        console.log('Order Screen', orderID, orderUserId);

        let products = [];
        const dbRef = ref(getDatabase());
        get(child(dbRef, `order/${orderUserId}/${orderID}`))
            .then((snapshot) => {
                let result = snapshot.val();
                console.log('result:', result);
                this.setState({ data: result, orderList: result.orderItems });
            })
            .catch((error) => {
            });
        get(child(dbRef, `order/${orderUserId}/${orderID}/orderAddress`))
            .then((snapshot) => {
                let result = snapshot.val();
                console.log('result:', result);
                this.setState({ Address: result });
            })
            .catch((error) => {
            });
    }


    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    navigateTo = (screen) => () => {
        const { navigation } = this.props;
        navigation.navigate(screen);
    };
    completeOrder(orderID,userID) {
        console.log('complete ORDER!');
        const db = getDatabase();
        const updates = {};
        updates[`order/${userID}/${orderID}/orderStatus`] = 'delivered';
        update(ref(db), updates);
    }



    render() {
        const {
            data,
            Address,
            orderList,
        } = this.state;
        console.log('Order List', orderList);
        let orders = [];
        let price = 0;
        for (let item in orderList) {
            price = orderList[item].price + price;
            orders.push(
                <View style={styles.row}>
                    <Subtitle1 style={styles.orderInfo}>{orderList[item].name}</Subtitle1>
                    <Subtitle1 style={styles.amount}>₱ {orderList[item].price}.00</Subtitle1>
                </View>
            );

        }


        return (
            <SafeAreaView style={styles.screenContainer}>
                <StatusBar
                    backgroundColor={Colors.statusBarColor}
                    barStyle="dark-content"
                />
                <View style={styles.container} >
                    <ScrollView>
                        <View style={styles.form}>
                            <Subtitle2 style={styles.overline}>
                                Order ID
                            </Subtitle2>
                            <Subtitle1
                                style={
                                    styles.orderInfo
                                }>{data.orderNumber}</Subtitle1>
                            <Subtitle2 style={[styles.overline, styles.pt16]}>
                                Delivery Address
                            </Subtitle2>
                            <Subtitle1
                                style={
                                    styles.orderInfo
                                }>{Address.str_number} {Address.street_name} {Address.barangay} {Address.city} {Address.zipcode}</Subtitle1>

                            <Subtitle2 style={[styles.overline, styles.pt16]}>
                                Date of Order
                            </Subtitle2>
                            <Subtitle1
                                style={
                                    styles.orderInfo
                                }>{data.orderDate}</Subtitle1>
                            <Subtitle2 style={[styles.overline, styles.pt16]}>
                                Payment Method
                            </Subtitle2>
                            <Subtitle1
                                style={
                                    styles.orderInfo
                                }>{data.orderPayment}</Subtitle1>

                            <Subtitle2 style={[styles.overline, styles.pt16]}>
                                Order Status
                            </Subtitle2>
                            <Subtitle1
                                style={
                                    styles.orderInfo
                                }>{data.orderStatus}</Subtitle1>

                            <Subtitle2 style={[styles.overline, styles.pt16]}>
                                Order list
                            </Subtitle2>
                            {orders}
                            {/* {Object.keys(orderList).map(key => (
                                <View style={styles.row}>
                                    <Subtitle1 style={styles.orderInfo}>{orderList[key].name}</Subtitle1>
                                    <Subtitle1 style={styles.amount}>₱ {orderList[key].price}.00</Subtitle1>
                                </View>
                            ))} */}
                            <Subtitle2 style={[styles.overline, styles.pt16]}>
                                Your Order
                            </Subtitle2>
                            <View style={styles.row}>
                                <Subtitle1 style={styles.orderInfo}>Total amount</Subtitle1>
                                <Subtitle1 style={styles.amount}>₱ {price}.00</Subtitle1>
                            </View>
                        </View>

                    </ScrollView>
                    <View style={styles.bottomButtonContainer}>
                        <Button onPress={() => { this.completeOrder(data.orderNumber,data.orderUserId); }}
                            title="Complete Order"
                        />
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}
