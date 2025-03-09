import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {userService} from '../../services/api';
import {User, UserFormData, UserState} from '../../types/user';
import { Alert } from 'react-native';

const initialState: UserState = {
  users: [],
  loading: false,
  loadingText: undefined,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, {rejectWithValue}) => {
    try {
    const response = await userService.getUsers();
    return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  },
);

export const createUser = createAsyncThunk<User, UserFormData>(
  'users/createUser',
  async (userData: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
     const response = await userService.createUser(userData);
     return response;

    } catch (error) {
      Alert.alert('Error', 'Failed to create user');
      return rejectWithValue('Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  { id: number; userData: Partial<UserFormData> }
>(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
     const response = await userService.updateUser(id, userData);
     return response;

    } catch (error) {
      return rejectWithValue('Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, {  rejectWithValue }) => {
    try {
    const response =   await userService.deleteUser(id);
    return response;
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
      return rejectWithValue('Failed to delete user');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{loading: boolean; text?: string}>,
    ) => {
      state.loading = action.payload.loading;
      state.loadingText = action.payload.text;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      .addCase(createUser.pending, state => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(createUser.fulfilled, (state, action) => {
        console.log("User created", action);
        state.loading = false;
        if (!action.payload) {
          return;
        }
        state.users = [...state.users, action.payload]; // Append new user to the end
        state.error = null;
      })

      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user,
        );
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.meta.arg);
      });
      

  },
});

export const {setLoading, setCurrentPage} = userSlice.actions;
export default userSlice.reducer;
