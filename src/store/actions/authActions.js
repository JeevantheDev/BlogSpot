import { setAlert } from "./alertAction";

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
        dispatch(setAlert("Logged in successfully.", "success"));
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((err) => {
        const errors = err.message;

        if (errors) {
          dispatch(setAlert(errors, "error"));
        }
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
        dispatch(setAlert("Logged in successfully.", "success"));
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((err) => {
        const errors = err.message;

        if (errors) {
          dispatch(setAlert(errors, "error"));
        }
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
        dispatch(setAlert("Logged in successfully.", "success"));
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((err) => {
        const errors = err.message;

        if (errors) {
          dispatch(setAlert(errors, "error"));
        }
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
        dispatch(setAlert("Logged out successfully.", "warning"));
        dispatch({
          type: "SIGNOUT_SUCCESS",
        });
      });
  };
};
