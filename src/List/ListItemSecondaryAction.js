// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('ListItemSecondaryAction', () => ({
  secondaryAction: {
    paddingRight: 8,
  },
}));

export default function ListItemSecondaryAction(props, context) {
  const {
    children,
    className: classNameProp,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.secondaryAction, classNameProp);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

ListItemSecondaryAction.propTypes = {
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ListItemSecondaryAction.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
