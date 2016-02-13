import React from 'react';
import Transitions from './styles/transitions';
import FocusRipple from './ripples/focus-ripple';
import getMuiTheme from './styles/getMuiTheme';
import autoPrefix from './styles/auto-prefix';

/**
  * Verifies min/max range.
  * @param   {Object} props         Properties of the React component.
  * @param   {String} propName      Name of the property to validate.
  * @param   {String} componentName Name of the component whose property is being validated.
  * @returns {Object} Returns an Error if min >= max otherwise null.
  */
const minMaxPropType = (props, propName, componentName) => {
  const error = React.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  if (props.min >= props.max) {
    const errorMsg = (propName === 'min') ? 'min should be less than max' : 'max should be greater than min';
    return new Error(errorMsg);
  }
};

/**
  * Verifies value is within the min/max range.
  * @param   {Object} props         Properties of the React component.
  * @param   {String} propName      Name of the property to validate.
  * @param   {String} componentName Name of the component whose property is being validated.
  * @returns {Object} Returns an Error if the value is not within the range otherwise null.
  */
const valueInRangePropType = (props, propName, componentName) => {
  const error = React.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  const value = props[propName];
  if (value < props.min || props.max < value) {
    return new Error(`${propName} should be within the range specified by min and max`);
  }
};


