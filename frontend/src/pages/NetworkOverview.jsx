import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NetworkTopology from "../components/network/NetworkTopology";
import axios from "axios";
import "@xyflow/react/dist/style.css"; 
import { networkFunctions } from "../function_colours";

const devicePositions = {
    'CONTROLSW': { x: 400, y: 50 },
    'CONTROL': { x: 850, y: 60 },
    'WANR1': { x: 200, y: 250 },
    'WANR2': { x: 600, y: 250 },
    'DPSGW': { x: 400, y: 420 },
    'DPSRS': { x: 400, y: 650 },
    'DPSHV': { x: 100, y: 650 },
    'IED1': { x: -100, y: 950 },
    'IED2': { x: 150, y: 950 },
    'DPSMV': { x: 700, y: 650 },
    'IED3': { x: 750, y: 950 },
    'IED4': { x: 1000, y: 950 },
    'DPSHMI': { x: 450, y: 950 },
    'DSS1GW': { x: -200, y: 250 },
    'IDS': { x: -500, y: 260 },
    'DSS1RTU': { x: -150, y: 500 },
    'DSS2GW': { x: 1000, y: 250 },
    'DSS2RTU': { x: 1050, y: 500 },
};

const deviceImages = {
    'CONTROLSW': '/images/control-sw.png',
    'CONTROL': '/images/control-scada.png',
    'WANR1': '/images/wan-r1.png',
    'WANR2': '/images/wan-r2.png',
    'DPSGW': '/images/dps-gw.png',
    'DPSRS': '/images/dps-rs.png',
    'DPSHV': '/images/dps-hv.png',
    'IED1': '/images/ied1.png',
    'IED2': '/images/ied2.png',
    'DPSMV': '/images/dps-mv.png',
    'IED3': '/images/ied3.png',
    'IED4': '/images/ied4.png',
    'DPSHMI': '/images/dps-hmi.png',
    'DSS1GW': '/images/dss1-gw.png',
    'IDS': '/images/ids.png',
    'DSS1RTU': '/images/dss1-rtu.png',
    'DSS2GW': '/images/dss2-gw.png',
    'DSS2RTU': '/images/dss2-rtu.png',
};

