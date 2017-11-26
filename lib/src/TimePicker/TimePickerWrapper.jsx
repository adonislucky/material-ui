import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import TimePicker from './TimePicker';
import PickerBase from '../_shared/PickerBase';
import * as defaultUtils from '../utils/utils';

export default class TimePickerWrapper extends PickerBase {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    returnMoment: PropTypes.bool,
    invalidLabel: PropTypes.string,
    utils: PropTypes.object,
  }

  static defaultProps = {
    value: new Date(),
    format: 'hh:mm A',
    autoOk: false,
    returnMoment: true,
    invalidLabel: undefined,
    utils: defaultUtils,
  }

  render() {
    const { date } = this.state;
    const {
      value, format, autoOk, onChange, returnMoment, invalidLabel,
      utils, ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={(node) => { this.wrapper = node; }}
        value={value}
        format={format}
        onAccept={this.handleAccept}
        onDismiss={this.handleDismiss}
        invalidLabel={invalidLabel}
        {...other}
      >
        <TimePicker
          date={date}
          onChange={this.handleChange}
          utils={utils}
        />
      </ModalWrapper>
    );
  }
}
