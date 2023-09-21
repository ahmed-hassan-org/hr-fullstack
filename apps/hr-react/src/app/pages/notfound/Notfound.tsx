import { Box, Button, Paper, Typography, colors } from '@mui/material';
import React from 'react';
import { LocalStorageKeysReact } from '../../core/models/enum/LocalStorgeKeysReact.enum';
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
  const router = useNavigate();

  const token: string = sessionStorage.getItem(
    LocalStorageKeysReact.APP_TOKEN
  ) as string;
  const { decodedToken, isExpired } = useJwt<string>(token ?? '');

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          px: '20px',
          py: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" color={colors.red['600']} sx={{ mb: '10px' }}>
          No Data Found
        </Typography>
        {isExpired && (
          <Button variant="contained" onClick={() => router('/auth/login')}>
            Back To Login
          </Button>
        )}
        {!isExpired && (
          <Button variant="contained" onClick={() => router('/')}>
            Back To Dashboard
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Notfound;
