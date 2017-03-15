export default function (id) {
  return (dispatch, getstate) => {
    console.log('started getting blob')
    dispatch({
        type: 'BLOB_FETCH_STARTED',
        payload: id
      })
    const url = 'https://content.dropboxapi.com/2/files/download' // dropbox download settings
    const token = getstate().userData.dropboxUserData.access_token
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Dropbox-API-Arg': JSON.stringify({ path: `${id}` })
    })
    const init = {
      method: 'POST',
      headers: headers
    }
    fetch(url, init).then(response => response.blob()).then(blob => {
      console.log('blob returned: blob',blob)
      dispatch({
        type: 'SAVE_BLOB_FOR_IMAGE',
        payload: {
          blob: blob,
          id: id
        }
      })
    })
    // .catch(error=>console.log("Error from blob fetch from Dropbox:",error))
  }
}
