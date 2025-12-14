import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { AuthContext } from './auth';

export default function LoginScreen() {
  const { login, register } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = async () => {
    try {
      await login(email, pass);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    }
  };

  const doRegister = async () => {
    try {
      await register(email, pass);
    } catch (e) {
      Alert.alert('Register Error', e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Password:</Text>
      <TextInput
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Login" onPress={doLogin} />
      <View style={{ height: 10 }} />
      <Button title="Register" onPress={doRegister} />
    </View>
  );
}