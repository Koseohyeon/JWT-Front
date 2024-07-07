import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { fetchUsers, deleteUser } from '../apis/api';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await fetchUsers();
        setUsers(result);
      } catch (error) {
        Alert.alert('Failed to fetch users');
      }
    };
    loadUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const success = await deleteUser(userId);
      if (success) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        Alert.alert('Failed to delete user');
      }
    } catch (error) {
      Alert.alert('An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>{item.username}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditUser', { user: item })} />
            <Button title="Delete" onPress={() => handleDeleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default UserListScreen;
