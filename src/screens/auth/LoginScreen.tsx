import { ActivityIndicator, Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { LogUserDataToFirebase, consolelog } from '../../utils/functions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { size } from '../../utils/size';
import { globalcolors } from '../../utils/colors';
import CustomButton from '../../components/CustomButton';
import { globalStyles } from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import PageBackground from '../../components/PageBackground';
import { appConfig } from '../../utils/config';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../../utils/constants';
import { UserDataType } from '../../utils/types';
import { useRoute } from '@react-navigation/native';




const { height: height, width: width } = Dimensions.get('window');
type LoginScreenProp = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;


const LoginScreen = ({ navigation }: LoginScreenProp) => {

  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [loggedin, setLoggedin] = useState()


  useEffect(() => {
    googleConfiguration();
  }, [])

  const googleConfiguration = () => {
    GoogleSignin.configure({
      webClientId: '670445737708-t45u8eiom6589aqv4cqvfiec0vlde7go.apps.googleusercontent.com',
    });
  }


  const loginCLicked = async () => {
    try {


      if (email == '' && password == '') {
        Toast.show('Please enter Email and Password', Toast.LONG)
      } else {
        setLoading(true)
        const userLogin = await auth().signInWithEmailAndPassword(email, password).then(() => {
          consolelog('Logged in Succesfully')
          setLoading(false)
          navigation.replace('MainScreen')
        }).catch(error => {
          consolelog(error.code)
          setLoading(false)
          if (error.code === 'auth/invalid-email') {
            setMessage('Invalid email id');
          }
          if (error.code === 'auth/invalid-login') {
            setMessage('Invalid Login credentials or Account not found');
          }
        })
      }



    } catch (e) {
      console.log('Getting data error- ' + e)
    }
  }

  const GoogleSigninCLick = async () => {
    try {
      consolelog('Google Signin')
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn()
      await GoogleSignin.signOut().then(() => {
        setLoading(true)
        googleLogin(idToken).then(() => {

        }).catch((error) => {
          console.log('googleLogin:', error)
        })
      })

    } catch (error) {
      console.log('Error while google signin :', error)
    }
  }

  const googleLogin = async (idToken: any) => {
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    const fbgl = await auth().signInWithCredential(googleCredential);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber();
  }

  function onAuthStateChanged(user: any) {
    const deviceToken =  messaging().getToken()
    setLoggedin(user)

    if (user) {
      logUserData(user)
    }

  }

  const logUserData = async(user:any)=>{
    const deviceToken =  await messaging().getToken()
    const userData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      avatar: user.photoURL,
      dnd: false,
      loggedIn: true,
      deviceToken:deviceToken
    }

    LogUserDataToFirebase(userData)
        .then(() => {
          AsyncStorage.setItem('user', JSON.stringify(userData))
          AsyncStorage.setItem('uid', userData.uid)
          AsyncStorage.setItem('avatar', userData.avatar)
          setLoading(false)
          navigation.replace('MainScreen')
        }).catch((e) => {
          setLoading(false);
          Toast.show('Oops something went wrong, please try again later', 2000)
          navigation.replace('LoginScreen')
        })

  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ padding: 10 }}>

        <PageBackground />

        <View >

          <View style={{ marginVertical: 22 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: '#fff'
            }}>
              Hi Welcome Back ! 👋
            </Text>

            <Text style={{
              fontSize: 16,
              color: '#fff'
            }}>Hello again you have been missed!</Text>
          </View>


          {/* Email */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.feild_title}>Email address</Text>

            <View style={{
              width: "100%",
              height: 48,
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your email address'
                placeholderTextColor='#fff'
                keyboardType='email-address'
                value={email}
                onChangeText={txt => setEmail(txt)}
                style={{
                  width: "100%",
                  color: '#fff'
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
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor='#fff'
                value={password}
                onChangeText={txt => setPassword(txt)}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                  color: '#fff'
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
                    <Ionicons name="eye" size={24} color='#fff' />
                  ) : (
                    <Ionicons name="eye-off" size={24} color='#fff' />
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
              backgroundColor={appConfig.colors.primaryColor}
              color='#fff'
              borderColor='#fff'
              width='100%'
              onClick={loginCLicked}

            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: globalcolors.gray,
                marginHorizontal: 10
              }}
            />
            <Text style={styles.feild_title}>Or Login with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: globalcolors.gray,
                marginHorizontal: 10
              }}
            />
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>


            <TouchableOpacity
              onPress={GoogleSigninCLick}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: size.buttonHeight,
                borderWidth: 1,
                borderColor: '#fff',
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

              <Text style={{ color: '#fff' }}>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22
          }}>
            <Text style={{ fontSize: 16, color: '#fff' }}>Don't have an account ? </Text>
            <Pressable
              onPress={() => { navigation.replace('RegisterScreen') }}
            >
              <Text style={{
                fontSize: 16,
                color: 'orange',
                fontWeight: "bold",
                marginLeft: 6
              }}>Create Account</Text>
            </Pressable>
          </View>
        </View>

      </View>
      {
        loading ? <View style={styles.loader}>
          <ActivityIndicator color={"#fff"} size={60} />
        </View> : null
      }
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appConfig.colors.primaryColor },
  feild_title: { fontSize: 16, fontWeight: '600', marginVertical: 8, color: '#fff' },
  loader: { height: height, width: width, backgroundColor: '#000', opacity: 0.4, position: 'absolute', justifyContent: 'center', alignItems: 'center' }
})


