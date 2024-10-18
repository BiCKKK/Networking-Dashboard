import React, { useState } from 'react'; 
import { Box, Grid, Paper, Typography, TextField, Button, MenuItem, Grid2 } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid'; 

const PacketInspection = () => { 
    // Example packet data 
    const [packetData, setPacketData] = useState([ 
        { id: 1, timestamp: '12:00:01', sourceIP: '192.168.1.1', destinationIP: '192.168.1.2', protocol: 'TCP', length: '64 bytes' }, 
        { id: 2, timestamp: '12:00:02', sourceIP: '192.168.1.3', destinationIP: '192.168.1.4', protocol: 'UDP', length: '128 bytes' }, 
        // Add more dummy data here or fetch from an API later 
    ]); 

    // State for network or node selection
    const [viewMode, setViewMode] = useState('entireNetwork');
    const [selectedNode, setSelectedNode] = useState('');

    // Define the columns for DataGrid 
    const columns = [ 
        { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
        { field: 'sourceIP', headerName: 'Source IP', flex: 1 }, 
        { field: 'destinationIP', headerName: 'Destination IP', flex: 1 }, 
        { field: 'protocol', headerName: 'Protocol', flex: 1 }, 
        { field: 'length', headerName: 'Length', flex: 1 }, 
    ]; 

    // Example node options for dropdown (can be fetched dynamically)
    const nodeOptions = [
        { label: 'Node 1', value: '192.168.1.1' },
        { label: 'Node 2', value: '192.168.1.2' },
        { label: 'Node 3', value: '192.168.1.3' }
    ]

    return ( 
        <> 
            {/* View Mode Selection */}
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            fullWidth
                            label="View Mode"
                            value={viewMode}
                            onChange={(e) => setViewMode(e.target.value)}>
                            <MenuItem value="entireNetwork">Entire Network</MenuItem>
                            <MenuItem value="specificNode">Specific Node</MenuItem>
                        </TextField>
                    </Grid>
                    {viewMode === 'specificNode' && (
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="Select Node"
                                value={selectedNode}
                                onChange={(e) => setSelectedNode(e.target.value)}>
                                {nodeOptions.map((node) => (
                                    <MenuItem key={node.value} value={node.value}>
                                        {node.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    )}
                </Grid>
            </Paper>

            {/* Filter Section */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3 , mt: -2}}> 
                <Typography variant="h6">Packet Filters</Typography> 
                <Grid container spacing={2} sx={{ mt: -2 }}> 
                    <Grid item xs={12} sm={6} md={3}> 
                        <TextField fullWidth label="Source IP" variant="outlined" /> 
                    </Grid> 
                    <Grid item xs={12} sm={6} md={3}> 
                        <TextField fullWidth label="Destination IP" variant="outlined" /> 
                    </Grid> 
                    <Grid item xs={12} sm={6} md={3}> 
                        <TextField fullWidth label="Protocol" variant="outlined" /> 
                    </Grid> 
                    <Grid item xs={12} sm={6} md={3}> 
                        <TextField fullWidth label="Port" variant="outlined" /> 
                    </Grid> 
                    <Grid item xs={12} sm={6} md={3} mt={-1}> 
                        <Button variant="contained" color="primary" fullWidth sx={{ mt: 1, backgroundColor: '#212121' }}>Apply Filters</Button> 
                    </Grid> 
                    <Grid item xs={12} sm={6} md={3} mt={-1}> 
                        <Button variant="outlined" color="black" fullWidth sx={{ mt: 1, backgroundColor: 'white' }}>Clear Filters</Button> 
                    </Grid> 
                </Grid> 
            </Paper> 

            {/* Packet List DataGrid */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, height: 400, mt: -2 }}> 
                <Typography variant="h6" sx={{ mb: 2 }}>Captured Packets</Typography> 
                <DataGrid 
                    rows={packetData} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 25]} 
                    checkboxSelection 
                    disableSelectionOnClick 
                    sx={{ mt: -2, height: '94%' }}
                /> 
            </Paper> 

            {/* Packet Details Pane */} 
            <Paper elevation={3} sx={{ p: 2, mt: -2 }}> 
                <Typography variant="h6">Packet Details</Typography> 
                <Box sx={{ mt: 0, height: '200px', backgroundColor: '#f5f5f5', p: 2 }}> 
                    <Typography variant="body2" sx={{ textAlign: 'center' }}> 
                        Detailed packet information will be displayed here when a packet is selected from the list. 
                    </Typography> 
                </Box> 
            </Paper> 
        </> 
    ); 
}; 

export default PacketInspection; 