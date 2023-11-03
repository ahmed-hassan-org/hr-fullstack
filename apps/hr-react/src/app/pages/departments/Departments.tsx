/* eslint-disable react/jsx-no-useless-fragment */
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useGetDepartmens } from '../../services/DepartmentsService';
import CenterContainer from '../../components/layout/CenterContainer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SwiperSlider from '../../components/shared/SwiperSlider';

const Departments = () => {
  const { data, isError, isLoading, refetch, isFetched } = useGetDepartmens();
  console.log(data?.data.data.data);

  const columns: GridColDef[] = [
    {
      field: 'department_id',
      headerName: 'ID',
      width: 70,
      description: ' the is of employee',
    },
    { field: 'department_name', headerName: 'Dept name', width: 200 },
    { field: 'location_id', headerName: 'Location', width: 130 },
  ];

  if (isLoading) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          <Paper
            sx={{
              px: '10px',
              py: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">Departments</Typography>
            <Button variant="contained" color="secondary">
              Add
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={12} md={12}>
          {data?.data && (
            <DataGrid
              rows={data?.data.data.data}
              getRowId={(row) => row['department_id']}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              checkboxSelection
              disableRowSelectionOnClick
              loading={isLoading}
              paginationMode="server"
              paginationModel={{
                pageSize: 5,
                page: 0,
              }}
              pagination={true}
            />
          )}
        </Grid>
        <Grid xs={12} sm={12} md={12}>
          <SwiperSlider />
        </Grid>
      </Grid>
    </>
  );
};

export default Departments;
