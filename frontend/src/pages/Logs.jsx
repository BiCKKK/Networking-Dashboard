import React, { useState } from 'react'; 
import { Box, Paper, Typography, Select, MenuItem, Button, Grid, TextField } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid'; 
import LogDetails from './LogDetails'; 
  
const Logs = () => { 
    const [logType, setLogType] = useState('Syslog'); 
    const [selectedLog, setSelectedLog] = useState(null); 
    const [filterCriteria, setFilterCriteria] = useState({ severity: '', source: '', startTime: '', endTime: '' }); 

    // Sample log data for different log types (to be replaced with actual data fetching) 
    const logData = { 
        Syslog: [ 
            { id: 1, timestamp: '2024-10-18 12:00:01', source: '192.168.1.1', severity: 'INFO', message: 'System rebooted' }, 
            { id: 2, timestamp: '2024-10-18 12:05:34', source: '192.168.1.2', severity: 'WARN', message: 'Service unavailable' }, 
        ],

        DNS: [ 
            { id: 1, timestamp: '2024-10-18 12:03:21', source: '192.168.1.3', severity: 'INFO', message: 'DNS query resolved' }, 
            { id: 2, timestamp: '2024-10-18 12:08:45', source: '192.168.1.4', severity: 'ERROR', message: 'DNS query failed' }, 
        ], 

        Authentication: [ 
            { id: 1, timestamp: '2024-10-18 12:02:33', source: '192.168.1.5', severity: 'WARN', message: 'Failed login attempt' }, 
            { id: 2, timestamp: '2024-10-18 12:09:01', source: '192.168.1.6', severity: 'CRITICAL', message: 'Multiple failed login attempts' }, 
        ], 
    }; 

    // Columns for DataGrid 
    const columns = [ 
        { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
        { field: 'source', headerName: 'Source', flex: 1 }, 
        { field: 'severity', headerName: 'Severity', flex: 1 }, 
        { field: 'message', headerName: 'Message', flex: 2 }, 
    ]; 

    // Handle log type change 
    const handleLogTypeChange = (event) => { 
        setLogType(event.target.value); 
        setSelectedLog(null); 
        setFilterCriteria({ severity: '', source: '', startTime: '', endTime: '' }); // Reset filter when switching log types 
    }; 

    // Handle log selection from DataGrid 
    const handleLogSelection = (log) => { 
        setSelectedLog(log); 
    }; 

    // Handle filter change 
    const handleFilterChange = (event) => { 
        const { name, value } = event.target; 
        setFilterCriteria({ ...filterCriteria, [name]: value }); 
    }; 

    // Apply filtering to log data 
    const filteredLogs = logData[logType].filter((log) => { 
        const matchesSeverity = filterCriteria.severity ? log.severity === filterCriteria.severity : true; 
        const matchesSource = filterCriteria.source ? log.source.includes(filterCriteria.source) : true; 
        const matchesTime = (!filterCriteria.startTime || new Date(log.timestamp) >= new Date(filterCriteria.startTime)) && 
                            (!filterCriteria.endTime || new Date(log.timestamp) <= new Date(filterCriteria.endTime)); 
        return matchesSeverity && matchesSource && matchesTime; 
    }); 

    // Aggregation summary 
    const logSummary = { 
        totalLogs: filteredLogs.length, 
        severityCounts: filteredLogs.reduce((acc, log) => { 
            acc[log.severity] = (acc[log.severity] || 0) + 1; 
            return acc; 
        }, {}), 
        uniqueSources: new Set(filteredLogs.map((log) => log.source)).size, 
    }; 

    return ( 
        <> 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -10 }}> 
                <Typography variant="h6">Select Log Type</Typography> 
                <Select value={logType} onChange={handleLogTypeChange} fullWidth sx={{ mt: 2 }}> 
                    <MenuItem value="Syslog">Syslog</MenuItem> 
                    <MenuItem value="DNS">DNS Logs</MenuItem> 
                    <MenuItem value="Authentication">Authentication Logs</MenuItem> 
                </Select> 
            </Paper> 

            {/* Filter Section */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2 }}> 
                <Typography variant="h6">Filter Logs</Typography> 
                <Grid container spacing={2} sx={{ mt: 2 }}> 
                    <Grid item xs={3}> 
                        <TextField 
                            label="Severity" 
                            name="severity" 
                            value={filterCriteria.severity} 
                            onChange={handleFilterChange} 
                            fullWidth 
                        /> 
                    </Grid> 
                    <Grid item xs={3}> 
                        <TextField 
                            label="Source" 
                            name="source" 
                            value={filterCriteria.source} 
                            onChange={handleFilterChange} 
                            fullWidth 
                        /> 
                    </Grid> 
                    <Grid item xs={3}> 
                        <TextField 
                            label="Start Time" 
                            type="datetime-local" 
                            name="startTime" 
                            value={filterCriteria.startTime} 
                            onChange={handleFilterChange} 
                            InputLabelProps={{ shrink: true }} 
                            fullWidth 
                        /> 
                    </Grid> 
                    <Grid item xs={3}> 
                        <TextField 
                            label="End Time" 
                            type="datetime-local" 
                            name="endTime" 
                            value={filterCriteria.endTime} 
                            onChange={handleFilterChange} 
                            InputLabelProps={{ shrink: true }} 
                            fullWidth 
                        /> 
                    </Grid> 
                </Grid> 
            </Paper> 

            {/* Aggregation Summary */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2 }}> 
                <Typography variant="h6">Log Aggregation Summary</Typography> 
                <Typography>Total Logs: {logSummary.totalLogs}</Typography> 
                <Typography>Unique Sources: {logSummary.uniqueSources}</Typography> 
                <Typography>Logs by Severity:</Typography> 
                {Object.entries(logSummary.severityCounts).map(([severity, count]) => ( 
                    <Typography key={severity}>{severity}: {count}</Typography> 
                ))} 
            </Paper> 

            {/* DataGrid for displaying logs */} 
            <Paper elevation={3} sx={{ p: 2, mb: 3, mt: -2, height: 400 }}> 
                <Typography variant="h6" sx={{ mb: 2 }}>{logType} Logs</Typography> 
                <DataGrid 
                    rows={filteredLogs} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 25]} 
                    onRowClick={(params) => handleLogSelection(params.row)} 
                    disableSelectionOnClick 
                    sx={{ mt: -2, height: '94%' }}
                /> 
            </Paper> 

            {/* Log Details */} 
            {selectedLog && <LogDetails log={selectedLog} />} 

            {/* Export and Retention Controls */} 
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}> 
                <Button variant="contained" color="primary" sx={{ backgroundColor: '#212121' }} >Export Logs</Button> 
                <Button variant="outlined" color="black" sx={{ backgroundColor: 'white'}}>Set Retention Policy</Button> 
            </Box> 
        </> 
    ); 
}; 

export default Logs; 