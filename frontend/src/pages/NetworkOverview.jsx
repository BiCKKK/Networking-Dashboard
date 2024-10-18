import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

const NetworkOverview = () => {
    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);

    const toggleNetworkConnection = () => {
        setIsNetworkConnected(!isNetworkConnected);
    };

    return (
        <Box sx={{ px: 2, height: 'auto', width: '100%' }}>
            {/* Top Section Grids */}
            <Grid2 container spacing={5} mt={-4}>
                {/* Connect to the Network Box */}
                <Grid2 item xs={12} md={6} lg={6} >
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '150px', width: '100%' }}>
                        <Typography variant="h6">Connect to Network</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            {isNetworkConnected ? 'Network Connected' : 'Network not Connected!'}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleNetworkConnection}
                            sx={{ mt: 2, backgroundColor: '#212121' }}
                        >
                            {isNetworkConnected ? 'Disconnect' : 'Connect'}
                        </Button>
                    </Paper>
                </Grid2>

                {/* Nodes Connected Box */}
                <Grid2 item xs={12} md={6} lg={6}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '150px', width: '100%' }}>
                        <Typography variant="h6">Nodes connected</Typography>
                        <Typography variant="h3" sx={{ mt: 1 }}>
                            {nodeCount}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Total nodes in the Network
                        </Typography>
                    </Paper>
                </Grid2>
            </Grid2>

            {/* Main Section */}
            <Grid2 container spacing={5} sx={{ mt: 3 }}>
                {/* Network Topology Box */}
                <Grid2 item xs={12} md={6} lg={6}>
                    <Paper elevation={3} sx={{ p: 3, height: '500px', width: '100%' }}>
                        <Typography variant="h6">Network Topology</Typography>
                        <Box sx={{ mt: 2, height: '100%', backgroundColor: 'f5f5f5' }}>
                            <Typography variant="body2" sx={{ p: 1, textAlign: 'center' }}>
                                Network topology will be displayed here.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid2>

                {/* Network Traffic Graph Box */}
                <Grid2 item xs={12} md={6} lg={6}>
                    <Paper elevation={3} sx={{ p: 3, height: '500px', width: '100%' }}>
                        <Typography variant="h6">Network Traffic</Typography>
                        <Box sx={{ mt: 2, height: '100%', backgroundColor: 'f5f5f5' }}>
                            <Typography variant="body2" sx={{ p: 1, textAlign: 'center' }}>
                                Network Traffic will be displayed here.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid2> 
            </Grid2>
        </Box>
    );
};

export default NetworkOverview;
