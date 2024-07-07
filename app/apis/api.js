import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config';

export const signUp = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Signup failed:', errorData);
      throw new Error('Signup failed');
    }

    return true;
  } catch (error) {
    console.error('Error during signup:', error);
    return false;
  }
};

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();
  if (response.ok) {
    return result.token;
  }
  throw new Error('Login failed');
};

//users
const getAuthHeader = async () => {
    const token = await AsyncStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };
  
  export const fetchUsers = async () => {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_BASE_URL}/api/users`, { headers });
    const result = await response.json();
    if (response.ok) {
      return result;
    }
    throw new Error('Failed to fetch users');
  };
  
  export const updateUser = async (id, username, password) => {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ username, password }),
    });
    return response.ok;
  };
  
  export const deleteUser = async (id) => {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.ok;
  };
