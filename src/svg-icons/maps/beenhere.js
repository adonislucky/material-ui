import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let MapsBeenhere = (props) => (
  <SvgIcon {...props}>
    <path d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-9 15l-5-5 1.41-1.41L10 13.17l7.59-7.59L19 7l-9 9z"/>
  </SvgIcon>
);
MapsBeenhere = pure(MapsBeenhere);
MapsBeenhere.displayName = 'MapsBeenhere';
MapsBeenhere.muiName = 'SvgIcon';

export default MapsBeenhere;
