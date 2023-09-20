/* eslint-disable react/jsx-no-useless-fragment */
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  colors,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetEmplpyees } from '../../services/EmplooyeeService';

const Employees = () => {
  const router = useNavigate();

  const { data, isError, isLoading, refetch, isFetched } = useGetEmplpyees();

  const toHome = () => {
    router('/');
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const columns: GridColDef[] = [
    {
      field: 'employee_id',
      headerName: 'ID',
      width: 70,
      description: ' the is of employee',
    },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    {
      field: 'email',
      headerName: 'email',
      type: 'string',
      width: 90,
    },
    {
      field: 'phone_number',
      headerName: 'Phone',
      type: 'string',
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
    },
    {
      field: 'department_id',
      headerName: 'Department',
      type: 'number',
    },
  ];

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (isError) {
    return (
      <Paper sx={{ width: '100%', bgcolor: colors.red['300'] }}>
        <Typography variant="subtitle2">No Data Found</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
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
            <Typography variant="body1">Employees</Typography>
            <Button variant="contained" color="secondary">
              Add
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={12} md={12}>
          {data?.data && (
            <DataGrid
              rows={data?.data.data}
              getRowId={(row) => row['employee_id']}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              loading={isLoading}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Employees;
