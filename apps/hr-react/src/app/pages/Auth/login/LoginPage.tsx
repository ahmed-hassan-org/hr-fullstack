/* eslint-disable react/jsx-no-useless-fragment */
import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  colors,
} from '@mui/material';
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginApi, useVerifyOtp } from '../../../services/AuthService';
import { useState } from 'react';
import { LocalStorageKeysReact } from '../../../core/models/enum/LocalStorgeKeysReact.enum';
import { useRecoilState } from 'recoil';
import { useAuthState } from '../../../store/AuthState';
import { useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';

const Login = () => {
  const loginSchema = yup.object({
    email: yup.string().email('enter a valid email').required(),
    password: yup.string().required('password is requried'),
  });
  const [authState, setAuthState] = useRecoilState(useAuthState);
  const [isOtpEnabled, setisOtpEnabled] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const {
    mutateAsync,
    isLoading,
    isSuccess,
    isError,
    error: loginErrors,
  } = useLoginApi();
  const {
    mutateAsync: otpMutateAsync,
    isLoading: otpIsLoading,
    isSuccess: otpIsSuccess,
    isError: otpIsError,
    error: otpErrors,
  } = useVerifyOtp();

  const [otp, setOtp] = useState('');

  const handleOtpChange = (newValue: any) => {
    setOtp(newValue);
  };

  const onSubmit = async (value: any) => {
    try {
      if (isValid) {
        const { data, status } = await mutateAsync(value);
        const { token, roles, isOtpEnabled } = data.data;
        setisOtpEnabled(isOtpEnabled);
        sessionStorage.setItem(LocalStorageKeysReact.APP_TOKEN, token);
        sessionStorage.setItem(LocalStorageKeysReact.APP_ROLES, roles);
        sessionStorage.setItem(LocalStorageKeysReact.APP_IS_LOGGEDIN, 'true');
        setAuthState({ isLoggedIn: true, token: token, roles: roles });
        if (!isOtpEnabled) {
          navigate('/'); // to dashboard page
        } else {
          setisOtpEnabled(isOtpEnabled);
        }
      }
    } catch (error) {
      console.log('erpr her');
    }
  };

  const verifyOtp = async () => {
    const { status, data } = await otpMutateAsync({
      email: getValues('email'),
      twoFactorAuthenticationCode: otp,
    });
    console.log(data);

    if (status === 200 || status === 201) {
      navigate('/'); // to dashboard page
      return;
    }
  };

  const onReset = () => {
    reset();
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
          {!isOtpEnabled && (
            <CardContent>
              {isError && (
                <Alert severity="error" sx={{ mb: '3px' }}>
                  <AlertTitle sx={{ fontWeight: 'bold' }}>
                    Login errors
                  </AlertTitle>
                  {loginErrors && (loginErrors as any).response?.data?.errors}
                </Alert>
              )}
              {isSuccess && (
                <Alert severity="success" sx={{ mb: '3px' }}>
                  <AlertTitle sx={{ fontWeight: 'bold' }}>
                    Login success
                  </AlertTitle>
                  Logged in success
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <LockOpenOutlined color="secondary" sx={{ mx: '10px' }} />
                  <Typography
                    variant="h5"
                    fontWeight={'bold'}
                    sx={{ textAlign: 'center' }}
                  >
                    HR Login
                  </Typography>
                </Box>
                <Grid container sx={{ my: '10px' }} spacing={2}>
                  <Grid item sm={12} md={12} lg={12}>
                    <TextField
                      id="emailId"
                      label="Email"
                      variant="outlined"
                      sx={{ width: '100%' }}
                      {...register('email')}
                      helperText={errors && errors.email?.message}
                      error={!!errors.email}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      id="passwordId"
                      label="Password"
                      variant="outlined"
                      type="password"
                      sx={{ width: '100%' }}
                      {...register('password')}
                      helperText={errors && errors.password?.message}
                      error={!!errors.password}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Button variant="contained" type={'submit'}>
                        Login
                      </Button>
                      <Button variant="outlined" onClick={onReset}>
                        Reset
                      </Button>
                    </Box>
                    <Box sx={{ width: '100%', my: '10px' }}>
                      <Typography
                        variant="h6"
                        fontWeight={'bold'}
                        color={colors.lightGreen['800']}
                        textAlign={'center'}
                      >
                        <Link
                          href={'/auth/register'}
                          color={colors.lightGreen['800']}
                          underline="hover"
                        >
                          Create Account
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          )}

          {isOtpEnabled && (
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
                <Grid container sx={{ my: '10px' }} spacing={2}>
                  <Grid item sm={12} md={12} lg={12}>
                    <Typography
                      variant="body1"
                      color={colors.deepOrange['A400']}
                    >
                      Enter Otp From Authenticator
                    </Typography>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <MuiOtpInput
                      value={otp}
                      length={6}
                      onChange={handleOtpChange}
                      onComplete={verifyOtp}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Login;
