let React = require('react');
let SvgIcon = require('../../svg-icon');

let MapsLocalParking = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
      </SvgIcon>
    );
  }

});

module.exports = MapsLocalParking;