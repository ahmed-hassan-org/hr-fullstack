import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { RecoilRoot } from 'recoil';
import { blueGrey, deepOrange } from '@mui/material/colors';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'light',
    primary: {
      main: blueGrey[700],
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
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<CircularProgress />}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </StrictMode>
);
