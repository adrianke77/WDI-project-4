// top level - stormpath, redux and react-router wrappers around actual app

// stormpath
import ReactStormpath, {
  Router,
  HomeRoute, // route redirected to when logged out
  LoginRoute,
  AuthenticatedRoute,
} from "react-stormpath";

// react
// note router is handled by stormpath api
import React from "react";
import ReactDOM from "react-dom";
import { IndexRoute, Route, browserHistory } from "react-router";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";

// pages
import {
  MasterPage,
  IndexPage,
  LoginPage,
  RegistrationPage,
  ProfilePage,
  ImageDeck,
} from "./pages";

// redux-thunk
import thunk from "redux-thunk";

// start Stormpath auth
ReactStormpath.init();

let preLoadedState = {
  // sets up initial global state object
  userData: {
    dropboxUserData: null, // from dropbox login, for carrying out search/downloads
    stormpathUserData: null, // from stormpath, email used as a UID in backend
    userDataSaved: true,
    isSaving:false,
    triedToRestoreData:false
  },
  images: [],
  visibilityFilter: {string:''}, // show images on screen according to if tags contain this string
};

// redux wrapper(<Provider>, then stormpath(<Router/>), then react-router stuff

ReactDOM.render(
  <Provider
    store={createStore(reducers, preLoadedState, applyMiddleware(thunk))}
  >
    <Router history={browserHistory}>
      <HomeRoute path="/" component={MasterPage}>
        <IndexRoute component={IndexPage} />
        <LoginRoute path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/profile" component={ProfilePage} />
        <AuthenticatedRoute>
          <HomeRoute path="/" component={IndexPage} />
        </AuthenticatedRoute>
        <Route path="/images" component={ImageDeck} />
      </HomeRoute>
    </Router>
  </Provider>,
  document.querySelector("#app-container"),
);
