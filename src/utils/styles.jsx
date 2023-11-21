import { StyleSheet, Dimensions } from 'react-native'
import { appcolors } from './constants';


const { height, width } = Dimensions.get('window');


export const globalStyles = StyleSheet.create({
    root:{flex:1,backgroundColor:'#1C2833',padding:10}, //depritiated


    page_container:{flex:1,backgroundColor:appcolors.primaryColor,padding:10},
    main_screen_container:{},
    page_content:{height:'100%',width:'100%'},




    background_image_container:{flex:1, padding:10},
    background_image_container_image:{opacity: 0.1},









    container: { justifyContent: 'center', flex: 1 },
    container_center: { justifyContent: 'center', flex: 1, alignItems: 'center' },
    BoldTitle: { fontSize: 40, fontWeight: 800 },
    
    error_info_view:{padding:5,marginBottom:10},
    error_message: { fontWeight: '400', fontSize: 12, color: '#fff', opacity: 0.8 },

    // page_Bacground_container:{flex: 1, justifyContent: 'center', backgroundColor:'black', alignItems: 'center'},
    // page_background_container_image:{ opacity: 0.4, backgroundColor: colors.black}
})

