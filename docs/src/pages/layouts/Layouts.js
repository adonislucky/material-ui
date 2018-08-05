import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  item: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardMedia: {
    height: 0,
    paddingTop: '65%',
  },
};

const themes = [
  {
    name: 'Sign-in',
    description: 'A simple sign-in page.',
    src: '/static/images/layouts/sign-in.png',
    href: '/layouts/sign-in',
    source: 'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/sign-in',
  },
  {
    name: 'Album',
    description: 'A reponsive album / gallery layout with a hero unit and footer.',
    src: '/static/images/layouts/album.png',
    href: '/layouts/album',
    source: 'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/album',
  },
  {
    name: 'Blog',
    description:
      'A sophisticated blog layout. Markdown support is courtesy of react-markdown, ' +
      'but is easily replaced.',
    src: '/static/images/layouts/blog.png',
    href: '/layouts/blog',
    source: 'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/blog',
  },
  {
    name: 'Pricing',
    description:
      'Quickly build an effective pricing table for your potential customers with this layout.',
    src: '/static/images/layouts/pricing.png',
    href: '/layouts/pricing',
    source: 'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/pricing',
  },
  {
    name: 'Checkout',
    description:
      'A step-by-step checkout page layout. ' +
      'Adapt the number of steps to suit your needs, or make steps optional.',
    src: '/static/images/layouts/checkout.png',
    href: '/layouts/checkout',
    source: 'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/checkout',
  },
  {
    name: 'Dashboard',
    description:
      'A minimal dasboard with taskbar and mini variant draw. ' +
      'The chart is courtesy of Recharts, but it is simple to substitute an alternative.',
    src: '/static/images/layouts/dashboard.png',
    href: '/layouts/dashboard',
    source: 'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/dashboard',
  },
];

function Layouts(props) {
  const { classes } = props;
  return (
    <Grid container spacing={16}>
      {themes.map(theme => (
        <Grid item sm={6} md={4} className={classes.item} key={theme.name}>
          <Card className={classes.card}>
            <CardMedia
              component="a"
              href={theme.href}
              className={classes.cardMedia}
              image={theme.src}
              title={theme.name}
              target="_blank"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="headline" align="left" component="h2">
                {theme.name}
              </Typography>
              <Typography component="p">{theme.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component="a" href={theme.source} size="small" color="primary">
                Source code
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

Layouts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layouts);
