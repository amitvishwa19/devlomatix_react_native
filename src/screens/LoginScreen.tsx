import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { LogUserDataToFirebaseDdatabase, consolelog } from '../utils/functions';
import auth from '@react-native-firebase/auth';
import { size } from '../utils/size';
import { globalcolors } from '../utils/colors';
import CustomButton from '../components/CustomButton';
import { globalStyles } from '../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


type LoginScreenProp = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;
const LoginScreen = ({ navigation }: LoginScreenProp) => {

  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [clickable, setClickable] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '670445737708-t45u8eiom6589aqv4cqvfiec0vlde7go.apps.googleusercontent.com',
    });
    
  }, [])


  const loginCLicked = async () => {
    try {

      const isUserLoggedin = await auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          consolelog('Logged in Succesfully')
          navigation.replace('MainScreen')
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

  const googleSignin = async () => {
    consolelog('Google Signin')
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const googleUser = await GoogleSignin.getCurrentUser();
      await auth().signInWithCredential(googleCredential);
      const user = auth().currentUser


      console.log('currentUser: '+ user?.photoURL)

      
      //console.log(currentUser?.user)

      //Logging data to database
      await LogUserDataToFirebaseDdatabase(
        user?.uid,
        user?.displayName,
        user?.email,
        user?.photoURL
        ).then(()=>{
          navigation.replace('MainScreen')
        });

    } catch (error) {
      consolelog('Error while google signin :' + error)
    }
  }

  const googleSignout = async()=>{
    try {
      await GoogleSignin.signOut()
    } catch (error) {
      consolelog('Error while logging out from Google : ' + error)
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
              color: globalcolors.black
            }}>
              Hi Welcome Back ! 👋
            </Text>

            <Text style={{
              fontSize: 16,
              color: globalcolors.black
            }}>Hello again you have been missed!</Text>
          </View>


          {/* Email */}
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
                    <Ionicons name="eye" size={24} color={globalcolors.black} />
                  ) : (
                    <Ionicons name="eye-off" size={24} color={globalcolors.black} />
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
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: size.buttonHeight,
                borderWidth: 1,
                borderColor: globalcolors.gray,
                marginRight: 4,
                borderRadius: size.buttonBorderRadius
              }}
            >
              <Image
                source={require("../assets/images/facebook.png")}
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
              onPress={googleSignin}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: size.buttonHeight,
                borderWidth: 1,
                borderColor: globalcolors.gray,
                marginRight: 4,
                borderRadius: size.buttonBorderRadius
              }}
            >
              <Image
                source={require("../assets/images/google.png")}
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
            <Text style={{ fontSize: 16, color: globalcolors.black }}>Don't have an account ? </Text>
            <Pressable
              onPress={() => { navigation.replace('RegisterScreen') }}
            >
              <Text style={{
                fontSize: 16,
                color: globalcolors.primary,
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

export default LoginScreen

const styles = StyleSheet.create({
  root: { flex: 1, padding: 10 },
  feild_title: { fontSize: 16, fontWeight: '600', marginVertical: 8 },
})