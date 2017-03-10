export default function (dropboxUserData) {
  return (dispatch, getstate) => {
    dispatch({
      type: 'STORE_DROPBOX_USER_DATA',
      payload: dropboxUserData
    })
  }
}
