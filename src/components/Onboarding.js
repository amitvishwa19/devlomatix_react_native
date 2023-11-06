import { ImageBackground, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef } from 'react'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue, SharedValue, useAnimatedStyle, interpolateColor, interpolate, Extrapolate } from 'react-native-reanimated';
import onboardingData, { OnboardingData } from '../../utils/data/OnboardingData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
//type OnboardProp = StackNavigationProp<RootStackParamList,'Onboard'>;

const Onboarding = ({navigation}) => {
  //const navigation = useNavigation<OnboardProp>();

  const flatListRef = useAnimatedRef<Animated.FlatList<OnboardingData>>(null);
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, width, 2 * width],
      ['#040720', '#033E3E', '#560319']
    )
    return {
      backgroundColor: backgroundColor
    }
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    }
  });


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/page_background.jpg')} resizeMode="cover" style={styles.screen_background_image}>
        <Animated.View style={[styles.screen, animatedColor]}>

          <View style={styles.screens_content_area}>
            <Animated.FlatList
              data={onboardingData}
              ref={flatListRef}
              onScroll={onScroll}
              keyExtractor={item => item.id}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              renderItem={({ item }) => {
                return (
                  <SlidingScreens item={item} />
                )
              }}
            />
          </View>

          <View style={styles.screen_action_area}>
            <Pagination data={onboardingData} x={x} />
            <View style={styles.action_button_area}>
              <TouchableOpacity onPress={() => {navigation.replace('DrawerNavigator') }} style={[styles.action_button,styles.action_button_skip]}>
                <Text style={[styles.action_button_text,{color:'#fff'}]}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                // if (flatListIndex.value < onboardData.length - 1) {
                //     flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
                // } else {
                //     navigation.replace('DrawerNavigator');
                // }
              }} style={[styles.action_button,styles.action_button_next]}>
                <Text style={[styles.action_button_text,{color:'#000'}]}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Animated.View>

      </ImageBackground>
    </View>
  )
}

export default Onboarding


// type SlidingScreensProps = {
//   item: OnboardingData;
// };
const SlidingScreens = ({ item }) => {

  return (

    <View style={styles.screens_content_area}>
      <View style={styles.screen_content_image_area}>
        <Image source={item.image_uri} style={styles.screen_content_image_area_image} />
      </View>
      <View style={styles.screen_content_text_area}>
        <Text style={styles.screen_content_text_area_title}>{item.title}</Text>
        <Text style={styles.screen_content_text_area_description}>{item.description}</Text>
      </View>

    </View>

  )
}

// type PaginationProps = {
//   x: SharedValue<number>;
//   data: OnboardingData[];
// }
const Pagination = ({ data, x }) => {

  // const animatedDotStyle = useAnimatedStyle(() => {

  // });
  return (
    <View style={styles.screen_action_area_pagination}>
      {
        data.map((data, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const widthAnimation = interpolate(
              x.value,
              [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              [10, 30, 10],
              Extrapolate.CLAMP,
            );

            const opacityAnimation = interpolate(
              x.value,
              [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              [0.5, 1, 0.5],
              Extrapolate.CLAMP,
            );
            return {
              width: widthAnimation,
              opacity: opacityAnimation,
            };
          });
          const animatedColor = useAnimatedStyle(() => {
            const backgroundColor = interpolateColor(
              x.value,
              [0, width, 2 * width],
              ['#FBFBF9', '#008B8B', '#F15937'],
            );

            return {
              backgroundColor: backgroundColor,
            };
          });
          return (
            <Animated.View key={index} style={[styles.screen_action_area_pagination_dots, animatedColor, animatedDotStyle]}></Animated.View>
          )
        })
      }
    </View>
  )
}



const styles = StyleSheet.create({
  container: {},
  screen: { flex: 1, height: height, width: width, },
  screen_background_image: { height: height, width: width, opacity: .9, fontSize: 50 },
  screens: { width: width, height: height, justifyContent: 'center', alignItems: 'center' },

  screens_content_area: { height: height * 0.8, },
  screen_content_image_area: { height: '60%', justifyContent: 'center', alignItems: 'center' },
  screen_content_image_area_image: { height: '80%', width: '80%', resizeMode: 'contain', },

  screen_content_text_area: { height: '40%', width: width, alignItems: 'center', paddingHorizontal: 5, paddingVertical: 40 },
  screen_content_text_area_title: { fontSize: 24, fontWeight: 'bold', color: '#fff', },
  screen_content_text_area_description: { fontSize: 14, lineHeight: 20, marginHorizontal: 20, textAlign: 'center', color: '#fff', marginTop: 20 },

  screen_action_area: { color: 'white', width: width, height: height * 0.2, paddingVertical: 40 ,justifyContent:'space-between'},
  screen_action_area_pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  screen_action_area_pagination_dots: { height: 6, width: 10, marginRight: 5, borderRadius: 5 },
  action_button_area:{flexDirection:'row',justifyContent:'space-around'},
  action_button: {backgroundColor:'white',paddingHorizontal:60,paddingVertical:10,borderRadius:5,},
  action_button_text:{fontWeight:'600'},
  action_button_skip:{backgroundColor:'#000',borderWidth:2,borderColor:'#fff'},
  action_button_next:{backgroundColor:'#fff',borderWidth:2,borderColor:'#000'}
})