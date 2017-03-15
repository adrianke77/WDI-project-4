export default function (state = {}, action) {
  let userDataState = Object.assign({}, state)
  let payload = action.payload
  switch (action.type) {
    case 'STORE_DROPBOX_USER_DATA': // payload is dropboxUserData
      userDataState.dropboxUserData = payload
      userDataState.userDataSaved = false
      break
    case 'STORE_STORMPATH_USER_DATA': // payload is stormpathUserData
      userDataState.stormpathUserData = payload
      userDataState.userDataSaved = false
      break
    case 'SAVE_TO_BACKEND_STARTED':
      userDataState.isSaving = true
      break
    case 'SAVE_TO_BACKEND_DONE':
      userDataState.isSaving = false
      userDataState.userDataSaved = true
      break
    case 'LOAD_USERDATA_FROM_BACKEND':// payload is userData
      userDataState = payload
      userDataState.triedToRestoreData = true
      userDataState.isSaving = false
      break
  }
  return userDataState
}
