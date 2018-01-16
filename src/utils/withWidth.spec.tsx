import * as React from 'react';
import { Grid } from '..';
import { Theme } from '../styles';
import withStyles, { WithStyles } from '../styles/withStyles';
import withWidth, { WithWidthProps } from '../utils/withWidth';

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.faintBlack,
  },
});

interface IHelloProps {
  name?: string;
}

export class Hello extends React.Component<IHelloProps & WithWidthProps & WithStyles<'root'>> {
  public static defaultProps = {
    name: 'Alex',
  };

  public render() {
    return (
      <Grid
        className={this.props.classes.root}
        direction={this.props.width === 'sm' ? 'column' : 'row'}
      >
        <h1>Hello {this.props.name}!</h1>
      </Grid>
    );
  }
}

const Decorated = withWidth()(withStyles(styles)(Hello));

<Decorated name="Bob" />;
