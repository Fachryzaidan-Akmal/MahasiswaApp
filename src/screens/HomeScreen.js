import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { firestore } from '../firebase';

const HomeScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('mahasiswa')
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      });

    return () => subscriber();
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Data Mahasiswa</Text>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 10
            }}>
            <Text>Nama: {item.nama}</Text>
            <Text>NIM: {item.nim}</Text>
            <Text>Prodi: {item.prodi}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;