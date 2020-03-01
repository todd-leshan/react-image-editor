import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

const ALLOWED_IMAGE_TYPE = ['image/jpeg', 'image/png'];

// eslint-disable-next-line max-len
const applyFiltersOnPixelColor = (val, contrastFactor, brightness) => contrastFactor * (val - 128) + 128 + brightness;

class ImgCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.handleUploadImg = this.handleUploadImg.bind(this);
    this.state = {
      imgName: '',
    };

    this.img = document.createElement('img');
    this.originalImageData = null;
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
  }

  componentDidUpdate(prevProps) {
    const { brightness, contrast } = this.props;
    if (prevProps.brightness !== brightness || prevProps.contrast !== contrast) {
      this.applyFilters(contrast, brightness);
    }
  }

  handleUploadImg(event) {
    const input = event.target;
    const file = get(input, 'files[0]');
    const { resetFilters, onImgLoaded } = this.props;

    if (!file || !file.type || !ALLOWED_IMAGE_TYPE.includes(file.type)) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    resetFilters();
    this.originalImageData = null;

    const reader = new FileReader();
    reader.onloadend = (e) => {
      this.img.src = e.target.result;

      this.img.onload = () => {
        this.setState({
          imgName: file.name,
        });
        this.canvas.width = this.img.width;
        this.canvas.height = this.img.height;
        this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
        const imageDataObj = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.originalImageData = [...imageDataObj.data];
        onImgLoaded();
      };
    };
    reader.readAsDataURL(file);
  }

  applyFilters(contrast, brightness) {
    if (this.originalImageData === null) {
      return;
    }

    const data = [...this.originalImageData];
    const contrastScaled = contrast * 2.55;
    const brightnessScaled = brightness * 2.55;
    const factor = (259 * (contrastScaled + 255)) / (255 * (259 - contrastScaled));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = applyFiltersOnPixelColor(data[i], factor, brightnessScaled);
      data[i + 1] = applyFiltersOnPixelColor(data[i + 1], factor, brightnessScaled);
      data[i + 2] = applyFiltersOnPixelColor(data[i + 2], factor, brightnessScaled);
    }

    const newImageData = new ImageData(
      new Uint8ClampedArray(data),
      this.canvas.width,
      this.canvas.height,
    );

    this.ctx.putImageData(newImageData, 0, 0);
  }

  render() {
    const { imgName } = this.state;

    return (
      <div>
        <canvas ref={this.canvasRef} />
        <div className="container--upload">
          <div className="file-name">
            <span>name</span>
            <span>{imgName}</span>
          </div>
          <div className="file-upload">
            <label htmlFor="file--img">
              upload
              <input
                type="file"
                id="file--img"
                accept="image/png, image/jpeg"
                onChange={this.handleUploadImg}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

ImgCanvas.propTypes = {
  brightness: PropTypes.number.isRequired,
  contrast: PropTypes.number.isRequired,
  resetFilters: PropTypes.func.isRequired,
  onImgLoaded: PropTypes.func.isRequired,
};

export default ImgCanvas;
