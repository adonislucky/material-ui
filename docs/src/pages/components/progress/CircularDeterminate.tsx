import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

function CircularDeterminate() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <CircularProgress className={classes.progress} variant="determinate" value={progress} />
      <CircularProgress
        className={classes.progress}
        variant="determinate"
        value={progress}
        color="secondary"
      />
    </div>
  );
}

export default CircularDeterminate;
