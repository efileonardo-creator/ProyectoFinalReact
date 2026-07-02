import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Comentarios.
const firebaseConfig = {
apiKey: "AISyCelxxNBGFzW9Rb4yCdLjBMs2MDMVaXyalYU",
authDomain: "react-c9743.firebaseapp.com",
projectId: "react-c9743",
storageBucket: "react-c9743.firebasestorage.app",
messagingSenderId: "933655766258",
appId: "1:933655766258:web:e18886a2cfeb7de0913ca7",
measurementId: "G-9PRRX78S4R"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// Si agregaste Analytics verás esto además.
export const analytics = getAnalytics(app);
