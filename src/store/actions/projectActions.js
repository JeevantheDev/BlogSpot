import { setAlert } from "./alertAction";

export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Make async call to db
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorName: profile.name,
        authorImage: profile.avatar,
        authorId: authorId,
        ratings: [],
        createAt: new Date(),
      })
      .then(() => {
        dispatch(setAlert("Blog Created Successfully.", "success"));
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};
export const uploadImage = (image) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Make async call to db
    const firebase = getFirebase();
    const storage = firebase.storage();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    let progress;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            dispatch(setAlert("Image Uploaded Successfully.", "info"));
            dispatch({ type: "UPLOAD_IMAGE", url });
            dispatch({ type: "STATE_PROGRESS", progress });
          })
          .catch((err) => {
            dispatch({ type: "UPLOAD_IMAGE_ERROR", err });
          });
      }
    );
  };
};
export const updateProject = (project, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Make async call to db
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(id)
      .set({
        ...project,
        createAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "UPDATE_PROJECT", project });
        dispatch(setAlert("Blog Updated Successfully.", "info"));
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_PROJECT_ERROR", err });
      });
  };
};
export const deleteProject = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Make async call to db
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(id)
      .delete()
      .then(() => {
        dispatch(setAlert("Your Blog Deleted.", "warning"));
        dispatch({ type: "DELETE_PROJECT" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};
