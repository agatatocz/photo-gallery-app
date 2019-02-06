import { FETCH_PHOTOS, AUTHOR_TYPED } from "./../actions/types";

const initialState = {
  photos: [],
  filteredPhotos: [],
  author: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        filteredPhotos: action.payload
      };

    case AUTHOR_TYPED:
      const text = action.payload;
      const filteredPhotos = text
        ? state.photos.filter(photo =>
            photo.author.toLowerCase().includes(text.toLowerCase())
          )
        : state.photos;

      return {
        ...state,
        author: text,
        filteredPhotos
      };

    default:
      return state;
  }
};
