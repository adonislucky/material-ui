// @flow weak

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { createStyleSheet } from 'jss-theme-reactor';
import Text from 'material-ui/Text';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import AppDrawer from './AppDrawer';

const globalStyleSheet = createStyleSheet('global', (theme) => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    a: {
      color: theme.palette.accent.A400,
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      width: 'auto',
    },
  },
}));

const styleSheet = createStyleSheet('AppFrame', (theme) => {
  return {
    appFrame: {
      display: 'flex',
      alignItems: 'stretch',
      minHeight: '100vh',
      width: '100%',
    },
    navIcon: {
      marginLeft: -12,
    },
    grow: {
      flex: '1 1 100%',
    },
    toggleShade: {
      marginRight: -12,
    },
    title: {
      marginLeft: 24,
      flex: '0 0 auto',
    },
    appBar: {
      left: 'auto',
      right: 0,
      transition: theme.transitions.create('width'),
    },
    appBarHome: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      drawer: {
        width: '250px',
      },
      appBarShift: {
        width: 'calc(100% - 250px)',
      },
      navIconHide: {
        display: 'none',
      },
    },
  };
});

class AppFrame extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    routes: PropTypes.array,
    width: PropTypes.string.isRequired,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    drawerOpen: false,
  };

  componentWillMount() {
    this.context.styleManager.render(globalStyleSheet);
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  };

  getTitle() {
    const { routes } = this.props;
    for (let i = routes.length - 1; i >= 0; i -= 1) {
      if (routes[i].hasOwnProperty('title')) {
        return routes[i].title;
      }
    }
    return null;
  }

  getCurrentPath() {
    const { routes } = this.props;
    for (let i = routes.length - 1; i >= 0; i -= 1) {
      if (routes[i].hasOwnProperty('path')) {
        return routes[i].path;
      }
    }
    return null;
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const title = this.getTitle();

    let drawerDocked = isWidthUp('lg', this.props.width);
    let navIconClassName = classes.navIcon;
    let appBarClassName = classes.appBar;

    if (title === null) { // home route, don't shift app bar or dock drawer
      drawerDocked = false;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName += ` ${classes.navIconHide}`;
      appBarClassName += ` ${classes.appBarShift}`;
    }

    return (
      <div className={classes.appFrame}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton contrast onClick={this.handleDrawerToggle} className={navIconClassName}>
              menu
            </IconButton>
            <Text className={classes.title} type="title" colorInherit>
              {title}
            </Text>
            <div className={classes.grow} />
            <IconButton contrast onClick={this.handleToggleShade} className={classes.toggleShade}>
              lightbulb_outline
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          docked={drawerDocked}
          routes={this.props.routes}
          onRequestClose={this.handleDrawerClose}
          open={this.state.drawerOpen}
        />
        {this.props.children}
      </div>
    );
  }
}

export default compose(
  withWidth(),
  connect(),
)(AppFrame);
