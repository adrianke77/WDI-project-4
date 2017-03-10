import ReactStormpath from "react-stormpath";

//USER AUTH NOT WORKING!!!! NEED TO FIX!!!

export default function() {
  return (dispatch, getstate) => {
    dispatch({
      type: "SAVE_TO_BACKEND_STARTED",
    });
    let originalStore = getstate();
    let store = Object.assign({}, originalStore);
    store.images = store.images.map(image => {
      let imageClone = Object.assign({}, image);
      imageClone.blob = null;
      imageClone.blobAvailable = false;
      return imageClone;
    });
    //   ReactStormpath.getAccessToken()
    // .then((accessToken) => {
    const url = "/userStore";
    const headers = new Headers({
      "Content-type": "application/json",
    });
    const body = JSON.stringify(store);
    const init = {
      method: "POST",
      headers: headers,
      body: body,
    };
    fetch(url, init).then(response => response.json()).then(json => {
      function saveToBackendDone() {
        dispatch({
          type: "SAVE_TO_BACKEND_DONE",
        });
        dispatch({
          type: "CURRENT_TAGS_SAVED"
        })
      }
      setTimeout(saveToBackendDone, 2000);
    });
  };
}
