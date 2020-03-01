export const updateContrast = ({ contrast }) => ({
  type: 'UPDATE_CONTRAST',
  payload: {
    contrast,
  },
});

export const updateBrightness = ({ brightness }) => ({
  type: 'UPDATE_BRIGHTNESS',
  payload: {
    brightness,
  },
});
