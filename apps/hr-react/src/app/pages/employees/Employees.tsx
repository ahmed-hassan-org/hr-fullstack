import { Button, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const router = useNavigate();

  const toHome = () => {
    router('/');
  };
  return (
    <div>
      <Grid>
        <GridItem>
          <Button onClick={toHome}>To Home</Button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Employees;
