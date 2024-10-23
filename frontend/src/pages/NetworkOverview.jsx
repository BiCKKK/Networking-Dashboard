import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { io } from "socket.io-client";

const NetworkOverview = () => {
    const svgRef = useRef(null);
    const trafficSvgRef = useRef(null);

    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);
    const [activeNodeCount, setActiveNodeCount] = useState(0);
    const [originalPositions, setOriginalPositions] = useState({});
    const [trafficData, setTrafficData] = useState([]);

    const networkData = {
        nodes: [
            {id: 'CONTROL SW', type: 'control-switch', status: 'Active', x: 400, y: 200},
            {id: 'CONTROL SCADA', type: 'scada', status: 'Active', x: 600, y: 200},
            {id: 'WAN R1', type: 'wan', status: 'Active', x: 300, y: 400},
            {id: 'WAN R2', type: 'wan', status: 'Active', x: 500, y: 400},
            {id: 'DPS GW', type: 'gatewat', status: 'Active', x: 400, y: 600},
            {id: 'DPS RS', type: 'router', status: 'Active', x: 400, y: 800},
            {id: 'DPS HV', type: 'hv-system', status: 'Active', x: 300, y: 1000},
            {id: 'IED1', type: 'ied', status: 'Active', x: 200, y: 1200},
            {id: 'IED2', type: 'ied', status: 'Active', x: 400, y: 1200},
            {id: 'DPS MV', type: 'mv-system', status: 'Active', x: 500, y: 1000},
            {id: 'IED3', type: 'ied', status: 'Active', x: 600, y: 1200},
            {id: 'IED4', type: 'ied', status: 'Active', x: 800, y: 1200},
            {id: 'DPS HMI', type: 'hmi', status: 'Active', x: 400, y: 1400},
            {id: 'DSS1 GW', type: 'gateway', status: 'Active', x: 200, y: 400},
            {id: 'IDS', type: 'ids', status: 'Active', x: 100, y: 600},
            {id: 'DSS1 RTU', type: 'rtu', status: 'Active', x: 200, y: 800},
            {id: 'DSS2 GW', type: 'gateway', status: 'Active', x: 600, y: 600},
            {id: 'DSS2 RTU', type: 'rtu', status: 'Active', x: 600, y: 800}
        ],
        links: [
            {source: 'CONTROL SW', target: 'CONTROL SCADA'},
            {source: 'CONTROL SW', target: 'WAN R1'},
            {source: 'CONTROL SW', target: 'WAN R2'},
            {source: 'CONTROL SW', target: 'DPS GW'},
            {source: 'DPS GW', target: 'DPS RS'},
            {source: 'DPS RS', target: 'DPS HV'},
            {source: 'DPS HV', target: 'IED1'},
            {source: 'DPS HV', target: 'IED2'},
            {source: 'DPS RS', target: 'DPS MV'},
            {source: 'DPS MV', target: 'IED3'},
            {source: 'DPS MV', target: 'IED4'},
            {source: 'DPS RS', target: 'DPS HMI'},
            {source: 'WAN R1', target: 'DSS1 GW'},
            {source: 'DSS1 GW', target: 'IDS'},
            {source: 'DSS1 GW', target: 'DSS1 RTU'},
            {source: 'WAN R2', target: 'DSS2 GW'},
            {source: 'DSS2 GW', target: 'DSS2 RTU'}
        ]
    };

    const toggleNetworkConnection = () => {
        setIsNetworkConnected(!isNetworkConnected);
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 1500;

        svg.selectAll('*').remove();

        const zoomHandler = d3.zoom()
            .scaleExtent([0.1, 2])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoomHandler);

        const g = svg.append('g');

        const originalPositions = {};
        networkData.nodes.forEach(node => {
            originalPositions[node.id] = {x: node.x, y: node.y};
        });
        setOriginalPositions(originalPositions);

        networkData.nodes.forEach((node) => {
            node.fx = node.x;
            node.fy = node.y;
        });

        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(networkData.links)
            .enter()
            .append('line')
            .attr('stroke-width', 2)
            .attr('stroke', '#999');

        const node = g.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(networkData.nodes)
            .enter()
            .append('circle')
            .attr('r', 20)
            .attr('fill', d => {
                switch (d.type) { 
                    case 'control-switch': return '#007bff'; // Blue for control switch 
                    case 'scada': return '#ffeb3b'; // Yellow for SCADA 
                    case 'gateway': return '#9c27b0'; // Purple for Gateway 
                    case 'ied': return '#4caf50'; // Green for IED 
                    case 'rtu': return '#ff9800'; // Orange for RTU 
                    case 'ids': return '#f44336'; // Red for IDS 
                    case 'hmi': return '#8e44ad'; // Dark Purple for HMI 
                    default: return '#ccc'; // Default color for other node types 
                    }
            })
            .attr('cx', d => d.x) // Use predefined x position 
            .attr('cy', d => d.y) // Use predefined y position 
            .call(d3.drag() 
                .on('start', dragstarted) 
                .on('drag', dragged) 
                .on('end', dragended)); 

        const labels = g.append('g')
            .attr('class', 'labels')
            .selectAll('text')
            .data(networkData.nodes)
            .enter()
            .append('text')
            .attr('x', d => d.x + 25) 
            .attr('y', d => d.y)
            .text(d => d.id)
            .style('font-size', '12px')
            .style('font-family', 'Arial')
            .style('fill', '#000');
    
        const simulation = d3.forceSimulation(networkData.nodes)
            .force('link', d3.forceLink(networkData.links).id(d => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('center', d3.forceCenter(width/2, height/2));

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            labels
                .attr('x', d => d.x + 25)
                .attr('y', d => d.y);
        });

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = d.x;
            d.fy = d.y;
        }

        setNodeCount(networkData.nodes.length);
        setActiveNodeCount(networkData.nodes.filter(node => node.status === 'Active').length);

    }, []); 

    useEffect(() => {
        const socket = io("http://localhost:5000/api/network_overview");

        socket.on("traffic_update", (newFlow) => {
            console.log("Received data traffic:", newFlow);
            setTrafficData((prevData) => [...prevData, newFlow]);
        });

        return () => socket.disconnect();
    }, []);

    useEffect (() => {
        const svg = d3.select(trafficSvgRef.current);
        svg.selectAll("*").remove();

        const width = 500;
        const height = 500;

        const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
        const yScale = d3.scaleLinear().domain([0, 1500]).range([height, 0]);

        svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale));
        svg.append("g").call(d3.axisLeft(yScale));

        svg.selectAll("circle")
            .data(trafficData.slice(-10))
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(i))
            .attr("cy", (d) => yScale(d.packet_size))
            .attr("r", 5)
            .attr("fill", "blue");
    }, [trafficData]);

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
                <Grid item xs={12} sm={6} lg={6}>
                    {/* Network Topology Box */}
                    <Paper elevation={3} sx={{ p: 3, height: '500px', position: 'relative' }}>
                        <Typography variant="h6">Network Topology</Typography>
                        {/* Placeholder for network topology visualization */}
                        <Box sx={{ mt: 0, height: '96%', backgroundColor: '#f5f5f5' }}>
                            {/* Network topology will be displayed here. */}
                            <svg ref={svgRef} width="100%" height="100%" style={{ border: '1px solid #ccc' }}></svg>
                        </Box>
                    </Paper>
                </Grid>

                {/* Network Traffic Graph Box */}
                <Grid item xs={12} sm={6} lg={6}>
                    <Paper elevation={3} sx={{ p: 3, height: '500px' }}>
                        <Typography variant="h6">Network Traffic</Typography>
                        {/* Placeholder for network traffic visualization */}
                        <Box sx={{ mt: 0, height: '96%', backgroundColor: '#f5f5f5' }}>
                            {/* Network Traffic will be displayed here. */}
                            <svg ref={trafficSvgRef} width="100%" height="100%" style={{border: "1px solid #ccc"}}></svg>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NetworkOverview;
