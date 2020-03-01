import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

const SLIDER_DEBOUNCE_TIMEOUT = 1;
const SLIDER_RANGE_SIZE = 200;
const SLIDER_RANGE_OFFSET = SLIDER_RANGE_SIZE / 2;

class ImgFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundSize: `${(SLIDER_RANGE_OFFSET / SLIDER_RANGE_SIZE) * 100}% 100%`,
    };

    const { onRangeSliderChange } = this.props;

    this.handleChange = this.handleChange.bind(this);
    this.rangeSliderDebounced = debounce((newRange) => {
      onRangeSliderChange(newRange);
      this.setState({
        backgroundSize: `${((parseInt(newRange, 10) + SLIDER_RANGE_OFFSET) / SLIDER_RANGE_SIZE)
          * 100}% 100%`,
      });
    }, SLIDER_DEBOUNCE_TIMEOUT);
  }

  handleChange(e) {
    this.rangeSliderDebounced(parseInt(e.target.value, 10));
  }

  render() {
    const {
      name, description, themeClass, rangeValue,
    } = this.props;
    const { backgroundSize } = this.state;
    const filerClasses = `container--filter ${themeClass}`;

    return (
      <div className={filerClasses}>
        <h3 className="filter-name">{name}</h3>
        <div className="filter-range">
          <input
            type="range"
            min="-100"
            max="100"
            value={rangeValue}
            style={{ backgroundSize: `${backgroundSize}` }}
            onChange={this.handleChange}
          />
        </div>
        <span className="filter-desp">{description}</span>
      </div>
    );
  }
}

ImgFilter.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  themeClass: PropTypes.string.isRequired,
  rangeValue: PropTypes.number.isRequired,
  onRangeSliderChange: PropTypes.func.isRequired,
};

export default ImgFilter;
