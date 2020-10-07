import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  alert: alertReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
