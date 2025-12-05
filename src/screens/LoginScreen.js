import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../firebase';
import { storage } from '../storage';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      
      // simpan UID ke MMKV
      storage.set('uid', result.user.uid);

      onLogin(); // pindah ke Home
    } catch (error) {
      Alert.alert("Login gagal", error.message);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text>Email</Text>
      <TextInput style={{ borderWidth:1, padding:10 }} value={email} onChangeText={setEmail} />

      <Text style={{ marginTop:15 }}>Password</Text>
      <TextInput style={{ borderWidth:1, padding:10 }} value={password} secureTextEntry onChangeText={setPassword} />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;