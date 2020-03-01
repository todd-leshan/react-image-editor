import React from 'react';
import { connect } from 'react-redux';
import { updateContrast, updateBrightness } from '../redux/actions';

import ImgFilter from './ImgFilter';
import ImgCanvas from './ImgCanvas';

const mapStateToProps = (state) => ({
  contrast: state.contrast,
  brightness: state.brightness,
});

const mapDispatchToProps = (dispatch) => ({
  updateContrast: ({ rangeValue }) => dispatch(updateContrast({ rangeValue })),
  updateBrightness: ({ rangeValue }) => dispatch(updateBrightness({ rangeValue })),
});

class MainComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onContrastChange = this.onContrastChange.bind(this);
    this.onBrightnessChange = this.onBrightnessChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  onContrastChange(rangeValue) {
    this.props.updateContrast({ rangeValue });
  }

  onBrightnessChange(rangeValue) {
    this.props.updateBrightness({ rangeValue });
  }

  resetFilters() {
    this.props.updateContrast({ rangeValue: 0 });
    this.props.updateBrightness({ rangeValue: 0 });
  }

  render() {
    const { contrast, brightness } = this.props;
    return (
      <main>
        <form action="#">
          <ImgFilter
            name="Brightness"
            description="Slide to adjust image brightness!☀️"
            themeClass="filter--eucalyptus"
            rangeValue={brightness}
            onRangeSliderChange={this.onBrightnessChange}
          />
          <ImgFilter
            name="Contrast"
            description="Slide to adjust image contrast! 🌓"
            themeClass="filter--havelock-blue margin--extra"
            rangeValue={contrast}
            onRangeSliderChange={this.onContrastChange}
          />
          <ImgCanvas brightness={brightness} contrast={contrast} resetFilters={this.resetFilters} />
        </form>
      </main>
    );
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default Main;
