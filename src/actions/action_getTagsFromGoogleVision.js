export default function (id) {
  return (dispatch, getstate) => {
    dispatch({
      type: 'FETCHING_TAGS_STARTED',
      payload: id
    })
    const reader = new window.FileReader()
    let base64data = ''
    let blob = getstate().images.find(image => image.id === id).blob
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      base64data = reader.result // BASE64 DATA OBTAINED
      base64data = base64data.replace(
        'data:application/octet-stream;base64,',
        '',
      )
      const url = 'https://vision.googleapis.com/v1/images:annotate' // google vision image label settings
      const gApiKey = 'AIzaSyDmIEo-xnwvkp-4tONhu0MVEK23EAdHaAs'
      const urlWithKey = url + '?key=' + gApiKey
      const headers = new Headers({
        'Content-type': 'application/json'
      })
      const body = JSON.stringify({
        requests: [
          {
            image: {
              content: base64data
            },
            features: [
              {
                type: 'LABEL_DETECTION'
              }
            ]
          }
        ]
      })
      const init = {
        method: 'POST',
        headers: headers,
        body: body
      }
      fetch(urlWithKey, init) // run image through Google Vision
        .then(response => response.json())
        .then(json => {
          dispatch({
            type: 'ADD_TAGS_TO_IMAGE',
            payload: {
              tags: json.responses[0].labelAnnotations,
              id: id
            }
          })
        })
        .catch(error => console.log('Google vision error:', error))
    }
  }
}
