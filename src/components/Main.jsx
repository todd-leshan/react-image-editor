import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateContrast, updateBrightness } from '../redux/actions';

import ImgFilter from './ImgFilter';
import ImgCanvas from './ImgCanvas';

const mapStateToProps = (state) => ({
  contrast: state.contrast,
  brightness: state.brightness,
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateContrast: ({ rangeValue }) => dispatch(updateContrast({ rangeValue })),
  handleUpdateBrightness: ({ rangeValue }) => dispatch(updateBrightness({ rangeValue })),
});

class MainComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableFilters: true,
    };

    this.onContrastChange = this.onContrastChange.bind(this);
    this.onBrightnessChange = this.onBrightnessChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.onImgLoaded = this.onImgLoaded.bind(this);
  }

  onContrastChange(rangeValue) {
    const { handleUpdateContrast } = this.props;
    handleUpdateContrast({ rangeValue });
  }

  onBrightnessChange(rangeValue) {
    const { handleUpdateBrightness } = this.props;
    handleUpdateBrightness({ rangeValue });
  }

  onImgLoaded() {
    this.setState({
      disableFilters: false,
    });
  }

  resetFilters() {
    const { handleUpdateContrast, handleUpdateBrightness } = this.props;
    handleUpdateContrast({ rangeValue: 0 });
    handleUpdateBrightness({ rangeValue: 0 });
    this.setState({
      disableFilters: true,
    });
  }

  render() {
    const { contrast, brightness } = this.props;
    const { disableFilters } = this.state;
    return (
      <main>
        <form action="#">
          <ImgFilter
            name="Brightness"
            description="Slide to adjust image brightness!☀️"
            themeClass="filter--eucalyptus"
            rangeValue={brightness}
            onRangeSliderChange={this.onBrightnessChange}
            isDisabled={disableFilters}
          />
          <ImgFilter
            name="Contrast"
            description="Slide to adjust image contrast! 🌓"
            themeClass="filter--havelock-blue margin--extra"
            rangeValue={contrast}
            onRangeSliderChange={this.onContrastChange}
            isDisabled={disableFilters}
          />
          <ImgCanvas
            brightness={brightness}
            contrast={contrast}
            resetFilters={this.resetFilters}
            onImgLoaded={this.onImgLoaded}
          />
        </form>
      </main>
    );
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

MainComponent.propTypes = {
  contrast: PropTypes.number.isRequired,
  brightness: PropTypes.number.isRequired,
  handleUpdateContrast: PropTypes.func.isRequired,
  handleUpdateBrightness: PropTypes.func.isRequired,
};

export default Main;
