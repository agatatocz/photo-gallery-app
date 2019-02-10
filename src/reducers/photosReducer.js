import {
  FETCH_PHOTOS,
  AUTHOR_TYPED,
  PHOTO_SELECTED,
  PAGE_CHANGED
} from "./../actions/types";

const initialState = {
  allPhotos: [],
  filteredPhotos: [],
  author: "",
  selectedPhoto: null,
  pageSize: 12,
  currentPage: 1
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
      return {
        ...state,
        selectedPhoto: action.payload
      };
    //-----------------------------------------------
    case PAGE_CHANGED:
      return {
        ...state,
        currentPage: action.payload
      };

    //-----------------------------------------------
    default:
      return state;
  }
};
