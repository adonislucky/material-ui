import * as React from 'react';
import Box from '@material-ui/core/Box';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import LaptopIcon from '@material-ui/icons/Laptop';
import TvIcon from '@material-ui/icons/Tv';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

export default function ToggleButtonNotEmpty() {
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['phone']);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    if (newFormats.length) {
      setFormats(newFormats);
    }
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <Box sx={{ my: 2 }}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified" disabled>
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Grid>
      <Grid item sm={12} md={6}>
        <Box sx={{ my: 2 }}>
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="device"
          >
            <ToggleButton value="laptop" aria-label="laptop">
              <LaptopIcon />
            </ToggleButton>
            <ToggleButton value="tv" aria-label="tv">
              <TvIcon />
            </ToggleButton>
            <ToggleButton value="phone" aria-label="phone">
              <PhoneAndroidIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Grid>
    </Grid>
  );
}
