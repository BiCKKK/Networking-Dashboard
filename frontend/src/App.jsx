import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
// Import other components as needed

const App = () => (
  <Box sx={{display: 'flex'}}>
    <CssBaseline />
    <Header />
    <Sidebar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100%-240px)`},
        ml: {sm: '240px'}
      }}
    >
      <Toolbar />
        {/*Main content will go here*/}
        <Box sx={{minHeight: '80vh'}}>
          <h2>Welcome to the Network Monitoring Dashboard</h2>
        </Box>
        <Footer />
    </Box>
  </Box>
);

export default App;