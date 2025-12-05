import React from 'react';
import { View, Text, TextInput } from 'react-native';

const InputField = ({ label, value, onChangeText }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          borderWidth: 1,
          borderColor: '#aaa',
          borderRadius: 8,
          padding: 10,
        }}
        placeholder={`Masukkan ${label}`}
      />
    </View>
  );
};

export default InputField;
