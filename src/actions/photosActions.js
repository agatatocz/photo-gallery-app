import { FETCH_PHOTOS } from "./types";

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
