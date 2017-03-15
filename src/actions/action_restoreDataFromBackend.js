// USER AUTH NOT WORKING!!!! NEED TO FIX!!!

export default function () {
  return (dispatch, getstate) => {
    let originalStore = getstate()
    let store = Object.assign({}, originalStore)
    store.images = store.images.map(image => {
      let imageClone = Object.assign({}, image)
      imageClone.blob = null
      imageClone.blobAvailable = false
      return imageClone
    })
    //   ReactStormpath.getAccessToken()
    // .then((accessToken) => {
    const url = '/userStore/restore'
    const headers = new Headers({
      'Content-type': 'application/json'
    })
    let email = getstate().userData.stormpathUserData.email
    const init = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        email: email
      })
    }
    fetch(url, init).then(response => response.json()).then(json => {
      if (json) {
        json = setAllFetchingTagsToFalse(json)
        dispatch({
          type: 'LOAD_USERDATA_FROM_BACKEND',
          payload: json.userData
        })
        dispatch({
          type: 'LOAD_IMAGES_FROM_BACKEND',
          payload: json.images
        })
      }
    })
  }
  function setAllFetchingTagsToFalse(json) {
    json.images = json.images.map(image=>{
      image.fetchingTags = false
      return image
    })
    return json
  }
}
