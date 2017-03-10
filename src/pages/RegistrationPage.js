// registration form

import React from "react";
import DocumentTitle from "react-document-title";
import {
  RegistrationForm,
  LoginLink,
  LogoutLink,
  Authenticated,
  NotAuthenticated,
} from "react-stormpath";

export default class RegistrationPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`Registration`}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h3>Registration</h3>
              <hr />
            </div>
          </div>
          <RegistrationForm className="col-12">
              <p className="form-group">
                <label htmlFor="firstName">First name</label><br />
                <input id="firstName" type="text" name="givenName" />

              </p>
              <p className="form-group">
                <label htmlFor="lastName">Last name</label><br />
                <input id="lastName" type="text" name="surname" />

              </p>
              <p className="form-group">
                <label htmlFor="email">Email</label><br />
                <input id="email" type="text" name="email" />

              </p>
              <p className="form-group">
                <label htmlFor="password">Password</label><br />
                <input id="password" type="password" name="password" />

              </p>
              <p spIf="form.error" className="form-group">
                <strong>Error:</strong><br />
                <span spBind="form.errorMessage" />

              </p>
              <p>
                <input type="submit" value="Register" />

              </p>
          </RegistrationForm>
        </div>
      </DocumentTitle>
    );
  }
}
