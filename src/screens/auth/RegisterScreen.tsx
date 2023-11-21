import { ActivityIndicator, Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { globalcolors } from '../../utils/colors';
import { strings } from '../../utils/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';
import { LogUserDataToFirebase, LogUserDataToFirebaseDdatabase, consolelog } from '../../utils/functions';
import PageBackground from '../../components/PageBackground';
import { appConfig } from '../../utils/config';
import Toast from 'react-native-simple-toast';


const { height: height, width: width } = Dimensions.get('window');
type RegisterScreenProp = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;
const RegisterScreen = ({ navigation }: RegisterScreenProp) => {


  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)


  const registerClick = async () => {
    const deviceToken = await messaging().getToken()
    try {

      if(email != '' && password != '' && confirmPassword != ''){

        if(password == confirmPassword){
          setLoading(true)
          await auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = auth().currentUser;
    
            const userData = {
              uid: user?.uid,
              name: user?.displayName,
              email: user?.email,
              emailVerified: false,
              avatar: user?.photoURL,
              dnd: false,
              loggedIn: false,
              deviceToken:deviceToken
            }
    
            LogUserDataToFirebase(userData)
              .then(() => {
                //AsyncStorage.setItem('user', JSON.stringify(userData))
                setLoading(false)
                auth().signOut().then(() => {
                  Toast.show('Account created successfully', 5000)
                  navigation.replace('LoginScreen')
                })
              }).catch((e) => {
                setLoading(false);
                Toast.show('Oops something went wrong, please try again later', 5000)
              })
    
    
            
          })
        }else{
          Toast.show('Password and Confirmpassword not same, please check and try again', 5000)
        }

      }else{
        Toast.show('Please enter valid email and password',5000)
      }

      
    } catch (error) {
      consolelog('Error while registring user : ' + error)
    }
  }


  return (
    <SafeAreaView style={styles.root}>
      <View style={{padding:10}}>
        <PageBackground />
        <ScrollView showsVerticalScrollIndicator={false}>

          <View >

            {/* Title area */}
            <View style={{ marginVertical: 22 }}>
              <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 12,
                color: '#fff'
              }}>
                Create Account
              </Text>

              <Text style={{
                fontSize: 16,
                color: '#fff'
              }}>Let's Create your account with {strings.appName}</Text>
            </View>

            {/* Email Address */}
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
                  secureTextEntry={isPasswordShown}
                  value={password}
                  onChangeText={txt => setPassword(txt)}
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

            {/*Confirm Password */}
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.feild_title}>Confirm Password</Text>

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
                  placeholder='Confirm your password'
                  placeholderTextColor='#fff'
                  secureTextEntry={isPasswordShown}
                  value={confirmPassword}
                  onChangeText={txt => setconfirmPassword(txt)}
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
            <View>
              <Text style={globalStyles.error_message}>{message}</Text>
            </View>

            {/* Register button */}
            <View style={{ marginTop: 20 }}>
              <CustomButton
                title='Create Account'
                backgroundColor={appConfig.colors.primaryColor}
                color='#fff'
                borderColor='#fff'
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
              <Text style={{ fontSize: 16, color: '#fff' }}>Already have an account</Text>
              <Pressable
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text style={{
                  fontSize: 16,
                  color: 'orange',
                  fontWeight: "bold",
                  marginLeft: 6
                }}>Login</Text>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </View>
      {
        loading ? <View style={styles.loader}>
          <ActivityIndicator color={"#fff"} size={60} />
        </View> : null
      }
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appConfig.colors.primaryColor },
  feild_title: { fontSize: 16, fontWeight: '600', marginVertical: 8, color: '#fff' },
  loader: { height: height, width: width, backgroundColor: '#000', opacity: 0.4, position: 'absolute', justifyContent: 'center', alignItems: 'center' }
})