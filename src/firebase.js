import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDwDrij4_HC42SCoWBh9TVJJ31bm__F9Ts",
  authDomain: "image-gallery-9bcf9.firebaseapp.com",
  projectId: "image-gallery-9bcf9",
  storageBucket: "image-gallery-9bcf9.appspot.com",
  messagingSenderId: "858485264592",
  appId: "1:858485264592:web:6fbe7536a8adc91c814ed5",
  measurementId: "G-PHF40BWTHF",
  databaseURL: "https://image-gallery-9bcf9-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export const signInUser = async (email, password) => {
  let userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export const createUser = async (email, password) => {
  let userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export const signOutUser = async () => {
  await signOut(auth);
}

const getUsers = async () => {
  const dbRef = ref(getDatabase(app));
  let snapshot = await get(child(dbRef, `/users`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return []
}

export { app, auth, database };
