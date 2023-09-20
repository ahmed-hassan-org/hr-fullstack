/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import './dashboard.scss';
import { Grid, Typography, colors } from '@mui/material';

const dashboard = () => {
  return (
    <>
      <Grid container>
        <Grid item sm={12} xs={12} md={12}>
          <Typography variant="subtitle1">Dashboard Data</Typography>
        </Grid>
        <Grid item sm={12} xs={12} md={6} bgcolor={colors.blueGrey[300]}>
          <Typography variant="subtitle1">Dashboard Data</Typography>
        </Grid>
        <Grid item sm={12} xs={12} md={6} bgcolor={colors.cyan[400]}>
          <Typography variant="subtitle1">Dashboard Data</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default dashboard;
