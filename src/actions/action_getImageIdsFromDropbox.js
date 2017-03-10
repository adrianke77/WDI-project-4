export default function (dropboxUserData) {
  return (dispatch, getstate) => {
    const url = 'https://api.dropboxapi.com/2/files/search' // dropbox search
    const token = getstate().userData.dropboxUserData.access_token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    })
    let bodyObj = {
      path: '',
      query: '*.jpg',
      start: 0,
      max_results: 100,
      mode: 'filename'
    }
    let init = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(bodyObj)
    }
    fetch(url, init) // DROPBOX SEARCH
      .then(response => response.json())
      .then(json => {
        let jpegIdsList = getImageIdsListFromJson(json)
        bodyObj.query = '*.png'
        init.body = JSON.stringify(bodyObj) // change query type, then remake init.body
        fetch(url, init).then(response => response.json()).then(json => {
          let pngIdsList = getImageIdsListFromJson(json)
          let imageIdsList = jpegIdsList.concat(pngIdsList)
          dispatch({
            type: 'UPDATE_IMAGE_IDS_LIST',
            payload: imageIdsList
          })
        })
      })
      .catch(error => console.log('Dropbox search fetch error:', error))
  }
}

function getImageIdsListFromJson (json) {
  return json.matches.reduce(
    (accum, object) => {
      accum.push(object.metadata.id)
      return accum
    },
    [],
  )
}
