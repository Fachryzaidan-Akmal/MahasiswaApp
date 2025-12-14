import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { addMahasiswa } from './mahasiswaService';

export default function AddMahasiswaScreen({ navigation }) {
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!nama || !nim || !prodi) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    try {
      setLoading(true);

      await addMahasiswa({
        nama,
        nim,
        prodi,
      });

      Alert.alert('Sukses', 'Data mahasiswa berhasil ditambahkan');

      setNama('');
      setNim('');
      setProdi('');

      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nama Mahasiswa</Text>
      <TextInput
        value={nama}
        onChangeText={setNama}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>NIM</Text>
      <TextInput
        value={nim}
        onChangeText={setNim}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Program Studi</Text>
      <TextInput
        value={prodi}
        onChangeText={setProdi}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />

      <Button
        title={loading ? 'Menyimpan...' : 'Simpan'}
        onPress={submit}
        disabled={loading}
      />
    </View>
  );
}