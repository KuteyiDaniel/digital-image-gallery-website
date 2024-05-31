// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwDrij4_HC42SCoWBh9TVJJ31bm__F9Ts",
  authDomain: "image-gallery-9bcf9.firebaseapp.com",
  projectId: "image-gallery-9bcf9",
  storageBucket: "image-gallery-9bcf9.appspot.com",
  messagingSenderId: "858485264592",
  appId: "1:858485264592:web:6fbe7536a8adc91c814ed5",
  measurementId: "G-PHF40BWTHF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth };
