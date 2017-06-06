// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiCardContent', theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 3,
    },
  },
}));

function CardContent(props) {
  const { classes, className, ...other } = props;

  return <div className={classNames(classes.root, className)} {...other} />;
}

CardContent.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styleSheet)(CardContent);
