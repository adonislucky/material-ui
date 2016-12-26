// @flow weak

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { createStyleSheet } from 'jss-theme-reactor';
import Layout from 'material-ui/Layout';

const styleSheet = createStyleSheet('StressLayout', (theme) => ({
  root: {
    width: 400,
    backgroundColor: theme.palette.primary.A400,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
}));

export default function StressLayout(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Layout container xsGutter={24} xsDirection="column">
        <Layout container item xsGutter={8}>
          <Layout item xs={3}>
            <Paper className={classes.paper}>
              xs=3
            </Paper>
          </Layout>
          <Layout item xs={9}>
            <Paper className={classes.paper}>
              xs=9
            </Paper>
          </Layout>
        </Layout>
        <Layout
          container
          item
          xsGutter={8}
          xsDirection="row-reverse"
        >
          <Layout item xs={3}>
            <Paper className={classes.paper}>
              first
            </Paper>
          </Layout>
          <Layout item xs={3}>
            <Paper className={classes.paper}>
              last
            </Paper>
          </Layout>
        </Layout>
        <Layout
          container
          item
          xsGutter={8}
          xsJustify="space-between"
        >
          <Layout item xs={3}>
            <Paper className={classes.paper}>
              space
            </Paper>
          </Layout>
          <Layout item xs={3}>
            <Paper className={classes.paper}>
              between
            </Paper>
          </Layout>
        </Layout>
        <Layout
          container
          item
          xsGutter={8}
          xsAlign="stretch"
          xsDirection="column-reverse"
        >
          <Layout item>
            <Paper className={classes.paper}>
              reverse
            </Paper>
          </Layout>
          <Layout item>
            <Paper className={classes.paper}>
              column
            </Paper>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

StressLayout.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
