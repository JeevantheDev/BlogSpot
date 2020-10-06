export const signUpLoginGoogle = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          name: resp.user.displayName,
          email: resp.user.email,
          avatar: resp.user.photoURL,
        });
      })
      .then(() => {
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SIGNUP_ERROR",
          err,
        });
      });
  };
};
export const signUpLoginFacebook = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          name: resp.user.displayName,
          email: resp.user.email,
          avatar: resp.user.photoURL,
        });
      })
      .then(() => {
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SIGNUP_ERROR",
          err,
        });
      });
  };
};
export const signUpLoginGithub = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const provider = new firebase.auth.GithubAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          name: resp.user.displayName,
          email: resp.user.email,
          avatar: resp.user.photoURL,
        });
      })
      .then(() => {
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SIGNUP_ERROR",
          err,
        });
      });
  };
};
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGNOUT_SUCCESS",
        });
      });
  };
};
