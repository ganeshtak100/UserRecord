import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  deleteUser,
  fetchUsers,
  setCurrentPage,
  setLoading,
} from '../../store/slices/userSlice';
import {User} from '../../types/user';
import {Alert} from 'react-native';

interface UseUserListReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  modalVisible: boolean;
  selectedUser: User | null;
  handlePageChange: (newPage: number) => void;
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
  handleAdd: () => void;
  handleCloseModal: () => void;
}

export const useUserList = (): UseUserListReturn => {
  const dispatch = useAppDispatch();
  const {users, loading, error, currentPage, itemsPerPage} = useAppSelector(
    state => state.users,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchUsers());
    setRefreshing(false);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // const paginatedUsers = users.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage,
  // );

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleEdit = (user: User) => {
    setIsNewUser(false);
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          dispatch(deleteUser(id));
        },
      },
    ]);
    dispatch(setLoading({loading: false}));
  };

  const handleAdd = () => {
    setIsNewUser(true);
    setSelectedUser(null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return {
    users: users,
    loading,
    error,
    currentPage,
    totalPages,
    modalVisible,
    selectedUser,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleAdd,
    handleCloseModal,
    onRefresh,
    refreshing,
    isNewUser,
  };
};
