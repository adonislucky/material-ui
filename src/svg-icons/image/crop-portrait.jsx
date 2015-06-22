let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageCropPortrait = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageCropPortrait;