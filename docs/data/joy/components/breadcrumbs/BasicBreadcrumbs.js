import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BasicBreadcrumbs() {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumbs">
      {['Fry', 'Leela', 'Bender', 'Linda'].map((item) => (
        <Link
          // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
          onClick={(event) => event.preventDefault()}
          key={item}
          underline="hover"
          color="neutral"
          fontSize="inherit"
          href="/"
        >
          {item}
        </Link>
      ))}

      <Typography fontSize="inherit">Amy</Typography>
    </Breadcrumbs>
  );
}
