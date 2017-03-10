//redux stores all state as one object
//this is the planned structure
//not actually part of codebase

{
  dropBoxUserData:{} //from dropbox login, for carrying out search/downloads
  userEmailAddress:'' //from stormpath, unique identifier used in backend
  visibilityFilterString:'', // show images on screen according to if tags contain this string
  images[
    { //each object is data for an image
      id: 1234
      tags: {
        {tagstring}:{tagpercentage},// multiple tags per image
        {tagstring}:{tagpercentage}// multiple tags per image
      
      }
      blob: blobData
    },
    { //each object is data for an image
      id: 5678
      tags: {
        {tagstring}:{tagpercentage}// multiple tags per image
        {tagstring}:{tagpercentage},// multiple tags per image
      }
      blob: blobData
    }
  ]
}