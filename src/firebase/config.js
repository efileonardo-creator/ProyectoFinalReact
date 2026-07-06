import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Comentarios.
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS9JkJj6EWvc4ydOM1lSVtTr-4xqxjnD4",
  authDomain: "proyecto-final-react-2026.firebaseapp.com",
  projectId: "proyecto-final-react-2026",
  storageBucket: "proyecto-final-react-2026.firebasestorage.app",
  messagingSenderId: "50113136031",
  appId: "1:50113136031:web:b7c6653e7c14aad989e9aa"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

