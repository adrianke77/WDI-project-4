// USER AUTH NOT WORKING!!!! NEED TO FIX!!!

export default function () {
  console.log('action restore from backend triggered')
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
    console.log('reload fetch sending now')
    fetch(url, init).then(response => response.json()).then(json => {
      console.log(json)
      if (json) {
        console.log('action:backend returned with reload data')
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
}
