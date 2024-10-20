import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const NetworkOverview = () => {
    const svgRef = useRef(null);

    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);
    const [activeNodeCount, setActiveNodeCount] = useState(0);

    const networkData = {
        nodes: [
            {id: 'CONTROL SW', type: 'control-switch', status: 'Active'},
            {id: 'SCADA', type: 'control-switch', status: 'Active'},
            {id: 'DSS1 GW', type: 'control-switch', status: 'Active'},
            {id: 'DSS2 GW', type: 'control-switch', status: 'Inactive'},
            {id: 'DPS GW', type: 'control-switch', status: 'Active'},
            {id: 'IED1', type: 'control-switch', status: 'Active'},
            {id: 'IED2', type: 'control-switch', status: 'Inactive'},
            {id: 'IED3', type: 'control-switch', status: 'Active'},
            {id: 'IED4', type: 'control-switch', status: 'Active'},
            {id: 'DSS1 RTU', type: 'control-switch', status: 'Inactive'},
            {id: 'DSS2 RTU', type: 'control-switch', status: 'Active'},
            {id: 'IDS', type: 'control-switch', status: 'Active'}
        ],
        links: [
            {source: 'CONTROL SW', target: 'DSS1 GW', type: 'wan'},
            {source: 'CONTROL SW', target: 'DSS2 GW', type: 'wan'},
            {source: 'CONTROL SW', target: 'DPS GW', type: 'wan'},
            {source: 'DPS GW', target: 'IED1', type: 'lan'},
            {source: 'DPS GW', target: 'IED2', type: 'lan'},
            {source: 'DPS GW', target: 'IED3', type: 'lan'},
            {source: 'DPS GW', target: 'IED4', type: 'lan'},
            {source: 'DSS1 GW', target: 'DSS1 RTU', type: 'iec104'},
            {source: 'DSS2 GW', target: 'DSS1 RTU', type: 'iec104'},
            {source: 'DSS1 GW', target: 'IDS', type: 'security'}
        ]
    };

    const toggleNetworkConnection = () => {
        setIsNetworkConnected(!isNetworkConnected);
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 500;

        svg.selectAll('*').remove();

        const zoomHandler = d3.zoom()
            .scaleExtent([0.1, 2])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoomHandler);

        const g = svg.append('g');

        const simulation = d3.forceSimulation(networkData.nodes)
            .force('link', d3.forceLink(networkData.links).id(d => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('center', d3.forceCenter(width/2, height/2));

        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(networkData.links)
            .enter()
            .append('line')
            .attr('stroke-width', 2)
            .attr('stroke', d => {
                switch (d.type) {
                    case 'wan': return '#007bff';
                    case 'lan': return '#4caf50';
                    case 'iec104': return '#ff9800';
                    case 'security': return '#f44336';
                    default: return '#ccc';
                }
            });

        const node = g.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(networkData.nodes)
        .enter()
        .append('circle')
        .attr('r', 20)
        .attr('fill', d => {
            switch (d.type) {
                case 'control-switch': return '#007bff';
                case 'scada': return '#ffeb3b';
                case 'gateway': return '#9c27b0';
                case 'ied': return '#4caf50';
                case 'rtu': return '#ff9800';
                case 'ids': return '#f44336';
                default: return '#ccc';
            }
        })
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
        .attr('x', 6)
        .attr('y', 3)
        .text(d => d.id)
        .style('font-size', '12px')
        .style('font-family', 'Arial')
        .style('fill', '#000');

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
        d.fx = null;
        d.fy = null;
    }

    setNodeCount(networkData.nodes.length);
    setActiveNodeCount(networkData.nodes.filter(node => node.status === 'Active').length);

    }, []);

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
                    <Paper elevation={3} sx={{ p: 3, height: '500px' }}>
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
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NetworkOverview;
