import React from 'react';
import {
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UserForm from '../components/UserForm';
import {useUserList} from '../controllers/userList/useUserList';
import {User} from '../types/user';
import Loader from '../components/AppLoader';
import { styles } from './style';

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



export default UserList;
