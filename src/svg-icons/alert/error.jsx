let React = require('react');
let SvgIcon = require('../../svg-icon');

let AlertError = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AlertError;