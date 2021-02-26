import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { emphasize } from '../styles/colorManipulator';
import Paper from '../Paper';
import snackbarContentClasses, { getSnackbarContentUtilityClass } from './snackbarContentClasses';

const overridesResolver = (props, styles) => {
  return deepmerge(styles.root || {}, {
    [`& .${snackbarContentClasses.action}`]: styles.action,
    [`& .${snackbarContentClasses.message}`]: styles.message,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
    action: ['action'],
    message: ['message'],
  };

  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};

const SnackbarContentRoot = experimentalStyled(
  Paper,
  {},
  {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme }) => {
  const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
  const backgroundColor = emphasize(theme.palette.background.default, emphasis);

  return {
    ...theme.typography.body2,
    color: theme.palette.getContrastText(backgroundColor),
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 'initial',
      minWidth: 288,
    },
  };
});

const SnackbarContentMessage = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiSnackbarContent',
    slot: 'Message',
  },
)({
  padding: '8px 0',
});

const SnackbarContentAction = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiSnackbarContent',
    slot: 'Action',
  },
)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8,
});

const SnackbarContent = React.forwardRef(function SnackbarContent(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSnackbarContent' });
  const { action, className, message, role = 'alert', ...other } = props;
  // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed
  const styleProps = { ...props };
  const classes = useUtilityClasses(styleProps);

  return (
    <SnackbarContentRoot
      role={role}
      square
      elevation={6}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    >
      <SnackbarContentMessage className={classes.message} styleProps={styleProps}>
        {message}
      </SnackbarContentMessage>
      {action ? (
        <SnackbarContentAction className={classes.action} styleProps={styleProps}>
          {action}
        </SnackbarContentAction>
      ) : null}
    </SnackbarContentRoot>
  );
});

SnackbarContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default SnackbarContent;
