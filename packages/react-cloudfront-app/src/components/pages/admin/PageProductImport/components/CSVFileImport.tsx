import React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

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
    console.log('~~~~~~~ uploadFile:', file.name);

    const response = await axios({
      method: 'GET',
      url,
      params: {
        fileName: encodeURIComponent(file.name),
      },
    });

    const { signedUrl } = response.data ?? {};
    console.log('Use upload signed url: ', signedUrl);
    const result = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
    });

    console.log('~~~~~~~ Result: ', result);
    setFile(undefined);
  };
  return (
    <Box>
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
