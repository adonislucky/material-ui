import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import SlideInTransitionGroup from '../internal/SlideIn';

function getStyles(props, context, state) {
  const {datePicker} = context.muiTheme;
  const {selectedYear} = state;

  const styles = {
    root: {
      display: 'block',
      backgroundColor: datePicker.selectColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: props.mode === 'portrait' ? 2 : 0,
      borderBottomLeftRadius: props.mode === 'portrait' ? 0 : 2,
      color: datePicker.textColor,
      height: '100%',
      padding: 20,
      fontWeight: 900,
    },
    monthDay: {
      display: 'block',
      fontSize: 36,
      lineHeight: '36px',
      height: props.mode === 'landscape' ? '100%' : 38,
      opacity: selectedYear ? 0.7 : 1,
      transition: transitions.easeOut(),
      width: '100%',
      fontWeight: '500',
    },
    monthDayTitle: {
      cursor: !selectedYear ? 'default' : 'pointer',
      width: '100%',
      display: 'block',
    },
    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: '16px',
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
      transition: transitions.easeOut(),
      marginBottom: 10,
    },
    yearTitle: {
      cursor: (!selectedYear && !props.disableYearSelection) ? 'pointer' : 'default',
    },
  };

  return styles;
}

class DateDisplay extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    disableYearSelection: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    monthDaySelected: PropTypes.bool,
    onTouchTapMonthDay: PropTypes.func,
    onTouchTapYear: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    style: PropTypes.object,
    weekCount: PropTypes.number,
  };

  static defaultProps = {
    disableYearSelection: false,
    monthDaySelected: true,
    weekCount: 4,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    selectedYear: !this.props.monthDaySelected,
    transitionDirection: 'up',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      const direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }

    if (nextProps.monthDaySelected !== undefined) {
      this.setState({
        selectedYear: !nextProps.monthDaySelected,
      });
    }
  }

  handleTouchTapMonthDay = () => {
    if (this.props.onTouchTapMonthDay && this.state.selectedYear) {
      this.props.onTouchTapMonthDay();
    }

    this.setState({selectedYear: false});
  };

  handleTouchTapYear = () => {
    if (this.props.onTouchTapYear && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.onTouchTapYear();
    }

    if (!this.props.disableYearSelection) {
      this.setState({selectedYear: true});
    }
  };

  render() {
    const {
      DateTimeFormat,
      locale,
      selectedDate,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const year = selectedDate.getFullYear();

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit',
    }).format(selectedDate);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        <SlideInTransitionGroup
          style={styles.year}
          direction={this.state.transitionDirection}
        >
          <div key={year} style={styles.yearTitle} onTouchTap={this.handleTouchTapYear}>
            {year}
          </div>
        </SlideInTransitionGroup>
        <SlideInTransitionGroup
          style={styles.monthDay}
          direction={this.state.transitionDirection}
        >
          <div
            key={dateTimeFormatted}
            style={styles.monthDayTitle}
            onTouchTap={this.handleTouchTapMonthDay}
          >
            {dateTimeFormatted}
          </div>
        </SlideInTransitionGroup>
      </div>
    );
  }
}

export default DateDisplay;
