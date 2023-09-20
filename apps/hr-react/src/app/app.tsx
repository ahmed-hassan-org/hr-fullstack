import { Box, colors } from '@mui/material';
import './app.scss';
import Routing from './core/router/Routing';
import SidebarDrawer from './shared/layouts/SidebarDrawer/SidebarDrawer';
import './translation/i18n';
import './core/intercceptor/HrInterceptor';
import { useJwt } from 'react-jwt';
import { LocalStorageKeysReact } from './core/models/enum/LocalStorgeKeysReact.enum';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function App() {
  // const token: string = sessionStorage.getItem(
  //   LocalStorageKeysReact.APP_TOKEN
  // ) as string;
  // const { decodedToken, isExpired } = useJwt<string>(token);
  // const router = useNavigate();

  // useEffect(() => {
  //   if (isExpired) {
  //     console.log('from app compo is token end: ', isExpired);
  //     router('/auth/login');
  //   }
  // }, [isExpired]);

  return (
    <Box
      sx={{
        bgcolor: colors.blueGrey['100'],
        width: '100%',
        height: '100vh',
        padding: 0,
        margin: 0,
      }}
    >
      <Routing />
      <SidebarDrawer />
    </Box>
  );
}

export default App;
