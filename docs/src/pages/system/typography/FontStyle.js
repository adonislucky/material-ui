import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function FontStyle() {
  return (
    <Typography component="div">
      <Box sx={{ fontStyle: 'normal', m: 1 }}>Normal font style.</Box>
      <Box sx={{ fontStyle: 'italic', m: 1 }}>Italic font Style.</Box>
      <Box sx={{ fontStyle: 'oblique', m: 1 }}>Oblique font style.</Box>
    </Typography>
  );
}
