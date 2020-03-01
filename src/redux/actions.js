export const updateContrast = ({ rangeValue }) => ({
  type: 'UPDATE_CONTRAST',
  payload: {
    contrast: rangeValue,
  },
});

export const updateBrightness = ({ rangeValue }) => ({
  type: 'UPDATE_BRIGHTNESS',
  payload: {
    brightness: rangeValue,
  },
});
