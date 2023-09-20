/* eslint-disable react/jsx-no-useless-fragment */
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  colors,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Register = () => {
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

  const onSubmit = (value: any) => {
    console.log(value);
  };

  const onReset = () => {
    reset();
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
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h5"
                fontWeight={'700'}
                sx={{
                  textAlign: 'center',
                  color: colors.lightBlue['600'],
                  mb: '10px',
                }}
              >
                Create Account
              </Typography>
            </Box>
            <Box sx={{ width: '100%', my: '5px' }}>
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
                      variant="contained"
                      color="success"
                      sx={{ flex: 2 }}
                      onClick={handleSubmit(onSubmit)}
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
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Register;
