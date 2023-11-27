import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import PageBackground from '../../components/PageBackground'
import { globalStyles } from '../../utils/styles'
import { useNavigation } from '@react-navigation/native';
import Services from '../../components/Services';
import Appbar from '../../components/Appbar';
import SearchBox from '../../components/SearchBox';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Features from '../../components/Features';
//import BottomSheet, { BottomSheetRefProps } from '../components/BottomSheetBackup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
// import BottomSheet from '@gorhom/bottom-sheet';

type props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const HomeScreen = ({navigation}:props) => {
  //sconst navigation = useNavigation()
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress=()=>{
    const isActive = ref.current?.isActive()
    if(isActive){
      ref.current?.scrollTo(0)
    }else{
      ref.current?.scrollTo(-250)
    }
    
  }


  return (
    <View style={[globalStyles.page_container]}  >
      <PageBackground />


      <View style={[globalStyles.page_content]}>

        <Appbar navigation={navigation} />
        <SearchBox />
        <Services  navigation={navigation}/>
        <Features  navigation={navigation} />
       
        <TouchableOpacity onPress={onPress}  style={{width:100,backgroundColor:'#fff',alignItems:'center'}}>
          <Text>BS</Text>
        </TouchableOpacity>

        <BottomSheet ref={ref}>
          <View>
            <Text>Wola</Text>
          </View>
        </BottomSheet>

       


      
      </View>



    </View>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  testBottomSheet:{
    height:100,
    width:'100%',
    backgroundColor:'#fff',
    position:'absolute',
    bottom:10,
    borderRadius:10
  }
})