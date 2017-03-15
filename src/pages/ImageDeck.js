import React from 'react'
import Masonry from 'react-masonry-component'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import updateFilterString from '../actions/action_updateFilterString.js'

import ImageCard from './imageCard'
import getImageIdsFromDropbox
  from '../actions/action_getImageIdsFromDropbox.js'

import '../css/ImageDeck.css'

class ImageDeck extends React.Component {
  render () {
    let visibleImages =
      this.props.visibilityFilter.string === ''
      ? this.props.imagesData
      : this.getVisibleImages()
    const imageDeckItems = visibleImages.map((imageData, index) => {
      return <ImageCard key={imageData.id} id={imageData.id} />
    })
    return (
      <div className='text-center'>
        <h3 className='col-12 text-center'>Your PicDeck</h3>
        <input
          className='text-center searchfield col-12 col-sm-6'
          type='text'
          placeholder='Type here to search by tags'
          value={this.props.visibilityFilter.String}
          onChange={e => this.props.updateFilterString(e.target.value)}
        />
        <button onClick={this.props.getImageIdsFromDropbox}>Sync Pics with Dropbox</button>
        <br />
        <Masonry className='image-deck'>
          {imageDeckItems}
        </Masonry>
      </div>
    )
  }

  getVisibleImages () {
    let filterString = this.props.visibilityFilter.string
    let allImages = this.props.imagesData
    return allImages.filter(image => {
      let tags = image.tags.map(image => image.description)
      return tags.reduce((accum, tag) => {
        if (tag.includes(filterString)) { return true }
        return accum
      }, false)
    })
  }
}

function mapStateToProps (state) {
  return {
    imagesData: state.images,
    visibilityFilter: state.visibilityFilter
  }
}

function mapDispatchToProps (dispatch) {
  // getImageIdsFromDropbox now accessible off props
  return bindActionCreators(
    {
      updateFilterString: updateFilterString,
      getImageIdsFromDropbox: getImageIdsFromDropbox
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDeck)
