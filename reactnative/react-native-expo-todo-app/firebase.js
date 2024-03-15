// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs0tm3BpA2h9gS4meMQJh_6pbOGQ3pCm8",
  authDomain: "react-native-basic-expo-app.firebaseapp.com",
  projectId: "react-native-basic-expo-app",
  storageBucket: "react-native-basic-expo-app.appspot.com",
  messagingSenderId: "1078179037851",
  appId: "1:1078179037851:web:677a6aaa59b84645763c3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;