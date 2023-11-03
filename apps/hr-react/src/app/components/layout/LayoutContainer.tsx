import { Container, Grid, colors } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: Props) => {
  return (
    <Grid container>
      <Grid
        item
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: colors.blueGrey['300'],
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default LayoutContainer;
