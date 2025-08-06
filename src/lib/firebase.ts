import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-t1OHE4M8zZ8A6dPQrXHEpY-yed99b_c",
  authDomain: "myfitflow.firebaseapp.com",
  projectId: "myfitflow",
  storageBucket: "myfitflow.firebasestorage.app",
  messagingSenderId: "455885025808",
  appId: "1:455885025808:web:69ec33b2d15410aca6d095"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
