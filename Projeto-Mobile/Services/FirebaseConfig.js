import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FirebaseConfig = {
  apiKey: "AIzaSyBhiv2QVPWsapjhYam2_KFMCwLJ9lXzDuY",
  authDomain: "projetofinal2026-58944.firebaseapp.com",
  projectId: "projetofinal2026-58944",
  storageBucket: "projetofinal2026-58944.firebasestorage.app",
  messagingSenderId: "479937483345",
  appId: "1:479937483345:web:363f508ad65b09c2085e70"
};

const app = initializeApp(FirebaseConfig);
const database = getFirestore(app);

export { database as db };
export default app;
