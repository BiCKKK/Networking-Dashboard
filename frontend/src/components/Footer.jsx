import React from "react";   
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 2,
      textAlign: 'center',
      mt: 'auto',
      backgroundColor: 'f0f0f0',
    }}
  >
    <Typography variant="body2" color="textSecondary">
      2024 Networking Dashboard, work in progress!
    </Typography>
  </Box>
);   

export default Footer; 