import { Box, colors } from '@mui/material';
import { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import './app.scss';
import './core/intercceptor/HrInterceptor';
import { LocalStorageKeysReact } from './core/models/enum/LocalStorgeKeysReact.enum';
import Routing from './core/router/Routing';
import SidebarDrawer from './shared/layouts/SidebarDrawer/SidebarDrawer';
import './translation/i18n';

export function App() {
  const { isExpired } = useJwt<string>(
    sessionStorage.getItem(LocalStorageKeysReact.APP_TOKEN) as string
  );
  const router = useNavigate();

  useEffect(() => {
    if (isExpired) {
      router('/auth/login');
    }
  }, [isExpired]);

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
