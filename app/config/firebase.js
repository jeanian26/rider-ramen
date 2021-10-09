/* eslint-disable prettier/prettier */
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCwmNKMu__Q_m6g7FcM8Y1dhibgerSnZFI',
  authDomain: 'ramen-nado-86f76.firebaseapp.com',
  projectId: 'ramen-nado-86f76',
  storageBucket: 'ramen-nado-86f76.appspot.com',
  messagingSenderId: '475279679552',
  appId: '1:475279679552:web:97cef742b499f14b973fa5',
};
const app = initializeApp(firebaseConfig);
console.log(app);
