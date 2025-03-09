import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UserForm from '../components/UserForm';
import {normalize, respFontSize, responsiveWidth} from '../utils/responsive';
import {useUserList} from '../controllers/userList/useUserList';
import {User} from '../types/user';
import { COLORS } from '../theme/colors';
import Loader from '../components/AppLoader';

const UserList = () => {
  const {
    users,
    loading,
    currentPage,
    totalPages,
    modalVisible,
    selectedUser,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleAdd,
    handleCloseModal,
    refreshing,
    onRefresh,
    isNewUser,
  } = useUserList();


  // if (loading && !refreshing) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }


  const renderItem = ({item}: {item: User}) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      {!loading && <Text style={styles.emptyText}>No users found.</Text>}
    </View>
  );
  const loadMoreUsers = () => {
    if (currentPage < totalPages && !loading) {
      handlePageChange(currentPage + 1);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>

      <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        // onEndReached={loadMoreUsers} // Load more data when reaching the bottom
        // onEndReachedThreshold={0.1} // Trigger load when halfway to the end
        // ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
        ListEmptyComponent={renderEmptyList} 
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}>
        <UserForm user={selectedUser} isNewUser={isNewUser} onClose={handleCloseModal} />
      </Modal>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
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
    // marginBottom: normalize(16),
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

export default UserList;
