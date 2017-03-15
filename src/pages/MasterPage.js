// layout (top level view)

import React from "react";
import { Link } from "react-router";
import { LoginLink } from "react-stormpath";
import DocumentTitle from "react-document-title";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import getImageIdsFromDropbox
  from "../actions/action_getImageIdsFromDropbox.js";
import storeDropboxUserData from "../actions/action_storeDropboxUserData.js";
import storeStormpathUserData
  from "../actions/action_storeStormpathUserData.js";

import Header from "./Header";

class MasterPage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
  };

  componentDidMount() {
    if (this.props.location.hash) {
      // get data if redirected from Dropbox
      let string = this.props.location.hash;
      let dropboxUserData = string // extract data from Dropbox URL suffix string
        .substring(1)
        .split("&")
        .map(keyValPairString => {
          let keyValPair = {};
          let keyAndValueArr = keyValPairString.split("=");
          keyValPair[keyAndValueArr[0]] = keyAndValueArr[1];
          return keyValPair;
        })
        .reduce((accum, object) => Object.assign(accum, object), {});
      this.props.storeDropboxUserData(dropboxUserData);
      this.props.getImageIdsFromDropbox(dropboxUserData);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.context.authenticated && !this.props.stormpathUserData) {
      this.props.storeStormpathUserData(this.context.user);
    }
  }

  render() {
    return (
      <DocumentTitle title="My React App">
        <div className="MasterPage">
          <Header />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps(state) {
  return {
    stormpathUserData: state.userData.stormpathUserData,
  };
}

function mapDispatchToProps(dispatch) {
  // getImageIdsFromDropbox now accessible off props
  return bindActionCreators(
    {
      getImageIdsFromDropbox: getImageIdsFromDropbox,
      storeDropboxUserData: storeDropboxUserData,
      storeStormpathUserData: storeStormpathUserData,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPage); 


