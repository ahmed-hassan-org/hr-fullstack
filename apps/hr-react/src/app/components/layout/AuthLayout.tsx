/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          sm={12}
          md={12}
          sx={{
            height: '100vh',
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLayout;
