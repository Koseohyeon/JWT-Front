import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updateUser } from '../apis/api';

const EditUserScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');

  const handleEditUser = async () => {
    try {
      const success = await updateUser(user.id, username, password);
      if (success) {
        Alert.alert('User updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Failed to update user');
      }
    } catch (error) {
      Alert.alert('An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Save" onPress={handleEditUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditUserScreen;
