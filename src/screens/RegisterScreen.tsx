import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { globalcolors } from '../utils/colors';
import { strings } from '../utils/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../utils/styles';
import CustomButton from '../components/CustomButton';
import { LogUserDataToFirebaseDdatabase, consolelog } from '../utils/functions';

type RegisterScreenProp = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;
const RegisterScreen = ({ navigation }: RegisterScreenProp) => {


  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState('')


  const registerClick = async () => {
    const deviceToken = await messaging().getToken()
    try {
      await auth().createUserWithEmailAndPassword(email, password).then(() => {
        const user = auth().currentUser;
        
        //Logging data to database
        LogUserDataToFirebaseDdatabase(
          user?.uid,
          user?.displayName,
          user?.email,
          user?.photoURL
        ).then(() => {
          auth().signOut().then(()=>{
            ToastAndroid.showWithGravity('Account created successfully', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            navigation.replace('LoginScreen')
          })
        });
      })
    } catch (error) {
      consolelog('Error while registring user : ' + error)
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
              color: globalcolors.black
            }}>
              Create Account
            </Text>

            <Text style={{
              fontSize: 16,
              color: globalcolors.black
            }}>Let's Create your account with {strings.appName}</Text>
          </View>

          {/* Email Address */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.feild_title}>Email address</Text>

            <View style={{
              width: "100%",
              height: 48,
              borderColor: globalcolors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your email address'
                placeholderTextColor={globalcolors.black}
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
              borderColor: globalcolors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={globalcolors.black}
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
                    <Ionicons name="eye" size={24} color={globalcolors.black} />
                  ) : (
                    <Ionicons name="eye-off" size={24} color={globalcolors.black} />
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
              borderColor: globalcolors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Confirm your password'
                placeholderTextColor={globalcolors.black}
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
                    <Ionicons name="eye" size={24} color={globalcolors.black} />
                  ) : (
                    <Ionicons name="eye-off" size={24} color={globalcolors.black} />
                  )
                }

              </TouchableOpacity>
            </View>
          </View>
          {/* Error Message */}
          <View>
            <Text style={globalStyles.error_message}>{message}</Text>
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
            <Text style={{ fontSize: 16, color: globalcolors.black }}>Already have an account</Text>
            <Pressable
              onPress={() => navigation.replace("LoginScreen")}
            >
              <Text style={{
                fontSize: 16,
                color: globalcolors.primary,
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

export default RegisterScreen

const styles = StyleSheet.create({
  root: { flex: 1, padding: 10 },
  feild_title: { fontSize: 16, fontWeight: '600', marginVertical: 8 }
})