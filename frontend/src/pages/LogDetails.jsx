import React from 'react'; 
import { Box, Paper, Typography } from '@mui/material'; 

const LogDetails = ({ log }) => { 
    return ( 
        <Paper elevation={3} sx={{ p: 2, mt: -2 }}> 
            <Typography variant="h6">Log Details</Typography> 
            <Box sx={{ mt: 2 }}> 
                <Typography variant="body1"><strong>Timestamp:</strong> {log.timestamp}</Typography> 
                <Typography variant="body1"><strong>Source:</strong> {log.source}</Typography> 
                <Typography variant="body1"><strong>Severity:</strong> {log.severity}</Typography> 
                <Typography variant="body1"><strong>Message:</strong> {log.message}</Typography> 
            </Box> 
        </Paper> 
    ); 
}; 

export default LogDetails; 