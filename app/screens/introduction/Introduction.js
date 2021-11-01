/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {Heading5, Paragraph} from '../../components/text/CustomText';
import {passAuth} from '../../config/firebase';
import {onAuthStateChanged} from 'firebase/auth';

// import colors
import Colors from '../../theme/colors';

const bgImg =
  'https://www.kitchensanctuary.com/wp-content/uploads/2020/12/Quick-Chicken-Ramen-square-FS-22.jpg';

const slide1Img = {
  uri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/fyf_Wzj-bXNwsN.png',
};
const slide2Img = {
  uri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/payment__wcgkxrFjg.png',
};
const slide3Img = {
  uri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/fast-del_LP8Jfhjai.png',
};

const slides = [
  {
    id: 'slide1',
    img: slide1Img,
    title: 'Find your ramen',
    description: 'Fastest way to order delicious ramen.',
  },
  {
    id: 'slide2',
    img: slide2Img,
    title: 'Easy payment',
    description: 'Pay online with your credit card or other e-wallet.',
  },
  {
    id: 'slide3',
    img: slide3Img,
    title: 'Fast delivery',
    description: 'Get & enjoy delicious ramen to your door.',
  },
];

// Introduction Styles
const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  skipLink: {
    position: 'absolute',
    right: 0,
    marginTop: StatusBar.currentHeight == null ? 50 : StatusBar.currentHeight,
    marginHorizontal: 16,
    padding: 5,
    color: Colors.white,
    letterSpacing: 0.4,
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
  },
  swiperContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  slideContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  slideImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  slideImg: {
    width: 190,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    paddingTop: 24,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 56,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
    opacity: 0.96,
  },
  buttonContainer: {
    marginHorizontal: 64,
    marginBottom: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
    height: 56,
  },
  dot: {
    margin: 4,
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  activeDot: {
    backgroundColor: Colors.onPrimaryColor,
    width: 30,
  },
  inactiveDot: {
    backgroundColor: Colors.black,
    opacity: 0.32,
  },
});

// Introduction
export default class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onIndexChanged = (index) => {
    this.setState({
      activeIndex: index,
    });
  };

  previousSlide = () => {
    this.swiper.scrollBy(-1, true);
  };

  nextSlide = () => {
    this.swiper.scrollBy(1, true);
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };
  componentDidMount = async () => {
    const {navigation} = this.props;
    onAuthStateChanged(passAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        console.log(user);
        navigation.navigate('HomeNavigator');
      } else {
        console.log('no user logged in');
      }
    });
  };

  render() {
    const {activeIndex} = this.state;

    return (
      <ImageBackground source={{uri: bgImg}} style={styles.bgImg}>
        <StatusBar
          //translucent
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <GradientContainer
          colors={[Colors.secondaryGradientColor, 'transparent']}
          start={{x: 0, y: 0.64}}
          end={{x: 0, y: 0}}>
          <SafeAreaView style={styles.screenContainer}>
            <View style={styles.swiperContainer}>
              <Swiper
                ref={(swiper) => {
                  this.swiper = swiper;
                }}
                onIndexChanged={this.onIndexChanged}
                loop={false}
                showsPagination={false}>
                {slides.map((item) => (
                  <View key={item.id} style={styles.slide}>
                    <View style={styles.slideContent}>
                      <View style={styles.slideImgContainer}>
                        <Image source={item.img} style={styles.slideImg} />
                      </View>

                      <Heading5 style={styles.title}>{item.title}</Heading5>

                      <View style={styles.descriptionContainer}>
                        <Paragraph style={styles.descriptionText}>
                          {item.description}
                        </Paragraph>
                      </View>
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>

            {activeIndex < slides.length - 1 && (
              <Text
                onPress={this.navigateTo('Welcome')}
                style={styles.skipLink}>
                Skip
              </Text>
            )}

            <View style={styles.buttonContainer}>
              {activeIndex < slides.length - 1 ? (
                <ContainedButton
                  onPress={this.nextSlide}
                  title="next"
                  titleColor={Colors.black}
                  color={Colors.white}
                  rounded
                />
              ) : (
                <ContainedButton
                  onPress={this.navigateTo('Welcome')}
                  title="get started"
                  titleColor={Colors.black}
                  color={Colors.white}
                  rounded
                />
              )}
            </View>

            <View style={styles.paginationContainer}>
              {slides.map((item, i) => (
                <View
                  key={`dot_${item.id}`}
                  style={[
                    styles.dot,
                    activeIndex === i ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          </SafeAreaView>
        </GradientContainer>
      </ImageBackground>
    );
  }
}
