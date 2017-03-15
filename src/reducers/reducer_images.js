export default function (state = [], action) {
  let imagesState = state.map(a => Object.assign({}, a)) // make clone of array
  let payload = action.payload
  let image = {}
  switch (action.type) {
    case 'UPDATE_IMAGE_IDS_LIST': // payload is imageIdsList
      imagesState = makeNewImageObjects(payload, imagesState)
      imagesState = removeMissingImageObjects(payload, imagesState)
      break
    case 'BLOB_FETCH_STARTED': // payload is id
      image = imagesState.find(imageObject => imageObject.id === payload)
      image.fetchingBlob = true
      image.version++
      break
    case 'SAVE_BLOB_FOR_IMAGE': // payload is {blob:blob, id:id}
      image = imagesState.find(imageObject => imageObject.id === payload.id)
      image.blob = payload.blob
      image.blobAvailable = true
      image.fetchingBlob = false
      image.version++
      break
    case 'ADD_TAGS_TO_IMAGE': // payload is {tags:tags,id:id}
      image = imagesState.find(imageObject => imageObject.id === payload.id)
      image.tags = payload.tags
      image.tagSaved = false
      image.version++
      break
    case 'FETCHING_TAGS_STARTED': // payload is id
      image = imagesState.find(imageObject => imageObject.id === payload)
      image.fetchingTags = true
      image.version++
      break
    case 'CHANGE_TAG_STRING': // payload is {tagString,imageId,tagIndex}
      image = imagesState.find(
        imageObject => imageObject.id === payload.imageId,
      )
      image.tags[payload.tagIndex].description = payload.tagString
      image.tags[payload.tagIndex].score = 'custom tag'
      image.tagSaved = false
      image.version++
      break
    case 'CURRENT_TAGS_SAVED':
      imagesState = imagesState.map(image => {
        image.tagSaved = true
        return image
      })
      break
    case 'LOAD_IMAGES_FROM_BACKEND':
      imagesState = payload
      break
  }
  return imagesState
}

function makeNewImageObjects (imageIdsList, imagesState) {
  let newIdsList = imageIdsList.filter(
    imageId => !imagesState.find(imageObj => imageObj.id === imageId),
  )
  newIdsList.forEach(newId => imagesState.push({
    id: newId,
    tags: [],
    blob: null,
    blobAvailable: false,
    fetchingTags: false,
    fetchingBlob: false,
    tagSaved: true,
    version: 1
  }))
  return imagesState
}

function removeMissingImageObjects (imageIdsList, imagesState) {
  return imagesState.filter(imageObj =>
    imageIdsList.find(imageId => imageObj.id === imageId))
}
