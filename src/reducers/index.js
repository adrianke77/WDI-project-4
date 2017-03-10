 import { combineReducers } from 'redux'
 import imagesReducer from './reducer_images.js'
 import userDataReducer from './reducer_userData.js'
 import visibilityFilterReducer from './reducer_visibilityFilter.js'

// reducers describe how state changes in response to an action
 export default combineReducers({
   images: imagesReducer,
   userData: userDataReducer,
   visibilityFilter: visibilityFilterReducer
 })
