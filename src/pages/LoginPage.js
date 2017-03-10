// login form display

import React from "react";
import DocumentTitle from "react-document-title";
import { LoginForm } from "react-stormpath";

export default class LoginPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`Login`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Login</h3>
              <hr />
            </div>
          </div>
          <LoginForm>
            <div className="sp-login-form">
              <div className="row">
                <div className="col-12">
                  <div className="form-horizontal">
                    <div className="form-group">
                      <label
                        htmlFor="spEmail"
                        className="col-xs-12 col-sm-6 control-label"
                      >
                        Email
                      </label>
                      <div className="col-12 col-sm-6">
                        <input
                          className="form-control"
                          id="spUsername"
                          name="username"
                          placeholder="Username or Email"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="spPassword"
                        className="col-12 col-sm-6 control-label"
                      >
                        Password
                      </label>
                      <div className="col-12 col-sm-6">
                        <input
                          type="password"
                          className="form-control"
                          id="spPassword"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-6">
                        <p className="alert alert-danger" spIf="form.error">
                          <span spBind="form.errorMessage" />
                        </p>
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LoginForm>
        </div>
      </DocumentTitle>
    );
  }
}
