import { FirebaseDB } from './firebase';

const COL = 'mahasiswa';

export const addMahasiswa = async (data) => {
  return FirebaseDB.collection(COL).add({
    ...data,
    createdAt: FirebaseDB.FieldValue
      ? FirebaseDB.FieldValue.serverTimestamp()
      : new Date(),
  });
};

export const listenMahasiswa = (callback) => {
  return FirebaseDB
    .collection(COL)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (querySnapshot) => callback(querySnapshot),
      (error) => console.log('Firestore error:', error)
    );
};
