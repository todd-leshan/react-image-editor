import React from 'react';
import get from 'lodash/get';

const ALLOWED_IMAGE_TYPE = ['image/jpeg', 'image/png'];

class ImgCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.handleUploadImg = this.handleUploadImg.bind(this);
    this.state = {
      imgName: '',
    };
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
  }

  handleUploadImg(event) {
    const input = event.target;
    const file = get(input, 'files[0]');
    const img = document.createElement('img');

    if (!file || !file.type || !ALLOWED_IMAGE_TYPE.includes(file.type)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    img.onload = () => {
      this.setState({
        imgName: file.name,
      });

      this.canvas.width = img.width;
      this.canvas.height = img.height;

      this.ctx.drawImage(img, 0, 0, img.width, img.height);
    };
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

export default ImgCanvas;
