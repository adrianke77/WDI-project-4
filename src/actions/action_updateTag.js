export default function (tagString,imageId,tagIndex) {
  return {
    type: 'CHANGE_TAG_STRING',
    payload:{
      tagString:tagString,
      imageId:imageId,
      tagIndex:tagIndex
    }
  }
}