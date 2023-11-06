import { StyleSheet } from 'react-native'
import { colors } from '../../utils/colors'

const globalStyles = StyleSheet.create({
    container: { justifyContent: 'center', flex: 1 },
    container_center: { justifyContent: 'center', flex: 1, alignItems: 'center' },
    BoldTitle: { fontSize: 40, fontWeight: 800 },
    error_message: { fontWeight: '600', fontSize: 16, color: 'red', opacity: 0.8 },
    error_info_view:{},


    // page_Bacground_container:{flex: 1, justifyContent: 'center', backgroundColor:'black', alignItems: 'center'},
    // page_background_container_image:{ opacity: 0.4, backgroundColor: colors.black}
})

export default globalStyles