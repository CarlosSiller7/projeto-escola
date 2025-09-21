import * as React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

export default function BasicBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link 
          underline="hover" 
          color="inherit" 
          href="/"
        >
          Página Inicial
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/react-breadcrumbs/"
        >
          Material UI
        </Link>
        <Typography color="text.primary">
          Breadcrumbs
        </Typography>
      </Breadcrumbs>
    </div>
  );
}