import {
  FETCH_PHOTOS,
  AUTHOR_TYPED,
  PHOTO_SELECTED,
  PAGE_CHANGED,
  PAGE_SIZE_CHANGED
} from "./types";

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
  return { type: PHOTO_SELECTED, payload: photo };
};

export const setCurrentPage = page => {
  return { type: PAGE_CHANGED, payload: page };
};

export const setPageSize = size => {
  return { type: PAGE_SIZE_CHANGED, payload: size };
};
