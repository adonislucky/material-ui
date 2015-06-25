let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageSwitchCamera = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageSwitchCamera;