import React from 'react';
import axios, { AxiosError } from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';

type CSVFileImportProps = {
  url: string;
  title: string;
};

const ALERT_POSITION: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

const FULL_WIDTH = { width: '100%' };

type AlertDisplayOptions =
  | { isDisplayed: false }
  | { isDisplayed: true; message: string; severity: AlertColor | undefined };

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const [alertOptions, setAlertOptions] = React.useState<AlertDisplayOptions>({ isDisplayed: false });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    if (!file) return;

    try {
      const response = await axios({
        method: 'GET',
        url,
        headers: {
          // Comment "Authorization" to simulate 401
          Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
        },
        params: {
          fileName: encodeURIComponent(file.name),
        },
      });

      const { signedUrl } = response.data ?? {};

      await fetch(signedUrl, {
        method: 'PUT',
        body: file,
      });

      setAlertOptions({
        isDisplayed: true,
        message: `The "${file.name}" is successfully uploaded`,
        severity: 'success',
      });
      setFile(undefined);
    } catch (error) {
      setAlertOptions({
        isDisplayed: true,
        message: error instanceof AxiosError ? error.message : String(error),
        severity: 'error',
      });
    }
  };

  const handleAlertClose = React.useCallback(() => setAlertOptions({ isDisplayed: false }), []);

  return (
    <Box>
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
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
