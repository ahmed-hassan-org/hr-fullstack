/* eslint-disable react/jsx-no-useless-fragment */
import { Card, CardContent, Grid, Typography, colors } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetOneEmplpyee } from '../../services/EmplooyeeService';

const Dashboard = () => {
  const [empvalue, setEmpValue] = useState<any>(100);
  const { data, error } = useGetOneEmplpyee(empvalue);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item sm={12} xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                textAlign={'center'}
                fontWeight={'600'}
                variant="h6"
                component={'h6'}
                color={colors.blue['800']}
              >
                Employees
              </Typography>
              <Typography variant="subtitle2" color={colors.blue['400']}>
                Count: 4444
              </Typography>
              <Typography variant="subtitle2" color={colors.blue['400']}>
                Salary: 566655
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                textAlign={'center'}
                fontWeight={'600'}
                variant="h6"
                component={'h6'}
                color={colors.blue['800']}
              >
                Departments
              </Typography>
              <Typography variant="subtitle2" color={colors.blue['400']}>
                Count: 4444
              </Typography>
              <Typography variant="subtitle2" color={colors.blue['400']}>
                Salary: 566655
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                textAlign={'center'}
                fontWeight={'600'}
                variant="h6"
                component={'h6'}
                color={colors.blue['800']}
              >
                Locations
              </Typography>
              <Typography variant="subtitle2" color={colors.blue['400']}>
                Count: 4444
              </Typography>
              <Typography variant="subtitle2" color={colors.blue['400']}>
                Salary: 566655
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                textAlign={'center'}
                fontWeight={'600'}
                variant="h6"
                component={'h6'}
                color={colors.blue['800']}
              >
                Country
              </Typography>
              <Typography variant="subtitle2" color={colors.blue['400']}>
                Count: 4444
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
