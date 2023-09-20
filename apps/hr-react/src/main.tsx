import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { RecoilRoot } from 'recoil';
import { blueGrey, deepOrange } from '@mui/material/colors';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: deepOrange['700'],
    },
  },
});

const queryClient = new QueryClient({});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
