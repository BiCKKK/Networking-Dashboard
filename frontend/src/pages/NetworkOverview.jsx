import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import NetworkTopology from "../components/network/NetworkTopology";

const NetworkOverview = () => {
    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);
    const [activeNodeCount, setActiveNodeCount] = useState(0);
    const toggleNetworkConnection = () => {
        setIsNetworkConnected(!isNetworkConnected);
    };
    return (
        <Grid container spacing={3} mt={-10} >
            {/* Connect to the Network Box */}
            <Grid item xs={12} sm={6} lg={6}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100px' }}>
                    <Typography variant="h6" sx={{ mt: -1.5 }}>Connect to Network</Typography>
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
            </Grid>

            {/* Nodes Connected Box */}
            <Grid item xs={12} sm={6} lg={6}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100px' }}>
                    <Typography variant="h6" sx={{ mt: -1.5 }}>Active nodes</Typography>
                    <Typography variant="h3" sx={{ mt: 1 }}>
                        {activeNodeCount}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Total nodes in the Network: {nodeCount}
                    </Typography>
                </Paper>
            </Grid>

            {/* Main Section */}
            <Grid container spacing={3} mt={0} mx={0}>
                <Grid item xs={12}>
                    {/* Network Topology Box */}
                    <Paper elevation={3} sx={{ p: 3, height: '600px', position: 'relative', overflow: 'hidden'}}>
                        <Typography variant="h6">Network Topology</Typography>
                        {/* Placeholder for network topology visualization */}
                        <Box sx={{ mt: 2, height: '94%', overflow: 'hidden', position: 'relative', backgroundColor: '#f5f5f5' }}>
                            {/* Network topology will be displayed here. */}
                            <NetworkTopology />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NetworkOverview;
