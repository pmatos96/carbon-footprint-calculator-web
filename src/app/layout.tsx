'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { Metadata } from "next";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import SpaIcon from '@mui/icons-material/Spa';
import Box from '@mui/material/Box';
import { Button, Menu, MenuItem, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pageItems = [{ name: 'HOME', route: '/' }, { name: 'CALCULATOR', route: '/calculator' }]

  const router = useRouter();

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppBar sx={{ padding: 2 }} position='static'>
          <Grid justifyContent="space-between" container alignItems="center">
            <Grid container>
              <SpaIcon fontSize='medium' sx={{ marginRight: 1 }} />
              <Typography variant="h6">
                Carbon Footprint calculator
              </Typography>
            </Grid>
            <Toolbar>
              <Box>
                {pageItems.map(item => {
                  return (<Button key={item.name} onClick={() => router.push(item.route)}>
                    <Typography variant='button' color='white'>{item.name}</Typography>
                  </Button>)
                })}
              </Box>
            </Toolbar>
          </Grid>
        </AppBar>
        <Box sx={{ backgroundColor: 'azure' }}>
          {children}
        </Box>
      </body>
    </html>
  );
}
