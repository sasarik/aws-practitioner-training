import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Header from '~/components/MainLayout/components/Header';
import Box from '@mui/material/Box';
import { TITLE, VERSION } from '~/constants/branding';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" underline="hover">
        {`${TITLE}`}
      </Link>{' '}
      {new Date().getFullYear()}
      {`. ${VERSION}`}
    </Typography>
  );
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container sx={{ pb: 8 }} maxWidth="md">
          {children}
        </Container>
      </main>
      <Box component={'footer'} sx={{ bgcolor: (theme) => theme.palette.background.paper, padding: 6 }}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thank you for your purchase!
        </Typography>
        <Copyright />
      </Box>
    </>
  );
};

export default MainLayout;
