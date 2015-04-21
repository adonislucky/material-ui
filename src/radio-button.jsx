var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on');

var RadioButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    onCheck: React.PropTypes.func
  },

  getTheme: function() {
    return this.context.theme.component.radioButton;
  },

  getStyles: function() {
    var styles = {
      icon: {
          height: this.getTheme().size,
          width: this.getTheme().size
      },
      target: {
          transition: Transitions.easeOut(),
          position: 'absolute',
          opacity: 1,
          transform: 'scale(1)',
          fill: this.getTheme().borderColor
      },
      fill: {
          position: 'absolute',
          opacity: 1,
          transform: 'scale(0)',
          transformOrigin: '50% 50%',
          transition: Transitions.easeOut(),
          fill: this.getTheme().checkedColor
      },
      targetWhenChecked: {
        opacity: 0,
        transform: 'scale(0)'
      },
      fillWhenChecked: {
        opacity: 1,
        transform: 'scale(1)'
      },
      targetWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      fillWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
    };
    return styles;
  },

  render: function() {
    var {
      onCheck,
      ...other
    } = this.props;

    var styles = this.getStyles();

    var radioButtonElement = (
      <div>
          <RadioButtonOff style={this.m(
            styles.target,
            this.props.checked && styles.targetWhenChecked,
            this.props.style,
            this.props.disabled && styles.targetWhenDisabled
          )} />
          <RadioButtonOn style={this.m(
            styles.fill,
            this.props.checked && styles.fillWhenChecked,
            this.props.style,
            this.props.disabled && styles.fillWhenDisabled
          )} />
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "radio",
      switched: this.props.checked,
      switchElement: radioButtonElement,
      iconStyle: styles.icon,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  // Only called when selected, not when unselected.
  _handleCheck: function(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  _handleStateChange: function(newSwitched) {
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a 
  // RadioButton's checked value.
  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },
  
  getValue: function() {
    return this.refs.enhancedSwitch.getValue();
  }

});

module.exports = RadioButton;
