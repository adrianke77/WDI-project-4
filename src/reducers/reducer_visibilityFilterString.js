export default function (state = {string:''}, action) {
  let visibilityFilterState = Object.assign({},state)
  let payload = action.payload
  switch (action.type) {
    case 'CHANGE_VISIBILITY_FILTER_STRING': // payload is filterString
      visibilityFilterState.string = payload
      break
  }
  return visibilityFilterState
}