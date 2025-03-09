import { COLORS } from '../theme/colors';
import {normalize, respFontSize, responsiveWidth} from '../utils/responsive';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: normalize(16),
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'center',
    },
    list: {
      paddingBottom: normalize(28),
    },
    userCard: {
      backgroundColor: 'white',
      borderRadius: normalize(8),
      padding: normalize(16),
      marginBottom: normalize(12),
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: normalize(4),
    },
    userInfo: {
      marginBottom: normalize(10),
    },
    name: {
      fontSize: respFontSize(18),
      fontWeight: 'bold',
      marginBottom: normalize(4),
    },
    email: {
      fontSize: respFontSize(14),
      color: '#666',
      marginBottom: normalize(4),
    },
    phone: {
      fontSize: respFontSize(14),
      color: '#666',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap:normalize(10),
    },
    editButton: {
      backgroundColor: COLORS.success,
      padding: normalize(8),
      paddingHorizontal:normalize(18),
      borderRadius: normalize(8),
    },
    deleteButton: {
      backgroundColor: COLORS.red,
      padding: normalize(8),
      paddingHorizontal:normalize(12),
      borderRadius: normalize(8),
    },
    addButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: normalize(16),
      borderRadius: normalize(10),
      alignItems: 'center',
      position:"absolute",
      bottom:1,
      width:"100%",
      zIndex:100,
      alignSelf:"center"
    },
    buttonText: {
      color: 'white',
      fontSize: respFontSize(14),
    },
    error: {
      color: '#f44336',
      fontSize: respFontSize(16),
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: normalize(16),
      paddingHorizontal: normalize(8),
    },
    pageButton: {
      backgroundColor: '#2196F3',
      padding: normalize(8),
      borderRadius: normalize(4),
      minWidth: responsiveWidth(80),
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#BDBDBD',
    },
    pageButtonText: {
      color: 'white',
      fontSize: respFontSize(14),
    },
    pageInfo: {
      fontSize: respFontSize(14),
      color: '#666',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: normalize(20),
    },
    emptyText: {
      fontSize: respFontSize(16),
      color: '#888',
    },
  });