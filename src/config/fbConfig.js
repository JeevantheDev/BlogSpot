import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB8XaSJK2IQmD_PEDyoFKHcoxjUDxVvAl8",
  authDomain: "jeevandev-my-plan.firebaseapp.com",
  databaseURL: "https://jeevandev-my-plan.firebaseio.com",
  projectId: "jeevandev-my-plan",
  storageBucket: "jeevandev-my-plan.appspot.com",
  messagingSenderId: "429317595342",
  appId: "1:429317595342:web:a043c6d33918a9f748b09f",
  measurementId: "G-H2BQXMPKDS",
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
