import { Box, colors } from '@mui/material';
import './app.scss';
import './core/intercceptor/HrInterceptor';
import Routing from './core/router/Routing';
import SidebarDrawer from './shared/layouts/SidebarDrawer/SidebarDrawer';
import './translation/i18n';

export function App() {
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
