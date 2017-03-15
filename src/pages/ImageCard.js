// a card that shows both the image and the tags for one imagefile

import React from 'react'
import DocumentTitle from 'react-document-title'
import { LoginForm } from 'react-stormpath'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getBlobFromDropbox from '../actions/action_getBlobFromDropbox.js'
import getTagsFromGoogleVision
  from '../actions/action_getTagsFromGoogleVision.js'
import updateTag from '../actions/action_updateTag.js'

import '../css/imageCard.css'

class ImageCard extends React.Component {

  componentDidUpdate (prevProps, prevState) {
    console.log(this.props.image.blob,this.props.userData.dropboxUserData)
    if (!this.props.image.blob && this.props.userData.dropboxUserData) {
      this.props.getBlobFromDropbox(this.props.id)
    }

    if (
      this.props.image.tags.length === 0 &&
      this.props.image.blobAvailable === true &&
      this.props.image.fetchingTags === false
    ) {
      this.props.getTagsFromGoogleVision(this.props.id)
    }
  }

  render () {
    return (
      <div className='card imagecard' key={this.props.id}>
        <div className='card-img-top'>
          {this.makeImage()}
        </div>
        <div className='card-text'>
          {this.makeTags()}
        </div>
      </div>
    )
  }

  makeImage () {
    if (this.props.image.blob) {
      return (
        <div>
          <img
            src={window.URL.createObjectURL(this.props.image.blob)}
            width='150px'
          />
        </div>
      )
    } else {
      return (
        <div>
          <img
            src='https://cdnjs.cloudflare.com/ajax/libs/timelinejs/2.25/css/loading.gif'
            width='50px'
          />
        </div>
      )
    }
  }

  makeTags () {
    if (this.props.image.tags.length === 0) {
      return (
        <div>
          <div>
            <img
              src='https://cdnjs.cloudflare.com/ajax/libs/timelinejs/2.25/css/loading.gif'
              width='50px'
            />
          </div>
        </div>
      )
    } else {
      let tags = this.props.image.tags.map((tagObject, tagIndex) => {
        let tag = ''
        let percentage =
          typeof tagObject.score === 'number'
          ? Math.floor(tagObject.score * 100) + '% certainty'
          : tagObject.score
        tag = tagObject.description
        let filterString = this.props.visibilityFilter.string
        let tagColor =
          filterString !== '' && tag.includes(filterString)
          ? 'greenhighlight'
          : ''
        if (filterString === tag) tagColor = 'bluehighlight'
        return (
          <div key={tagIndex}>
            <input
              className={'text-center tagfield ' + tagColor}
              type='text'
              value={tag}
              onChange={e =>
                this.props.updateTag(
                  e.target.value,
                  this.props.image.id,
                  tagIndex,
                )}
            />
            <div className='certainty'>{percentage}</div>
          </div>
        )
      })
      return <div> {tags} </div>
    }
  }
}

function mapStateToProps (state, ownProps) {
  let image = state.images.find(imageObject => imageObject.id === ownProps.id)
  return {
    image: image,
    visibilityFilter: state.visibilityFilter,
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      getBlobFromDropbox: getBlobFromDropbox,
      getTagsFromGoogleVision: getTagsFromGoogleVision,
      updateTag: updateTag
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard) // export Redux container, containing React component
