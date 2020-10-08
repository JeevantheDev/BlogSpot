import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "****",
  authDomain: "****",
  databaseURL: "*****",
  projectId: "****",
  storageBucket: "****",
  messagingSenderId: "****",
  appId: "1:****:web:****",
  measurementId: "****",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// export const auth = firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
