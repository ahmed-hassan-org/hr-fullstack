import React, { useEffect } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { useGetDepartmens } from '../../services/DepartmentsService';
type Props = {
  openModal: boolean;
  handleClose(): void;
};
const AddEmployee = (props: Props) => {
  const empSchema = yup.object({
    first_name: yup.string().min(3).required('first name is required'),
    last_name: yup.string().min(3).required('l;ast name is required'),
    email: yup
      .string()
      .email('enter valid email please')
      .required('first name is required'),
    employee_id: yup.number().optional(),
    phone_number: yup.string(),
    hire_date: yup.string(),
    job_id: yup.string(),
    salary: yup.number().min(1000),
    commission_pct: yup.number().min(0),
    manager_id: yup.string(),
    department_id: yup.number(),
  });

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      employee_id: undefined,
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      hire_date: '',
      job_id: '',
      salary: 0,
      commission_pct: 0,
      manager_id: '10',
      department_id: undefined,
    },
    resolver: yupResolver(empSchema),
  });
  const createEmployee = async (value: any) => {
    console.log(value);
  };

  const { data, isError, isLoading, isFetched } = useGetDepartmens();

  const onCloseModal = () => {
    reset();
    props.handleClose();
  };

  useEffect(() => {
    console.log('component start working');

    return () => {
      console.log('component desstroyed');
    };
  }, []);

  return (
    <Dialog
      open={props.openModal}
      onClose={props.handleClose}
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle fontWeight={'bold'}>Add Employee</DialogTitle>
      <DialogContent>
        <DialogContentText>Create new employee</DialogContentText>
        <Container maxWidth="lg" sx={{ my: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                autoFocus
                id="firstName"
                label="First name"
                variant="outlined"
                sx={{ width: '100%' }}
                {...register('first_name')}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="lastname"
                label="Last name"
                variant="outlined"
                sx={{ width: '100%' }}
                {...register('last_name')}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                sx={{ width: '100%' }}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="phoneNumber"
                label="Phone"
                variant="outlined"
                sx={{ width: '100%' }}
                {...register('phone_number')}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Basic date picker"
                    format="YYYY/MM/DD"
                    onChange={(val: any) => {
                      console.log(dayjs(val).format('YYYY-MM-DD'));
                      setValue('hire_date', dayjs(val).format('YYYY-MM-DD'));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="jobId"
                label="Job ID"
                variant="outlined"
                sx={{ width: '100%' }}
                {...register('job_id')}
                error={!!errors.job_id}
                helperText={errors.job_id?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                type="number"
                id="salay"
                label="Salary"
                variant="outlined"
                sx={{ width: '100%' }}
                {...register('salary')}
                error={!!errors.salary}
                helperText={errors.salary?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                type="number"
                id="commission_pct"
                label="Commission pct"
                variant="outlined"
                sx={{ width: '100%' }}
                {...register('commission_pct')}
                error={!!errors.commission_pct}
                helperText={errors.commission_pct?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="managerIdSelect">Manager ID</InputLabel>
                <Select
                  labelId="managerIdSelect"
                  id="managerIdSelect"
                  label="Manager Id"
                  value={String(getValues('manager_id')).valueOf()}
                  {...register('manager_id')}
                  onChange={(val: SelectChangeEvent) => {
                    console.log(String(val.target.value).valueOf());
                    setValue('manager_id', val.target.value, {
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                  error={!!errors.manager_id}
                >
                  <MenuItem value={'10'}>Ten</MenuItem>
                  <MenuItem value={'20'}>Twenty</MenuItem>
                  <MenuItem value={'30'}>Thirty</MenuItem>
                </Select>
                <FormHelperText>{errors.manager_id?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="deptId">Department ID</InputLabel>
                <Select
                  labelId="deptId"
                  id="deptId"
                  label="Department Id"
                  value={String(getValues('department_id')).valueOf()}
                  {...register('department_id')}
                  onChange={(val: SelectChangeEvent) => {
                    setValue('department_id', parseInt(val.target.value), {
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                  error={!!errors.department_id}
                >
                  {isFetched &&
                    data?.data.data.data.map((ele: any) => (
                      <MenuItem
                        value={ele.department_id}
                        key={ele.department_id}
                      >
                        {ele.department_name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.department_id?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color={'success'}
          onClick={handleSubmit(createEmployee)}
        >
          Create
        </Button>
        <Button variant="contained" color="error" onClick={onCloseModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployee;
