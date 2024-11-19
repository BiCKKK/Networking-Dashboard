import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NetworkTopology from "../components/network/NetworkTopology";
import axios from "axios";

const NetworkOverview = () => {
    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);
    const [activeNodeCount, setActiveNodeCount] = useState(0);
    const [isSimulationRunning, setIsSimulationRunning] = useState(false); // Tracks simulation status
    const [simulationStatus, setSimulationStatus] = useState(""); // To display simulation status messages

    // Function to fetch node counts
    const fetchNodeCounts = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/node_counts');
            setNodeCount(response.data.node_count);
            setActiveNodeCount(response.data.active_node_count);
        } catch (error) {
            console.error("Error fetching node counts:", error);
        }
    };

    // Handler to toggle simulation
    const toggleSimulation = async () => {
        if (isSimulationRunning) {
            try {
                await axios.post('http://localhost:5100/api/stop_sim');
                setIsSimulationRunning(false);
                setSimulationStatus("Simulation Stopped.");
                setTimeout(fetchNodeCounts, 5000);
            } catch (error) {
                console.error("Error stopping simulation:", error);
                setSimulationStatus("Failed to stop simulation.");
            }
        } else {
            try {
                await axios.post('http://localhost:5100/api/start_sim');
                setIsSimulationRunning(true);
                setSimulationStatus("Simulation Started.");
                setTimeout(fetchNodeCounts, 5000);
            } catch (error) {
                console.error("Error starting simulation:", error);
                setSimulationStatus("Failed to start the simulation.")
            }
        }
    }

    const toggleNetworkConnection = async () => {
        if (isNetworkConnected) {
            try {
                await axios.post('http://localhost:5050/api/stop');
                setIsNetworkConnected(false);
                setTimeout(fetchNodeCounts, 5000);
            } catch (error) {
                console.error("Error stopping controller:", error);
            }
        } else {
            try {
                await axios.post('http://localhost:5050/api/start');
                setIsNetworkConnected(true);
                setTimeout(fetchNodeCounts, 5000);
            } catch (error) {
                console.error("Error starting controller:", error);
            }
        }
    };

    return (
        <Grid container spacing={3} mt={-8} >
            {/* Network Simulation Box */}
            <Grid item xs={12} sm={5} lg={5}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minheight: '150px' }}>
                    <Typography variant="h6" sx={{ mt: -1.5 }}>Network Simulation</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleSimulation}
                        sx={{ mt: 2, backgroundColor: '#212121' }}
                    >
                        {isSimulationRunning ? 'Stop Simulation' : 'Start Mininet Network Simulation'}
                    </Button>
                    {simulationStatus && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {simulationStatus}
                        </Typography>
                    )}
                </Paper>
            </Grid>

            {/* Controller Box */}
            <Grid item xs={12} sm={5} lg={5}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minheight: '150px' }}>
                    <Typography variant="h6" sx={{ mt: -1.5 }}>Connect the eBPF Controller</Typography>
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
            <Grid item xs={12} sm={2} lg={2}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minheight: '150px' }}>
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
