import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

import rootReducer from "./store/reducers/rootReducer";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true,
    }),
    reduxFirestore(fbConfig)
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
});

serviceWorker.register();
