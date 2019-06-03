import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange } from '@material-ui/core/colors';

const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

const innerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: green[500],
    },
  },
});

function ThemeNesting() {
  return (
    <ThemeProvider theme={outerTheme}>
      <Checkbox defaultChecked />
      <ThemeProvider theme={innerTheme}>
        <Checkbox defaultChecked />
      </ThemeProvider>
    </ThemeProvider>
  );
}

export default ThemeNesting;
