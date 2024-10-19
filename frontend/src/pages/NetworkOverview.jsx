import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cytoscape from "cytoscape";
import { io } from "socket.io-client";

const NetworkOverview = () => {
    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);
    const [trafficData, setTrafficData] = useState([]);

    // Initialise WebSocket connection
    const socket = io('http://localhost:5000');

    const toggleNetworkConnection = () => {
        setIsNetworkConnected(!isNetworkConnected);
    };

    // Fetch initial network data (nodes and connections) and set up WebSocket for real-time traffic updates
    useEffect(() => {
        fetch("http://localhost:5000/api/network_overview")
            .then((response) => response.json())
            .then((data) => {
                setNodeCount(data.nodes.length);
                initializeTopologyGraph(data); // Initialise the network graph

                // Listen for real-time traffic updates via WebSocket
            socket.on('traffic_update', (newTrafficFlow) =>{
                setTrafficData((prevData) => [...prevData, newTrafficFlow]);
                updateGraphWithTraffic(newTrafficFlow); // Update the graph with new traffic
            });

            return () => {
                socket.disconnect(); // Clean up the socket connection when component unmounts
            };
        })
        .catch((error) => console.error("Error fetching network data:", error));
    }, []);

    // Initialise Cytoscape for topology visualisation 
    const initializeTopologyGraph = (data) => {
        const nodes = data.nodes.map(node => ({ data: {id: node.node_name, label: node.node_name} }));
        
        // Filter connections to ensue the source and destination nodes exist in the nodes array
        const nodeNames = new Set(data.nodes.map(node => node.node_name));
        const connections = data.connections.filter(connection =>
            nodeNames.has(connection.source_node) && nodeNames.has(connection.destination_node)
        ).map(connection => ({
            data: {
                source: connection.source_node,
                target: connection.destination_node
            }
        }));
        
        const cy = Cytoscape({ 
            container: document.getElementById("cytoscape-container"), 
            elements: [
                ...nodes,
                ...connections
            ], 
            style: [ 
                { 
                    selector: "node", 
                    style: { 
                        "background-color": "#007bff", 
                        "label": "data(label)" 
                    } 
                }, 
                { 
                    selector: "edge", 
                    style: { 
                        "width": 3, 
                        "line-color": "#ccc", 
                        "target-arrow-color": "#ccc", 
                        "target-arrow-shape": "triangle" 
                    } 
                } 
            ], 
            layout: { name: "grid", rows: 3 } 
        }); 
        // Store the Cytoscape instance to be used for later updates 
        window.cy = cy; 
    }; 

    // Function to update the real-time traffic flow graph (right section) 
    const updateTrafficGraph = (newTrafficFlow) => { 
        // Find the graph container for real-time traffic 
        const trafficGraphContainer = document.getElementById("traffic-graph-container"); 
        // Create a new traffic flow entry (for example, as a list item or chart update) 
        const trafficFlowElement = document.createElement("div"); 
        trafficFlowElement.textContent = `Flow from ${newTrafficFlow.source_node} to ${newTrafficFlow.destination_node} (${newTrafficFlow.packet_size} bytes, ${newTrafficFlow.latency} ms)`; 
        trafficFlowElement.style.padding = "10px"; 
        trafficFlowElement.style.borderBottom = "1px solid #ccc"; 
        // Append the new traffic flow to the graph container 
        trafficGraphContainer.appendChild(trafficFlowElement); 
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
                    <Typography variant="h6" sx={{ mt: -1.5 }}>Nodes connected</Typography>
                    <Typography variant="h3" sx={{ mt: 1 }}>
                        {nodeCount}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Total nodes in the Network
                    </Typography>
                </Paper>
            </Grid>

            {/* Main Section */}
            <Grid container spacing={3} mt={0} mx={0}>
                <Grid item xs={12} sm={6} lg={6}>
                    {/* Network Topology Box */}
                    <Paper elevation={3} sx={{ p: 3, height: '500px' }}>
                        <Typography variant="h6">Network Topology</Typography>
                        {/* Placeholder for network topology visualization */}
                        <Box id="cytoscape-container" sx={{ mt: 0, height: '96%', backgroundColor: '#f5f5f5' }}>
                            {/* Network topology will be displayed here. */}
                        </Box>
                    </Paper>
                </Grid>

                {/* Network Traffic Graph Box */}
                <Grid item xs={12} sm={6} lg={6}>
                    <Paper elevation={3} sx={{ p: 3, height: '500px' }}>
                        <Typography variant="h6">Network Traffic</Typography>
                        {/* Placeholder for network traffic visualization */}
                        <Box id="traffic-graph-container" sx={{ mt: 0, height: '96%', backgroundColor: '#f5f5f5' }}>
                            {/* Network Traffic will be displayed here. */}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NetworkOverview;
