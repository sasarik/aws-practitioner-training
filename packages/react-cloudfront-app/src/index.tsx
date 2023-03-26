import { createRoot } from 'react-dom/client';
import App from '~/components/App/App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '~/theme';
import axios, { AxiosError } from 'axios';
import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';
import React, { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: Infinity },
  },
});

const ALERT_POSITION: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

const FULL_WIDTH = { width: '100%' };

type AlertDisplayOptions =
  | { isDisplayed: false }
  | { isDisplayed: true; message: string; severity: AlertColor | undefined };

const Main = () => {
  const [alertOptions, setAlertOptions] = React.useState<AlertDisplayOptions>({ isDisplayed: false });
  const handleAlertClose = React.useCallback(() => setAlertOptions({ isDisplayed: false }), []);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        setAlertOptions({
          isDisplayed: true,
          message: error instanceof AxiosError ? error.message : String(error),
          severity: 'error',
        });
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Snackbar
            anchorOrigin={ALERT_POSITION}
            open={alertOptions.isDisplayed}
            autoHideDuration={4000}
            onClose={handleAlertClose}
          >
            <Alert
              onClose={handleAlertClose}
              severity={alertOptions.isDisplayed ? alertOptions.severity : undefined}
              sx={FULL_WIDTH}
            >
              {alertOptions.isDisplayed ? alertOptions.message : undefined}
            </Alert>
          </Snackbar>
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Main />);
