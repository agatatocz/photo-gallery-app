import { FETCH_PHOTOS, AUTHOR_TYPED, PHOTO_SELECTED } from "./../actions/types";

const initialState = {
  allPhotos: [],
  filteredPhotos: [],
  author: "",
  selectedPhoto: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    //-----------------------------------------------
    case FETCH_PHOTOS:
      return {
        ...state,
        allPhotos: action.payload,
        filteredPhotos: action.payload
      };
    //-----------------------------------------------
    case AUTHOR_TYPED:
      const text = action.payload;
      const filteredPhotos = text
        ? state.allPhotos.filter(photo =>
            photo.author.toLowerCase().includes(text.toLowerCase())
          )
        : state.allPhotos;

      return {
        ...state,
        author: text,
        filteredPhotos
      };
    //-----------------------------------------------
    case PHOTO_SELECTED:
      console.log("reducer");
      return {
        ...state,
        selectedPhoto: action.payload
      };
    //-----------------------------------------------
    default:
      return state;
  }
};
