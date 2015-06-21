let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageNavigateBefore = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageNavigateBefore;