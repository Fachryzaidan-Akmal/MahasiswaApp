import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import InputField from '../components/InputField';

const HomeScreen = () => {
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');

  const handleSubmit = () => {
    if (!nama || !nim || !prodi) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    Alert.alert('Data Mahasiswa', `Nama: ${nama}\nNIM: ${nim}\nProdi: ${prodi}`);
  };

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Form Mahasiswa</Text>

      <InputField label="Nama" value={nama} onChangeText={setNama} />
      <InputField label="NIM" value={nim} onChangeText={setNim} />
      <InputField label="Prodi" value={prodi} onChangeText={setProdi} />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default HomeScreen;
