let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionGrade = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionGrade;