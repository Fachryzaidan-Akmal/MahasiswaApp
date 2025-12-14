import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { AuthContext } from './auth';
import { listenMahasiswa } from './mahasiswaService';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = listenMahasiswa((snap) => {
    if (!snap) {
      setData([]);
      return;
    }

    const arr = [];
    snap.forEach(d => {
      arr.push({ id: d.id, ...d.data() });
    });

    setData(arr);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>
        Logged in as {user?.email ?? '-'}
      </Text>

      <Button title="Logout" onPress={logout} />
      <View style={{ height: 10 }} />

      <Button
        title="Tambah Mahasiswa"
        onPress={() => navigation.navigate('AddMahasiswa')}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.nama} - {item.nim}</Text>
            <Text>{item.prodi}</Text>
          </View>
        )}
      />
    </View>
  );
}
