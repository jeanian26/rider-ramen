/* eslint-disable prettier/prettier */
export default function getImgSource(src) {
  let imgSource;

  if (typeof src === 'string') {
    imgSource = {uri: src};
  }
  if (typeof src === 'number') {
    imgSource = src;
  }

  return imgSource;
}
