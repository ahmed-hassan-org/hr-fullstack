/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Grid, colors } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Hrnavbar from '../../components/layout/Navbar/Hrnavbar';

const Home = () => {
  return (
    <>
      <Grid container>
        <Grid item sm={12} md={12}>
          <Hrnavbar />
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          sx={{
            bgcolor: colors.blue['200'],
            height: '100vh',
            pt: '10px',
            px: '10px',
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
