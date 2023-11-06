import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import { size } from '../../utils/size';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../utils/styles';
import { consolelog } from '../../functions/consoleLog';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {

  const navigation = useNavigation<LoginScreenProp>();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const [clickable, setClickable] = useState(true)

  useEffect(() => {
    //getData();

  }, [])

  const getData = async () => {
    try {
      const data = await firestore().collection('test').doc('PFsd4mdR03dOaxzvA2CA').get();
      console.log(data);
    } catch (e) {
      console.log('Getting data error- ' + e)
    }
  }

  const loginCLicked = async () => {
    try {

      const isUserLoggedin = await auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          consolelog('Logged in Succesfully')
          navigation.navigate('DrawerNavigator')
        })
        .catch(error => {
          if (error.code === 'auth/invalid-login') {
            setMessage('Invalid Login credentials or Account not found');
          }
        })


    } catch (e) {
      console.log('Getting data error- ' + e)
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View >

          <View style={{ marginVertical: 22 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: colors.black
            }}>
              Hi Welcome Back ! 👋
            </Text>

            <Text style={{
              fontSize: 16,
              color: colors.black
            }}>Hello again you have been missed!</Text>
          </View>


          {/* Email */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.feild_title}>Email address</Text>

            <View style={{
              width: "100%",
              height: 48,
              borderColor: colors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your email address'
                placeholderTextColor={colors.black}
                keyboardType='email-address'
                value={email}
                onChangeText={txt => setEmail(txt)}
                style={{
                  width: "100%"
                }}
              />
            </View>
          </View>

          {/* Password */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.feild_title}>Password</Text>

            <View style={{
              width: "100%",
              height: 48,
              borderColor: colors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={colors.black}
                value={password}
                onChangeText={txt => setPassword(txt)}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%"
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12
                }}
              >
                {
                  isPasswordShown == true ? (
                    <Ionicons name="eye" size={24} color={colors.black} />
                  ) : (
                    <Ionicons name="eye-off" size={24} color={colors.black} />
                  )
                }

              </TouchableOpacity>
            </View>
          </View>

          {/* Error Message */}
          <View style={globalStyles.error_info_view}>
            <Text style={globalStyles.error_message}>{message}</Text>
          </View>


          <View>
            <CustomButton
              title='Login'
              backgroundColor='green'
              color='#fff'
              borderColor='transparent'
              width='100%'
              onClick={loginCLicked}

            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: colors.gray,
                marginHorizontal: 10
              }}
            />
            <Text style={styles.feild_title}>Or Login with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: colors.gray,
                marginHorizontal: 10
              }}
            />
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: size.buttonHeight,
                borderWidth: 1,
                borderColor: colors.gray,
                marginRight: 4,
                borderRadius: size.buttonBorderRadius
              }}
            >
              <Image
                source={require("../../assets/images/facebook.png")}
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 8
                }}
                resizeMode='contain'
              />

              <Text>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: size.buttonHeight,
                borderWidth: 1,
                borderColor: colors.gray,
                marginRight: 4,
                borderRadius: size.buttonBorderRadius
              }}
            >
              <Image
                source={require("../../assets/images/google.png")}
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 8
                }}
                resizeMode='contain'
              />

              <Text>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22
          }}>
            <Text style={{ fontSize: 16, color: colors.black }}>Don't have an account ? </Text>
            <Pressable
              onPress={() => navigation.replace("Register")}
            >
              <Text style={{
                fontSize: 16,
                color: colors.primary,
                fontWeight: "bold",
                marginLeft: 6
              }}>Register</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  root: { flex: 1, padding: 10 },
  feild_title: { fontSize: 16, fontWeight: '600', marginVertical: 8 },
})