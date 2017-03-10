// navbar

import React from "react";
import { Link } from "react-router";
import {
  LoginLink,
  LogoutLink,
  Authenticated,
  NotAuthenticated,
} from "react-stormpath";

import "../css/Header.css";

export default class Header extends React.Component {
  render() {
    return (
      <div >
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse bottom-gap">
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand" href="/">
            <strong>PicTaggr</strong>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto navbar-right">
              <NotAuthenticated>
                <li>
                  <a className="nav-link" href="/login">Login</a>
                </li>
              </NotAuthenticated>
              <NotAuthenticated>
                <li>
                  <a className="nav-link" href="/register">Create Account</a>
                </li>
              </NotAuthenticated>
              <Authenticated>
                <li>
                  <LogoutLink className="nav-link" />
                </li>
              </Authenticated>
              <Authenticated>
                <li>
                  <a className="nav-link" href="/profile">Profile</a> 
                </li>
              </Authenticated>
              
            </ul>
            
          </div>
        </nav>
      </div>
    );
  }
}