const NetworkOverview = () => {
    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);
    const [activeNodeCount, setActiveNodeCount] = useState(0);
    const [isSimulationRunning, setIsSimulationRunning] = useState(false); // Tracks simulation status
    const [simulationStatus, setSimulationStatus] = useState(""); // To display simulation status messages
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

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

    const fetchTopologyData = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/topology');
            const devices = response.data.devices;
            const links = response.data.links;

            const mappedNodes = devices.map(device => {
                const position = devicePositions[device.name] || { x: 0, y: 0 };
                const image = deviceImages[device.name] || null;
                const status = device.status;

                const functionsInstalled = device.functions.map(func => {
                    const functionInfo = networkFunctions.find(f => f.type === func.function_name);
                    return {
                        id: func.id,
                        type: func.function_name, 
                        status: func.status,
                        color: functionInfo ? functionInfo.color : '#e0e0e0'
                    }
                })

                let nodeStyle = {};
                if (!isSimulationRunning) {
                    nodeStyle = { opacity: 0.5 };
                } else if (isSimulationRunning && !isNetworkConnected) {
                    nodeStyle = { opacity: 1.0 };
                } else if (isSimulationRunning && isNetworkConnected) {
                    if (device.device_type === 'switch' && status === 'connected') {
                        nodeStyle = { border: '2px solid green' };
                    }
                }

                return {
                    id: device.name,
                    type: 'customNode',
                    position: position,
                    data: {
                        label: device.name,
                        image: image,
                        deviceType: device.device_type,
                        status: device.status,
                        dpid: device.dpid,
                        functionsInstalled: functionsInstalled,
                        onFunctionInstall: (functionData) => handleFunctionInstall(device.name, functionData, device.dpid),
                        onRemoveFunction: (slotIndex) => handleRemoveFunction(device.name, slotIndex, device.dpid),
                        isActive: isSimulationRunning && isNetworkConnected && device.device_type === 'switch' && status === 'connected'
                    },
                    style: nodeStyle
                };
            });

            const mappedEdges = links.map(link => {
                const sourceDevice = devices.find(d => d.id.toString() === link.source_device_id.toString());
                const targetDevice = devices.find(d => d.id.toString() === link.destination_device_id.toString());

                if (sourceDevice && targetDevice) {
                    const isClickable = link.is_clickable;
                    if (sourceDevice.name === 'CONTROLSW' && targetDevice.name === 'CONTROL') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'right-source',
                            target: targetDevice.name,
                            targetHandle: 'left-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'WANR1' && targetDevice.name === 'CONTROLSW') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source',
                            target: targetDevice.name,
                            targetHandle: 'bottom-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }
                    
                    if (sourceDevice.name === 'WANR2' && targetDevice.name === 'CONTROLSW') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source',
                            target: targetDevice.name,
                            targetHandle: 'bottom-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'WANR1' && targetDevice.name === 'DSS1GW') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'left-source',
                            target: targetDevice.name,
                            targetHandle: 'right-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }
                    
                    if (sourceDevice.name === 'WANR2' && targetDevice.name === 'DSS2GW') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'right-source',
                            target: targetDevice.name,
                            targetHandle: 'left-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'DSS1GW' && targetDevice.name === 'IDS') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'left-source',
                            target: targetDevice.name,
                            targetHandle: 'right-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'DPSGW' && targetDevice.name === 'CONTROLSW') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source',
                            target: targetDevice.name,
                            targetHandle: 'bottom-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'DPSRS' && targetDevice.name === 'DPSHV') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'left-source',
                            target: targetDevice.name,
                            targetHandle: 'right-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'DPSRS' && targetDevice.name === 'DPSMV') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'right-source',
                            target: targetDevice.name,
                            targetHandle: 'left-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'DPSHMI' && targetDevice.name === 'DPSRS') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source',
                            target: targetDevice.name,
                            targetHandle: 'bottom-target',
                            animated: isSimulationRunning,
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                        };
                    }

                    if (sourceDevice.name === 'DSS1GW' && targetDevice.name === 'DSS1RTU') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'bottom-source', 
                            target: targetDevice.name,
                            targetHandle: 'top-target',
                            animated: isSimulationRunning,
                            label: isClickable ? 'Clickable' : link.link_type || '',
                            type: isClickable ? 'custom' : 'default',
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                            data: {
                                onClick: () => handleEdgeClick(`e${sourceDevice.name}-${targetDevice.name}`),
                            },
                        }
                    }

                    if (sourceDevice.name === 'DSS2GW' && targetDevice.name === 'DSS2RTU') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'bottom-source', 
                            target: targetDevice.name,
                            targetHandle: 'top-target',
                            animated: isSimulationRunning,
                            label: isClickable ? 'Clickable' : link.link_type || '',
                            type: isClickable ? 'custom' : 'default',
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                            data: {
                                onClick: () => handleEdgeClick(`e${sourceDevice.name}-${targetDevice.name}`),
                            },
                        }
                    }

                    if (sourceDevice.name === 'IED1' && targetDevice.name === 'DPSHV') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source', 
                            target: targetDevice.name,
                            targetHandle: 'left-target',
                            animated: isSimulationRunning,
                            label: isClickable ? 'Clickable' : link.link_type || '',
                            type: isClickable ? 'custom' : 'default',
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                            data: {
                                onClick: () => handleEdgeClick(`e${sourceDevice.name}-${targetDevice.name}`),
                            },
                        }
                    }
                    if (sourceDevice.name === 'IED2' && targetDevice.name === 'DPSHV') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source', 
                            target: targetDevice.name,
                            targetHandle: 'bottom-target',
                            animated: isSimulationRunning,
                            label: isClickable ? 'Clickable' : link.link_type || '',
                            type: isClickable ? 'custom' : 'default',
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                            data: {
                                onClick: () => handleEdgeClick(`e${sourceDevice.name}-${targetDevice.name}`),
                            },
                        }
                    }
                    if (sourceDevice.name === 'IED3' && targetDevice.name === 'DPSMV') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source', 
                            target: targetDevice.name,
                            targetHandle: 'bottom-target',
                            animated: isSimulationRunning,
                            label: isClickable ? 'Clickable' : link.link_type || '',
                            type: isClickable ? 'custom' : 'default',
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                            data: {
                                onClick: () => handleEdgeClick(`e${sourceDevice.name}-${targetDevice.name}`),
                            },
                        }
                    }
                    if (sourceDevice.name === 'IED4' && targetDevice.name === 'DPSMV') {
                        return {
                            id: `e${sourceDevice.name}-${targetDevice.name}`,
                            source: sourceDevice.name,
                            sourceHandle: 'top-source', 
                            target: targetDevice.name,
                            targetHandle: 'right-target',
                            animated: isSimulationRunning,
                            label: isClickable ? 'Clickable' : link.link_type || '',
                            type: isClickable ? 'custom' : 'default',
                            style: {
                                stroke: isSimulationRunning ? '#000' : '#ccc',
                                opacity: isSimulationRunning ? 1.0 : 0.5,
                            },
                            data: {
                                onClick: () => handleEdgeClick(`e${sourceDevice.name}-${targetDevice.name}`),
                            },
                        }
                    }
                    // Default Edge Mapping for Other Edges
                    return {
                        id: `e${sourceDevice.name}-${targetDevice.name}`,
                        source: sourceDevice.name,
                        sourceHandle: 'bottom-source', 
                        target: targetDevice.name,
                        targetHandle: 'top-target',
                        animated: isSimulationRunning,
                        style: {
                            stroke: isSimulationRunning ? '#000' : '#ccc',
                            opacity: isSimulationRunning ? 1.0 : 0.5,
                        },
                    };
                } else {
                    return null;
                }
            }).filter(edge => edge != null);
            
            setNodes(mappedNodes);
            setEdges(mappedEdges)
        } catch (error) {
            console.error('Error fetching topology data:', error);
        }
    };

    useEffect(() => {
        let intervalId;

        if (isSimulationRunning && isNetworkConnected) {
            intervalId = setInterval(() => {
                fetchNodeCounts();
                fetchTopologyData();
            }, 5000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isSimulationRunning, isNetworkConnected])

    // Handler to toggle simulation
    const toggleSimulation = async () => {
        if (isSimulationRunning) {
            try {
                await axios.post('http://localhost:5100/api/stop_sim');
                setIsSimulationRunning(false);
                setSimulationStatus("Simulation Stopped.");
                setTimeout(() => { fetchNodeCounts(); fetchTopologyData(); }, 5000);
            } catch (error) {
                console.error("Error stopping simulation:", error);
                setSimulationStatus("Failed to stop simulation.");
            }
        } else {
            try {
                await axios.post('http://localhost:5100/api/start_sim');
                setIsSimulationRunning(true);
                setSimulationStatus("Simulation Started.");
                setTimeout(() => { fetchNodeCounts(); fetchTopologyData(); }, 5000);
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
                setTimeout(() => { fetchNodeCounts(); fetchTopologyData(); }, 5000);
            } catch (error) {
                console.error("Error stopping controller:", error);
            }
        } else {
            try {
                await axios.post('http://localhost:5050/api/start');
                setIsNetworkConnected(true);
                setTimeout(() => { fetchNodeCounts(); fetchTopologyData(); }, 5000);
            } catch (error) {
                console.error("Error starting controller:", error);
            }
        }
    };

    const handleFunctionInstall = (nodeName, functionData, dpid) => {
        axios.post('http://localhost:5050/api/install', {
            dpid: dpid,
            function_name: functionData.type,
        })
        .then(response => {
            console.log('Function installation successful:', response.data);
            fetchTopologyData();
        })
        .catch(error => {
            console.error('Error installing function:', error);
            alert('Failed to install function: ' + error.response?.data?.error || error.message);
        });
    };

    const handleRemoveFunction = (nodeName, slotIndex, dpid) => {
        axios.post('http://localhost:5050/api/remove', {
            dpid: dpid,
            function_index: slotIndex,
        }).then(response => {
            setNodes((prevNodes) =>
                prevNodes.map((node) => {
                    if (node.id === nodeName) {
                        const updatedFunctions = [...node.data.functionsInstalled];
                        updatedFunctions.splice(slotIndex, 1);
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                functionsInstalled: updatedFunctions,
                            },
                        };
                    }
                    return node;
                })
            );
        }).catch(error => {
            console.error('Error removing function:', error);
            alert("Failed to remove functon: " + error.response?.data?.error || error.message)
        })
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
                            <NetworkTopology
                                nodes={nodes}
                                edges={edges} 
                                isSimulationRunning={isSimulationRunning}
                                isNetworkConnected={isNetworkConnected}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NetworkOverview;
