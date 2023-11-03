// Import Swiper styles
import 'swiper/css';
import './app.scss';
import './core/intercceptor/HrInterceptor';
import Routing from './core/router/Routing';
import './translation/i18n';
import SidebarDrawer from './components/layout/SidebarDrawer/SidebarDrawer';
import LayoutContainer from './components/layout/LayoutContainer';

export function App() {
  return (
    // <Box
    //   sx={{
    //     bgcolor: colors.blueGrey['100'],
    //     width: '100%',
    //     height: '100vh',
    //     padding: 0,
    //     margin: 0,
    //   }}
    // >
    <LayoutContainer>
      <Routing />
      <SidebarDrawer />
    </LayoutContainer>
    //  {/* </Box> */}
  );
}

export default App;
