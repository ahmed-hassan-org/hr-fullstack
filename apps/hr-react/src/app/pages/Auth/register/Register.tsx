/* eslint-disable react/jsx-no-useless-fragment */
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  colors,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useRegisterApi } from '../../../services/AuthService';
import { RegisterModel } from '@wapelSharedLib/core/models/interfaace/AppAuthEntity.interface';
import HrLogo from '../../../components/icons/HrLogo';

const Register = () => {
  const router = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackState, setSnackState] = useState<{
    message: string;
    sevirty: AlertColor;
  }>({
    message: '',
    sevirty: 'success',
  });

  const openSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const registerSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email('enter a valid email').required(),
    password: yup
      .string()
      .min(8, 'min length is 8 char for password')
      .max(15)
      .required('password is requried'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const { mutateAsync, isError, isLoading } = useRegisterApi();

  const doRegister = async (value: RegisterModel) => {
    if (isValid) {
      try {
        const { data, status } = await mutateAsync(value);

        if (status === 200 || status === 201) {
          console.log(data);
          setOpen(true);
          setSnackState({
            message: data.message ?? 'new user created',
            sevirty: 'success',
          });
          router('/auth/login');
        }
      } catch (error: any) {
        console.log(error.response?.data.message);
        setOpen(true);
        setSnackState({
          message: error.response?.data.message,
          sevirty: 'error',
        });
      }
    }
  };

  const onReset = () => {
    reset();
  };

  const backToLogin = () => {
    router('/auth/login');
  };

  return (
    <>
      <Container
        maxWidth={'sm'}
        sx={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <IconButton
                aria-label="ArrowBack"
                color="default"
                onClick={backToLogin}
              >
                <ArrowBack />
              </IconButton>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              boxShadow={2}
            >
              <HrLogo />
              <Typography
                variant="h5"
                fontWeight={'bold'}
                sx={{ textAlign: 'center', margin: '0 10px' }}
                color={colors.blue['900']}
              >
                BlueBird HR
              </Typography>
            </Box>
            <Box sx={{ width: '100%', my: '5px' }}>
              <form onSubmit={handleSubmit(doRegister)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      id="email"
                      label="Email"
                      variant="outlined"
                      sx={{ width: '100%' }}
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      sx={{ width: '100%' }}
                      {...register('username')}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      sx={{ width: '100%' }}
                      {...register('password')}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                  <Grid item sm={12} md={12}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ flex: 2 }}
                      >
                        Create Account
                      </Button>
                      <Divider orientation="vertical" sx={{ flex: 2 }} />
                      <Button
                        variant="outlined"
                        sx={{ flex: 1 }}
                        onClick={onReset}
                      >
                        Reset
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onDurationChange={handleClose}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackState.sevirty}
          sx={{ width: '100%' }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
