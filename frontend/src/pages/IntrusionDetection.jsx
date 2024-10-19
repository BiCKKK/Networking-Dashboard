// IDS.jsx 
import React, { useState } from 'react'; 
import { Box, Paper, Typography, Tabs, Tab, Button, Grid, Select, MenuItem, TextField, FormControlLabel, Switch } from '@mui/material'; 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'; 
import { DataGrid } from '@mui/x-data-grid'; 
  
const IntrusionDetection = () => { 
    const [detectionMethod, setDetectionMethod] = useState(0); // 0: Anomaly, 1: Signature-Based, 2: Hybrid 
    const [idsType, setIdsType] = useState('NIDS'); // NIDS or HIDS 
    const [sensitivity, setSensitivity] = useState(5); 
    const [alerts, setAlerts] = useState([ 
        { id: 1, timestamp: '2024-10-18 12:00:01', source: '192.168.1.1', type: 'Anomaly', severity: 'High', description: 'Unusual traffic pattern detected' }, 
        { id: 2, timestamp: '2024-10-18 12:05:34', source: '192.168.1.2', type: 'Signature', severity: 'Medium', description: 'Known malware signature found' }, 
    ]); 

    // Sample data for charts (replace with actual data) 
    const intrusionData = [ 
        { time: '12:00', count: 5 }, 
        { time: '12:05', count: 8 }, 
        { time: '12:10', count: 3 }, 
        { time: '12:15', count: 10 }, 
    ]; 

    const severityDistribution = [ 
        { name: 'Low', value: 10 }, 
        { name: 'Medium', value: 7 }, 
        { name: 'High', value: 3 }, 
    ]; 

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; 

    // Handle detection method tab change 
    const handleTabChange = (event, newValue) => { 
        setDetectionMethod(newValue); 
    }; 

    // Handle IDS type change 
    const handleIdsTypeChange = (event) => { 
        setIdsType(event.target.value); 
    }; 

    // Handle sensitivity change 
    const handleSensitivityChange = (event) => { 
        setSensitivity(event.target.value); 
    }; 

    return ( 
        <> 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -10 }}> 
                <Typography variant="h6">Intrusion Detection System (IDS)</Typography> 
                <Typography variant="body1"> 
                    Monitor and configure the Intrusion Detection System to detect and alert for potential security breaches. 
                </Typography> 
            </Paper> 

            {/* Detection Method Tabs */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2 }}> 
                <Tabs value={detectionMethod} onChange={handleTabChange} aria-label="Detection Method"> 
                    <Tab label="Anomaly Detection" /> 
                    <Tab label="Signature-Based Detection" /> 
                    <Tab label="Hybrid Detection" /> 
                </Tabs> 
            </Paper> 

            {/* IDS Type Toggle */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2 }}> 
                <Typography variant="h6">IDS Type</Typography> 
                <Select value={idsType} onChange={handleIdsTypeChange} fullWidth sx={{ mt: 2 }}> 
                    <MenuItem value="NIDS">Network-Based IDS (NIDS)</MenuItem> 
                    <MenuItem value="HIDS">Host-Based IDS (HIDS)</MenuItem> 
                </Select> 
            </Paper> 

            {/* Visualization Section */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2 }}> 
                <Typography variant="h6">Intrusion Monitoring</Typography> 
                <Grid container spacing={2}> 
                    <Grid item xs={6}> 
                        <Typography variant="subtitle1">Intrusions Over Time</Typography> 
                        <LineChart width={400} height={250} data={intrusionData}> 
                            <Line type="monotone" dataKey="count" stroke="#8884d8" /> 
                            <CartesianGrid stroke="#ccc" /> 
                            <XAxis dataKey="time" /> 
                            <YAxis /> 
                            <Tooltip /> 
                        </LineChart> 
                    </Grid> 
                    <Grid item xs={6}> 
                        <Typography variant="subtitle1">Severity Distribution</Typography> 
                        <PieChart width={250} height={250}> 
                            <Pie data={severityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}> 
                                {severityDistribution.map((entry, index) => ( 
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> 
                                ))} 
                            </Pie> 
                            <Tooltip /> 
                        </PieChart> 
                    </Grid> 
                </Grid> 
            </Paper> 
  
            {/* Alerts Section */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2, height: 400 }}> 
                <Typography variant="h6">Recent Alerts</Typography>
                <DataGrid 
                    rows={alerts} 
                    columns={[ 
                        { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
                        { field: 'source', headerName: 'Source', flex: 1 }, 
                        { field: 'type', headerName: 'Type', flex: 1 }, 
                        { field: 'severity', headerName: 'Severity', flex: 1 }, 
                        { field: 'description', headerName: 'Description', flex: 2 }, 
                    ]} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 25]} 
                    sx={{ height: '94%' }}
                /> 
            </Paper> 

            {/* Configuration Section */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2 }}> 
                <Typography variant="h6">Configuration</Typography> 
                <Typography variant="subtitle1">Sensitivity Level</Typography> 
                <TextField 
                    type="number" 
                    value={sensitivity} 
                    onChange={handleSensitivityChange} 
                    label="Sensitivity" 
                    fullWidth 
                    sx={{ mt: 2 }} 
                /> 
                <FormControlLabel control={<Switch />} label="Enable Auto-Response to High Severity" sx={{ mt: 2 }} /> 
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Save Settings</Button> 
            </Paper> 
        </> 
    ); 
}; 

export default IntrusionDetection; 