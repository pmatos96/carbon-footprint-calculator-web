'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import AppNavBar from './appNavBar';

const pageItems = [{ name: 'HOME', route: '/' }, { name: 'CALCULATOR', route: '/calculator' }];

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: 'azure', height: '100vh' }}>
        <AppNavBar pageItems={pageItems}/>
        <Box p={2}>
          {children}
        </Box>
      </body>
    </html>
  );
}

export default RootLayout;