const Slider = React.createClass({

  propTypes: {
    /**
     * The default value of the slider.
     */
    defaultValue: valueInRangePropType,

    /**
     * Describe the slider.
     */
    description: React.PropTypes.string,

    /**
     * Disables focus ripple if set to true.
     */
    disableFocusRipple: React.PropTypes.bool,

    /**
     * If true, the slider will not be interactable.
     */
    disabled: React.PropTypes.bool,

    /**
     * An error message for the slider.
     */
    error: React.PropTypes.string,

    /**
     * The maximum value the slider can slide to on
     * a scale from 0 to 1 inclusive. Cannot be equal to min.
     */
    max: minMaxPropType,

    /**
     * The minimum value the slider can slide to on a scale
     * from 0 to 1 inclusive. Cannot be equal to max.
     */
    min: minMaxPropType,

    /**
     * The name of the slider. Behaves like the name attribute
     * of an input element.
     */
    name: React.PropTypes.string,

    /**
     * Callback function that is fired when the focus has left the slider.
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function that is fired when the user changes the slider's value.
     */
    onChange: React.PropTypes.func,

    /**
     * Callback function that is fired when the slider has begun to move.
     */
    onDragStart: React.PropTypes.func,

    /**
     * Callback function that is fried when the slide has stopped moving.
     */
    onDragStop: React.PropTypes.func,

    /**
     * Callback fired when the user has focused on the slider.
     */
    onFocus: React.PropTypes.func,

    /**
     * Whether or not the slider is required in a form.
     */
    required: React.PropTypes.bool,

    /**
     * The granularity the slider can step through values.
     */
    step: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The value of the slider.
     */
    value: valueInRangePropType,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      disabled: false,
      disableFocusRipple: false,
      max: 1,
      min: 0,
      required: true,
      step: 0.01,
      style: {},
    };
  },

  getInitialState() {
    let value = this.props.value;
    if (value === undefined) {
      value = this.props.defaultValue !== undefined ? this.props.defaultValue : this.props.min;
    }
    let percent = (value - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;

    return {
      active: false,
      dragging: false,
      focused: false,
      hovered: false,
      percent: percent,
      value: value,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (nextProps.value !== undefined && !this.state.dragging) {
      this.setValue(nextProps.value);
    }
  },

  getTheme() {
    return this.state.muiTheme.slider;
  },

  getStyles() {
    const fillGutter = this.getTheme().handleSize / 2;
    const disabledGutter = this.getTheme().trackSize + this.getTheme().handleSizeDisabled / 2;
    const calcDisabledSpacing = this.props.disabled ? ` - ${disabledGutter}px` : '';
    const styles = {
      root: {
        touchCallout: 'none',
        userSelect: 'none',
        cursor: 'default',
        height: this.getTheme().handleSizeActive,
        position: 'relative',
        marginTop: 24,
        marginBottom: 48,
      },
      track: {
        position: 'absolute',
        top: (this.getTheme().handleSizeActive - this.getTheme().trackSize) / 2,
        left: 0,
        width: '100%',
        height: this.getTheme().trackSize,
      },
      filledAndRemaining: {
        position: 'absolute',
        top: 0,
        height: '100%',
        transition: Transitions.easeOut(null, 'margin'),
      },
      handle: {
        boxSizing: 'border-box',
        position: 'absolute',
        cursor: 'pointer',
        pointerEvents: 'inherit',
        top: 0,
        left: '0%',
        zIndex: 1,
        margin: `${(this.getTheme().trackSize / 2)}px 0 0 0`,
        width: this.getTheme().handleSize,
        height: this.getTheme().handleSize,
        backgroundColor: this.getTheme().selectionColor,
        backgroundClip: 'padding-box',
        border: '0px solid transparent',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        transition:
          `${Transitions.easeOut('450ms', 'background')}, ${
          Transitions.easeOut('450ms', 'border-color')}, ${
          Transitions.easeOut('450ms', 'width')}, ${
          Transitions.easeOut('450ms', 'height')}`,
        overflow: 'visible',
      },
      handleWhenDisabled: {
        boxSizing: 'content-box',
        cursor: 'not-allowed',
        backgroundColor: this.getTheme().trackColor,
        width: this.getTheme().handleSizeDisabled,
        height: this.getTheme().handleSizeDisabled,
        border: 'none',
      },
      handleWhenPercentZero: {
        border: `${this.getTheme().trackSize}px solid ${this.getTheme().handleColorZero}`,
        backgroundColor: this.getTheme().handleFillColor,
        boxShadow: 'none',
      },
      handleWhenPercentZeroAndDisabled: {
        cursor: 'not-allowed',
        width: this.getTheme().handleSizeDisabled,
        height: this.getTheme().handleSizeDisabled,
      },
      handleWhenPercentZeroAndFocused: {
        border: `${this.getTheme().trackSize}px solid ${this.getTheme().trackColorSelected}`,
      },
      handleWhenActive: {
        width: this.getTheme().handleSizeActive,
        height: this.getTheme().handleSizeActive,
      },
      ripple: {
        height: this.getTheme().handleSize,
        width: this.getTheme().handleSize,
        overflow: 'visible',
      },
      rippleWhenPercentZero: {
        top: -this.getTheme().trackSize,
        left: -this.getTheme().trackSize,
      },
      rippleInner: {
        height: '300%',
        width: '300%',
        top: -this.getTheme().handleSize,
        left: -this.getTheme().handleSize,
      },
    };
    styles.filled = Object.assign({}, styles.filledAndRemaining, {
      left: 0,
      backgroundColor: (this.props.disabled) ?
        this.getTheme().trackColor :
        this.getTheme().selectionColor,
      marginRight: fillGutter,
      width: `calc(${(this.state.percent * 100)}%${calcDisabledSpacing})`,
    });
    styles.remaining = Object.assign({}, styles.filledAndRemaining, {
      right: 0,
      backgroundColor: this.getTheme().trackColor,
      marginLeft: fillGutter,
      width: `calc(${((1 - this.state.percent) * 100)}%${calcDisabledSpacing})`,
    });

    return styles;
  },


  // Needed to prevent text selection when dragging the slider handler.
  // In the future, we should consider use <input type="range"> to avoid
  // similar issues.
  _toggleSelection(value) {
    const body = document.getElementsByTagName('body')[0];
    autoPrefix.set(body.style, 'userSelect', value, this.state.muiTheme);
  },

  _onHandleTouchStart(e) {
    if (document) {
      document.addEventListener('touchmove', this._dragTouchHandler, false);
      document.addEventListener('touchup', this._dragTouchEndHandler, false);
      document.addEventListener('touchend', this._dragTouchEndHandler, false);
      document.addEventListener('touchcancel', this._dragTouchEndHandler, false);
    }
    this._onDragStart(e);
  },

  _onHandleMouseDown(e) {
    if (document) {
      document.addEventListener('mousemove', this._dragHandler, false);
      document.addEventListener('mouseup', this._dragEndHandler, false);
      this._toggleSelection('none');
    }
    this._onDragStart(e);
  },

  _dragHandler(e) {
    if (this._dragRunning) {
      return;
    }
    this._dragRunning = true;
    requestAnimationFrame(() => {
      this._onDragUpdate(e, e.clientX - this._getTrackLeft());
      this._dragRunning = false;
    });
  },

  _dragTouchHandler(e) {
    if (this._dragRunning) {
      return;
    }
    this._dragRunning = true;
    requestAnimationFrame(() => {
      this._onDragUpdate(e, e.touches[0].clientX - this._getTrackLeft());
      this._dragRunning = false;
    });
  },

  _dragEndHandler(e) {
    if (document) {
      document.removeEventListener('mousemove', this._dragHandler, false);
      document.removeEventListener('mouseup', this._dragEndHandler, false);
      this._toggleSelection('');
    }

    this._onDragStop(e);
  },

  _dragTouchEndHandler(e) {
    if (document) {
      document.removeEventListener('touchmove', this._dragTouchHandler, false);
      document.removeEventListener('touchup', this._dragTouchEndHandler, false);
      document.removeEventListener('touchend', this._dragTouchEndHandler, false);
      document.removeEventListener('touchcancel', this._dragTouchEndHandler, false);
    }

    this._onDragStop(e);
  },

  getValue() {
    return this.state.value;
  },

  setValue(i) {
    // calculate percentage
    let percent = (i - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    // update state
    this.setState({
      value: i,
      percent: percent,
    });
  },

  getPercent() {
    return this.state.percent;
  },

  setPercent(percent, callback) {
    const value = this._alignValue(this._percentToValue(percent));
    const {min, max} = this.props;
    const alignedPercent = (value - min) / (max - min);
    if (this.state.value !== value) {
      this.setState({value: value, percent: alignedPercent}, callback);
    }
  },

  clearValue() {
    this.setValue(this.props.min);
  },

  _alignValue(val) {
    const {step, min} = this.props;
    const alignValue = Math.round((val - min) / step) * step + min;
    return parseFloat(alignValue.toFixed(5));
  },

  handleFocus(e) {
    this.setState({focused: true});
    if (this.props.onFocus) this.props.onFocus(e);
  },

  handleBlur(e) {
    this.setState({focused: false, active: false});
    if (this.props.onBlur) this.props.onBlur(e);
  },

  handleMouseDown(e) {
    if (!this.props.disabled) this._pos = e.clientX;
  },

  handleMouseEnter() {
    this.setState({hovered: true});
  },

  handleMouseLeave() {
    this.setState({hovered: false});
  },

  _getTrackLeft() {
    return this.refs.track.getBoundingClientRect().left;
  },

  handleMouseUp(e) {
    if (!this.props.disabled) this.setState({active: false});
    if (!this.state.dragging && Math.abs(this._pos - e.clientX) < 5) {
      const pos = e.clientX - this._getTrackLeft();
      this._dragX(e, pos);
    }

    this._pos = undefined;
  },

  _onDragStart(e) {
    this.setState({
      dragging: true,
      active: true,
    });
    if (this.props.onDragStart) this.props.onDragStart(e);
  },

  _onDragStop(e) {
    this.setState({
      dragging: false,
      active: false,
    });
    if (this.props.onDragStop) this.props.onDragStop(e);
  },

  _onDragUpdate(e, pos) {
    if (!this.state.dragging) return;
    if (!this.props.disabled) this._dragX(e, pos);
  },

  _dragX(e, pos) {
    const max = this.refs.track.clientWidth;
    if (pos < 0) pos = 0; else if (pos > max) pos = max;
    this._updateWithChangeEvent(e, pos / max);
  },

  _updateWithChangeEvent(e, percent) {
    this.setPercent(percent, () => {
      if (this.props.onChange) this.props.onChange(e, this.state.value);
    });
  },

  _percentToValue(percent) {
    return percent * (this.props.max - this.props.min) + this.props.min;
  },

  render() {
    const {...others} = this.props;
    let percent = this.state.percent;
    if (percent > 1) percent = 1; else if (percent < 0) percent = 0;

    const styles = this.getStyles();
    const sliderStyles = Object.assign({}, styles.root, this.props.style);
    const handleStyles = percent === 0 ? Object.assign(
      {},
      styles.handle,
      styles.handleWhenPercentZero,
      this.state.active && styles.handleWhenActive,
      this.state.focused && {outline: 'none'},
      (this.state.hovered || this.state.focused) && !this.props.disabled
        && styles.handleWhenPercentZeroAndFocused,
      this.props.disabled && styles.handleWhenPercentZeroAndDisabled
    ) : Object.assign(
      {},
      styles.handle,
      this.state.active && styles.handleWhenActive,
      this.state.focused && {outline: 'none'},
      this.props.disabled && styles.handleWhenDisabled,
      {
        left: `${(percent * 100)}%`,
      }
    );
    const rippleStyle = Object.assign(
      {},
      styles.ripple,
      percent === 0 && styles.rippleWhenPercentZero
    );
    const remainingStyles = styles.remaining;
    if ((this.state.hovered || this.state.focused) && !this.props.disabled) {
      remainingStyles.backgroundColor = this.getTheme().trackColorSelected;
    }

    const rippleShowCondition = (this.state.hovered || this.state.focused) && !this.state.active;
    const rippleColor = this.state.percent === 0 ? this.getTheme().handleColorZero : this.getTheme().rippleColor;
    let focusRipple;
    if (!this.props.disabled && !this.props.disableFocusRipple) {
      focusRipple = (
        <FocusRipple
          ref="focusRipple"
          key="focusRipple"
          style={rippleStyle}
          innerStyle={styles.rippleInner}
          show={rippleShowCondition}
          muiTheme={this.state.muiTheme}
          color={rippleColor}
        />
      );
    }

    let handleDragProps = {};

    if (!this.props.disabled) {
      handleDragProps = {
        onTouchStart: this._onHandleTouchStart,
        onMouseDown: this._onHandleMouseDown,
      };
    }

    const {
      prepareStyles,
    } = this.state.muiTheme;

    return (
      <div {...others } style={prepareStyles(Object.assign({}, this.props.style))}>
        <span>{this.props.description}</span>
        <span>{this.props.error}</span>
        <div
          style={prepareStyles(sliderStyles)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
        >
          <div ref="track" style={prepareStyles(styles.track)}>
            <div style={prepareStyles(styles.filled)}></div>
            <div style={prepareStyles(remainingStyles)}></div>
            <div style={prepareStyles(handleStyles)} tabIndex={0} {...handleDragProps}>
              {focusRipple}
            </div>
          </div>
        </div>
        <input ref="input" type="hidden"
          name={this.props.name}
          value={this.state.value}
          required={this.props.required}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
      </div>
    );
  },
});

export default Slider;
