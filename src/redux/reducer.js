const initialState = {
  contrast: 0,
  brightness: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_CONTRAST') {
    return { ...state, contrast: action.payload.contrast };
  }

  if (action.type === 'UPDATE_BRIGHTNESS') {
    return { ...state, brightness: action.payload.brightness };
  }

  return state;
};

export default reducer;
