import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCHk4UGPFiBZBeDeAdpD41U1wxDivgfzCI",
  authDomain: "whatsapp-clone-59b28.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-59b28.firebaseio.com",
  projectId: "whatsapp-clone-59b28",
  storageBucket: "whatsapp-clone-59b28.appspot.com",
  messagingSenderId: "515398030758",
  appId: "1:515398030758:web:16f6d3b6b50f8722d02b67",
  measurementId: "G-LC16YFDQF5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
