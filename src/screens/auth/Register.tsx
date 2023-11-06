import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../utils/colors';
import { strings } from '../../utils/strings';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../components/CustomButton';
import { size } from '../../utils/size';
import auth from '@react-native-firebase/auth';
import GlobalStyles from '../../utils/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import { consolelog } from '../../functions/consoleLog';
import messaging from '@react-native-firebase/messaging';

type RegisterScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;

const Register = () => {
  const navigation = useNavigation<RegisterScreenProp>();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState('')


  const registerClick = async () => {
    const deviceToken = await messaging().getToken()
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password).then(() => {

        firestore().collection('users').doc(auth().currentUser?.uid).set({
          uid: auth().currentUser?.uid,
          email: email,
          password: password,
          deviceToken:deviceToken
        })
          .then(() => {
            auth().signOut().then(() => {
              auth().currentUser?.sendEmailVerification()
              ToastAndroid.showWithGravity('Account created successfully', ToastAndroid.LONG, ToastAndroid.BOTTOM);
              navigation.replace('Login')
            })
          });
      })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setMessage(error.code)
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setMessage(error.code)
          }
        });

    } catch (error) {

    }
  }


  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View >

          {/* Title area */}
          <View style={{ marginVertical: 22 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: colors.black
            }}>
              Create Account
            </Text>

            <Text style={{
              fontSize: 16,
              color: colors.black
            }}>Let's Create your account with {strings.appName}</Text>
          </View>

          {/* Email Address */}
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
                secureTextEntry={isPasswordShown}
                value={password}
                onChangeText={txt => setPassword(txt)}
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

          {/*Confirm Password */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.feild_title}>Confirm Password</Text>

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
                placeholder='Confirm your password'
                placeholderTextColor={colors.black}
                secureTextEntry={isPasswordShown}
                value={confirmPassword}
                onChangeText={txt => setconfirmPassword(txt)}
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
          <View>
            <Text style={GlobalStyles.error_message}>{message}</Text>
          </View>

          {/* Register button */}
          <View style={{ marginTop: 20 }}>
            <CustomButton
              title='Register'
              backgroundColor='green'
              color='#fff'
              borderColor='transparent'
              width='100%'
              onClick={registerClick}
            />
          </View>



          {/* Login navigation */}
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22
          }}>
            <Text style={{ fontSize: 16, color: colors.black }}>Already have an account</Text>
            <Pressable
              onPress={() => navigation.replace("Login")}
            >
              <Text style={{
                fontSize: 16,
                color: colors.primary,
                fontWeight: "bold",
                marginLeft: 6
              }}>Login</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  root: { flex: 1, padding: 10 },
  feild_title: { fontSize: 16, fontWeight: '600', marginVertical: 8 }
})