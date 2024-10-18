import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material'; 

const TrafficAnalysis = () => { 
    return ( 
        <> 
            {/* Traffic Summary Cards */} 
            <Grid container spacing={3} mt={-10}> 
                <Grid item xs={12} sm={6} md={3}> 
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}> 
                        <Typography variant="h6">Total Data Transferred</Typography> 
                        <Typography variant="h4" sx={{ mt: 1 }}>0 GB</Typography> 
                    </Paper> 
                </Grid> 
                <Grid item xs={12} sm={6} md={3}> 
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}> 
                        <Typography variant="h6">Average Packet Size</Typography> 
                        <Typography variant="h4" sx={{ mt: 1 }}>0 KB</Typography> 
                    </Paper> 
                </Grid> 
                <Grid item xs={12} sm={6} md={3}> 
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}> 
                        <Typography variant="h6">Active Connections</Typography> 
                        <Typography variant="h4" sx={{ mt: 1 }}>0</Typography> 
                    </Paper> 
                </Grid> 
                <Grid item xs={12} sm={6} md={3}> 
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}> 
                        <Typography variant="h6">Protocol Distribution</Typography> 
                        <Typography variant="h4" sx={{ mt: 1 }}>N/A</Typography> 
                    </Paper> 
                </Grid> 
            </Grid>
 
            {/* Detailed Traffic Graphs */} 
            <Grid container spacing={3} sx={{ mt: 0 }}> 
                <Grid item xs={12} md={6}> 
                    <Paper elevation={3} sx={{ p: 2, height: '400px' }}> 
                        <Typography variant="h6">Inbound Traffic Over Time</Typography> 
                        <Box sx={{ mt: 0, height: '94%', backgroundColor: '#f5f5f5' }}> 
                            <Typography variant="body2" sx={{ p: 1, textAlign: 'center' }}> 
                                Inbound traffic graph will be displayed here. 
                            </Typography> 
                        </Box> 
                    </Paper> 
                </Grid> 
                <Grid item xs={12} md={6}> 
                    <Paper elevation={3} sx={{ p: 2, height: '400px' }}> 
                        <Typography variant="h6">Outbound Traffic Over Time</Typography> 
                        <Box sx={{ mt: 0, height: '94%', backgroundColor: '#f5f5f5' }}> 
                            <Typography variant="body2" sx={{ p: 1, textAlign: 'center' }}> 
                                Outbound traffic graph will be displayed here. 
                            </Typography> 
                        </Box> 
                    </Paper> 
                </Grid> 
            </Grid> 

            {/* Protocol Distribution and Top Talkers */} 
            <Grid container spacing={3} sx={{ mt: 0 }}> 
                <Grid item xs={12} md={6}> 
                    <Paper elevation={3} sx={{ p: 2, height: '400px' }}> 
                        <Typography variant="h6">Protocol Distribution</Typography> 
                        <Box sx={{ mt: 0, height: '94%', backgroundColor: '#f5f5f5' }}> 
                            <Typography variant="body2" sx={{ p: 1, textAlign: 'center' }}> 
                                Protocol distribution chart will be displayed here. 
                            </Typography> 
                        </Box> 
                    </Paper> 
                </Grid> 
                <Grid item xs={12} md={6}> 
                    <Paper elevation={3} sx={{ p: 2, height: '400px' }}> 
                        <Typography variant="h6">Top Talkers</Typography> 
                        <Box sx={{ mt: 0, height: '94%', backgroundColor: '#f5f5f5' }}> 
                            <Typography variant="body2" sx={{ p: 1, textAlign: 'center' }}> 
                                Top talkers table will be displayed here. 
                            </Typography> 
                        </Box> 
                    </Paper> 
                </Grid> 
            </Grid> 
        </> 
    ); 
}; 

export default TrafficAnalysis; 
