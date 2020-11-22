import * as React from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Box from '@material-ui/core/Box';

export default function Why() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 'borderRadius',
        p: 2,
        minWidth: 300,
      }}
    >
      <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
      <Box
        sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'fontWeightMedium' }}
      >
        98.3 K
      </Box>
      <Box
        component={TrendingUpIcon}
        sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }}
      />
      <Box
        sx={{
          color: 'success.dark',
          display: 'inline',
          fontWeight: 'fontWeightMedium',
          mx: 0.5,
        }}
      >
        18.77%
      </Box>
      <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
        vs last week
      </Box>
    </Box>
  );
}
