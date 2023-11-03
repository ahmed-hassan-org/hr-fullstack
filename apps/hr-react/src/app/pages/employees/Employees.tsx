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
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowModel,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetEmplpyees } from '../../services/EmplooyeeService';
import AddEmployee from './AddEmployee';

const Employees = () => {
  const router = useNavigate();
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 5,
  });
  const { data, isError, isLoading, refetch, isFetched } = useGetEmplpyees(
    pageModel.pageSize,
    pageModel.page
  );
  const meta = data?.data.data.meta;

  const toHome = () => {
    router('/');
  };
  const [open, setOpen] = useState(false);
  const [addEmpModalState, setAddEmpModalState] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const cancelAddEmployee = () => {
    setAddEmpModalState(false);
  };

  const addEmployee = () => {
    setAddEmpModalState(true);
  };

  const onPageChange = (data: GridPaginationModel) => {
    console.log(data);
    setPageModel(data);
    refetch();
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
      field: 'job_id',
      headerName: 'Job ID',
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
            <Button variant="contained" color="secondary" onClick={addEmployee}>
              Add
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={12} md={12}>
          {data?.data && (
            <DataGrid
              rows={data?.data.data.data}
              getRowId={(row) => row['employee_id']}
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
              rowCount={meta?.total}
              pagination={true}
              paginationModel={{
                pageSize: 5,
                page: 0,
              }}
              onPaginationModelChange={(m) => {
                console.log(m);
              }}
            />
          )}
        </Grid>
      </Grid>
      {addEmpModalState && (
        <AddEmployee
          openModal={addEmpModalState}
          handleClose={cancelAddEmployee}
        />
      )}
    </>
  );
};

export default Employees;
