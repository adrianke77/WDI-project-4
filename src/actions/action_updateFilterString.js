export default function (filterString) {
  return {
    type: 'CHANGE_VISIBILITY_FILTER_STRING',
    payload: filterString
  }
}