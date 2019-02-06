import { FETCH_PHOTOS } from "./../actions/types";

const initialState = {
  photos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        photos: action.payload
      };

    default:
      return state;
  }
};
