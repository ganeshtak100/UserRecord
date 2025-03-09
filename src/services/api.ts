import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../constants/config';
import { User } from '../types/user';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
const handleError = (error: any) => {
  if (error.response?.status === 404) {
    Promise.reject('User not found', 404);
  }
  if (error.response?.status === 400) {
    Promise.reject('Bad request', 400);
  }
  if (error.response?.status === 500) {
    Promise.reject('Internal server error', 500);
  }
  Promise.reject(error);
}
export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new ApiError(
        'Failed to fetch users',
        (error as AxiosError).response?.status,
      );
    }
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.log("update user api response error", error);
      if (error.response?.status === 404) {
        Promise.reject('User not found', 404);
      }
      if (error.response?.status === 400) {
        Promise.reject('Bad request', 400);
      }
      if (error.response?.status === 500) {
        Promise.reject('Internal server error', 500);
      }
      Promise.reject(error);
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      handleError(error);
    }
  },
};


const onRequestFullFilled = async (request: any) => {
  console.log(
    '%c Starting api Request',
    'background: #33AAFF; color: #FFF',
    request,
  );
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    Alert.alert('No internet connection. Please check your network connection');
    return Promise.reject({ message: 'No internet connection. Please check your network connection' });
  }

  return request;
};

const onRequestRejected = (error: any) => {
  return Promise.reject(error);
};

api.interceptors.request.use(onRequestFullFilled, onRequestRejected);
api.interceptors.response.use(
  response => {
    console.log(
      '%c Response success:',
      'background: #009944; color: #FFF',
      response,
    );
    return Promise.resolve(response);
  },
  error => {
    console.log('%c Response:', 'background: #DD0000; color: #FFF', error);
    switch (response.status) {
      case 401:
        return Promise.reject('Unauthorized');
      case 403:
        return Promise.reject('Forbidden');
      case 404:
        return Promise.reject('Not Found');
      case 500:
        return Promise.reject('Internal Server Error');
      default:
        return Promise.reject(error?.response?.data || 'An Error occurred');
    }
    // return Promise.reject(error?.response?.data || 'An Error occurred');
  },
);