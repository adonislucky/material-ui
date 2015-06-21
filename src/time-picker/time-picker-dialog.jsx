let React = require('react');
let StylePropable = require('../mixins/style-propable');
let WindowListenable = require('../mixins/window-listenable');
let KeyCode = require('../utils/key-code');
let Clock = require('./clock');
let DialogWindow = require('../dialog-window');
let FlatButton = require('../flat-button');


let TimePickerDialog = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    initialTime: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },


  getTheme: function() {
    return this.context.muiTheme.component.timePicker;
  },

  render: function() {
    let {
      initialTime,
      onAccept,
      format,
      ...other
    } = this.props;

    let styles = {
      root: {
        fontSize: "14px",
        color: this.getTheme().clockColor
      },
      dialogContent: {
        width: "280px"
      }
    };

    let actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCancelTouchTap} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onTouchTap={this._handleOKTouchTap} />
    ];

    return (
      <DialogWindow {...other}
        ref="dialogWindow"
        style={this.mergeAndPrefix(styles.root)}
        actions={actions}
        contentStyle={styles.dialogContent}
        onDismiss={this._handleDialogDismiss}
        onShow={this._handleDialogShow}
        repositionOnUpdate={false}>
        <Clock
          ref="clock"
          format={format}
          initialTime={initialTime} />
      </DialogWindow>
    );
  },

  show: function() {
    this.refs.dialogWindow.show();
    this.refs.clock.init();
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  _handleCancelTouchTap: function() {
    this.dismiss();
  },

  _handleOKTouchTap: function() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
  },

  _handleDialogShow: function() {
    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  _handleDialogDismiss: function() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = TimePickerDialog;
