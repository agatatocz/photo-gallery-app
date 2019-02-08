import { FETCH_PHOTOS, AUTHOR_TYPED, PHOTO_SELECTED } from "./types";

export const fetchPhotos = () => dispatch => {
  fetch("https://picsum.photos/list")
    .then(res => res.json())
    .then(photos =>
      dispatch({
        type: FETCH_PHOTOS,
        payload: photos.slice(10, 200)
      })
    )
    .catch(e => console.log(e));
};

export const onAuthorTyped = text => {
  return { type: AUTHOR_TYPED, payload: text };
};

export const onPhotoSelected = photo => {
  console.log("action");
  return { type: PHOTO_SELECTED, payload: photo };
};
