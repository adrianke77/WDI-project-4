// landing page
import { Link } from 'react-router'
import React, { PropTypes } from 'react'
import {
  LoginLink,
  LogoutLink,
  Authenticated,
  NotAuthenticated
} from 'react-stormpath'
import { LoginPage } from '.'
import { ImageDeck } from '.'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import saveDataToBackend from '../actions/action_saveDataToBackend.js'
import restoreDataFromBackend from '../actions/action_restoreDataFromBackend.js'

import '../css/indexPage.css'

class IndexPage extends React.Component {

  constructor(props){
    super(props)
    this.dropboxClientId='jiejenwhjst84wp'
    this.dropboxRedirectUri= 
      'https://pictaggr.herokuapp.com'
      // 'http://localhost:3000'
  }
  
  componentDidUpdate () {
    // check all images for tagsSaved
    let areAllTagsSaved = this.props.images.reduce(
      (accum, image) => {
        return image.tagSaved === false ? false : accum
      },
      true,
    )
    // save data to backend if conditions correct
    if (!areAllTagsSaved || !this.props.userData.userDataSaved) {
      if (!this.props.userData.isSaving && this.props.userData.stormpathUserData &&
        this.props.userData.dropboxUserData) {
        this.props.saveDataToBackend()
      }
    }
    // restore data from backend if conditions correct
    if (this.props.userData.stormpathUserData && !this.props.userData.triedToRestoreData) { 
        this.props.restoreDataFromBackend() }
  }

  render () {

    const dropboxLoginHref = `https://www.dropbox.com/oauth2/authorize?client_id=${this.dropboxClientId}&response_type=token&redirect_uri=${this.dropboxRedirectUri}`

    return (
      <div>
        {!this.props.userData.dropboxUserData &&
          <div className='container-fluid'>
            <div className='jumbotron text-center'>
              <h1 className='text-center'>PicTaggr: automatic image tagging</h1>
              <h5>
                Use Google Cloud Vision to tag and manage your image collection
              </h5>
            </div>
          </div>}
        <Authenticated>
          <div className='container-fluid'>
            <div className='text-center col-sm-12'>
              {!this.props.userData.dropboxUserData &&
                <div className='fullwidth lead'>
                  Connect to Dropbox to retrieve and tag your images!
                  <br />
                  <br />
                  <a
                    className='btn btn-primary'
                    href={dropboxLoginHref}
                    role='button'
                  >
                    Connect
                  </a>
                </div>}
            </div>
            {this.props.userData.dropboxUserData && <ImageDeck />}
          </div>
        </Authenticated>
        <NotAuthenticated>
          <h5 className='text-center'>
            Please
            <a href='\login'> login </a>
            or
            <a href='\register'> create </a>
            a new account to get started!
          </h5>
        </NotAuthenticated>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    userData: state.userData,
    images: state.images
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      saveDataToBackend: saveDataToBackend,
      restoreDataFromBackend: restoreDataFromBackend
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
// export Redux container, containing React component
