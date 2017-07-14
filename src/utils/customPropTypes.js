/* eslint-disable prefer-template, import/no-mutable-exports */
/* eslint-disable flowtype/require-valid-file-annotation */

import PropTypes from 'prop-types';

const customPropTypes = {};

customPropTypes.muiRequired = (props, propName, componentName, location, propFullName, ...args) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const error = PropTypes.object.isRequired(
    props,
    propName,
    componentName,
    location,
    propFullName,
    ...args,
  );

  if (error) {
    error.message = [
      'Material-UI: You need to provide a theme.',
      'Wrap the root component in a `<MuiThemeProvider />` component.',
      '',
      'Have a look at https://material-ui-1dab0.firebaseapp.com/getting-started/usage for an example.',
    ].join('\n');
  }

  return error;
};

export default customPropTypes;
