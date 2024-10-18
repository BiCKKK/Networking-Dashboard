// import React, { useState } from 'react'; 
// import { Box, Grid, Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material'; 
// import { DataGrid } from '@mui/x-data-grid'; 

// const Logs = () => { 
//     // Example log data (this will be replaced by fetched data later) 
//     const [logs, setLogs] = useState([ 
//         { id: 1, timestamp: '2024-10-18 12:00:01', type: 'Syslog', source: '192.168.1.1', severity: 'INFO', message: 'System rebooted' }, 
//         { id: 2, timestamp: '2024-10-18 12:05:34', type: 'DNS', source: '192.168.1.2', severity: 'WARN', message: 'DNS query failed' }, 
//         { id: 3, timestamp: '2024-10-18 12:10:45', type: 'Authentication', source: '192.168.1.3', severity: 'ERROR', message: 'Failed login attempt' }, 
//         // Add more dummy data here 
//     ]); 

//     // Columns for the DataGrid 
//     const columns = [ 
//         { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
//         { field: 'type', headerName: 'Log Type', flex: 1 }, 
//         { field: 'source', headerName: 'Source', flex: 1 }, 
//         { field: 'severity', headerName: 'Severity', flex: 1 }, 
//         { field: 'message', headerName: 'Message', flex: 2 }, 
//     ]; 

//     return ( 
//         <Box sx={{ p: 3 }}> 
//             {/* Filter Section */} 
//             <Paper elevation={3} sx={{ p: 2, mb: 3 }}> 
//                 <Typography variant="h6">Log Filters</Typography> 
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <TextField fullWidth label="Source IP" variant="outlined" /> 
//                     </Grid> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <TextField fullWidth label="Log Type" variant="outlined" /> 
//                     </Grid> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <FormControl fullWidth variant="outlined"> 
//                             <InputLabel>Severity</InputLabel> 
//                             <Select label="Severity"> 
//                                 <MenuItem value="INFO">INFO</MenuItem> 
//                                 <MenuItem value="WARN">WARN</MenuItem> 
//                                 <MenuItem value="ERROR">ERROR</MenuItem> 
//                                 <MenuItem value="CRITICAL">CRITICAL</MenuItem> 
//                             </Select> 
//                         </FormControl> 
//                     </Grid> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>Apply Filters</Button> 
//                     </Grid> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>Clear Filters</Button> 
//                     </Grid> 
//                 </Grid> 
//             </Paper> 

//             {/* Log Aggregation Summary */} 
//             <Paper elevation={3} sx={{ p: 2, mb: 3 }}> 
//                 <Typography variant="h6" sx={{ mb: 2 }}>Log Summary</Typography> 
//                 <Grid container spacing={2}> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <Typography variant="body1">Total Logs: {logs.length}</Typography> 
//                     </Grid> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <Typography variant="body1">INFO Logs: {logs.filter(log => log.severity === 'INFO').length}</Typography> 
//                     </Grid> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <Typography variant="body1">WARN Logs: {logs.filter(log => log.severity === 'WARN').length}</Typography> 
//                     </Grid> 
//                     <Grid item xs={12} sm={6} md={3}> 
//                         <Typography variant="body1">ERROR Logs: {logs.filter(log => log.severity === 'ERROR').length}</Typography> 
//                     </Grid> 
//                 </Grid> 
//             </Paper> 

//             {/* Logs DataGrid */} 
//             <Paper elevation={3} sx={{ p: 2, mb: 3, height: 400 }}> 
//                 <Typography variant="h6" sx={{ mb: 2 }}>Captured Logs</Typography> 
//                 <DataGrid 
//                     rows={logs} 
//                     columns={columns} 
//                     pageSize={5} 
//                     rowsPerPageOptions={[5, 10, 25]} 
//                     checkboxSelection 
//                     disableSelectionOnClick 
//                 /> 
//             </Paper> 

//             {/* Log Details Pane */} 
//             <Paper elevation={3} sx={{ p: 2 }}> 
//                 <Typography variant="h6">Log Details</Typography> 
//                 <Box sx={{ mt: 2, height: '200px', backgroundColor: '#f5f5f5', p: 2 }}> 
//                     <Typography variant="body2" sx={{ textAlign: 'center' }}> 
//                         Detailed log information will be displayed here when a log is selected from the list. 
//                     </Typography> 
//                 </Box> 
//             </Paper> 

//             {/* Export and Retention Controls */} 
//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}> 
//                 <Button variant="contained" color="primary">Export Logs</Button> 
//                 <Button variant="outlined" color="secondary">Set Retention Policy</Button> 
//             </Box> 
//         </Box> 
//     ); 
// }; 

// export default Logs; 


import React, { useState } from 'react'; 
import { Paper, Typography, Tabs, Tab, Grid } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid'; 
  
const Logs = () => { 
    const [selectedLogType, setSelectedLogType] = useState(0); 

    const logTypes = ['Syslog', 'DNS Logs', 'Authentication Logs', 'TLS/SSL Logs', 'Firewall Logs', 'File Integrity Logs']; 

    const handleChange = (event, newValue) => { 
        setSelectedLogType(newValue); 
    }; 

    // Example data for different log types 
    const logData = { 

        Syslog: [ 
            { id: 1, timestamp: '2024-10-18 12:01:02', message: 'System rebooted', level: 'Info' }, 
            { id: 2, timestamp: '2024-10-18 12:02:03', message: 'User logged in', level: 'Info' }, 
        ], 

        'DNS Logs': [ 
            { id: 1, timestamp: '2024-10-18 13:05:22', domain: 'example.com', action: 'Query' }, 
            { id: 2, timestamp: '2024-10-18 13:07:15', domain: 'another.com', action: 'Blocked' }, 
        ], 

        'Authentication Logs': [ 
            { id: 1, timestamp: '2024-10-18 12:30:02', user: 'admin', result: 'Success' }, 
            { id: 2, timestamp: '2024-10-18 12:35:10', user: 'guest', result: 'Failed' }, 
        ], 

        'TLS/SSL Logs': [ 
            { id: 1, timestamp: '2024-10-18 14:05:22', certificate: 'Cert_12345', status: 'Valid' }, 
            { id: 2, timestamp: '2024-10-18 14:15:00', certificate: 'Cert_67890', status: 'Expired' }, 
        ], 

        'Firewall Logs': [
            { id: 1, timestamp: '2024-10-18 14:25:10', action: 'Allow', sourceIP: '192.168.1.1', destinationIP: '10.0.0.1' }, 
            { id: 2, timestamp: '2024-10-18 14:27:35', action: 'Block', sourceIP: '192.168.1.2', destinationIP: '10.0.0.2' }, 
        ], 

        'File Integrity Logs': [ 
            { id: 1, timestamp: '2024-10-18 14:40:05', file: '/etc/passwd', status: 'Unchanged' }, 
            { id: 2, timestamp: '2024-10-18 14:45:22', file: '/var/log/auth.log', status: 'Modified' }, 
        ], 
    }; 

    // Define columns for different log types 
    const columns = { 
        Syslog: [ 
            { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
            { field: 'message', headerName: 'Message', flex: 2 }, 
            { field: 'level', headerName: 'Level', flex: 1 }, 
        ], 

        'DNS Logs': [ 
            { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
            { field: 'domain', headerName: 'Domain', flex: 2 }, 
            { field: 'action', headerName: 'Action', flex: 1 }, 
        ], 

        'Authentication Logs': [ 
            { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
            { field: 'user', headerName: 'User', flex: 1 }, 
            { field: 'result', headerName: 'Result', flex: 1 }, 
        ], 
        
        'TLS/SSL Logs': [ 
            { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
            { field: 'certificate', headerName: 'Certificate', flex: 2 }, 
            { field: 'status', headerName: 'Status', flex: 1 }, 
        ], 

        'Firewall Logs': [ 
            { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
            { field: 'action', headerName: 'Action', flex: 1 }, 
            { field: 'sourceIP', headerName: 'Source IP', flex: 1 }, 
            { field: 'destinationIP', headerName: 'Destination IP', flex: 1 }, 
        ], 

        'File Integrity Logs': [ 
            { field: 'timestamp', headerName: 'Timestamp', flex: 1 }, 
            { field: 'file', headerName: 'File', flex: 2 }, 
            { field: 'status', headerName: 'Status', flex: 1 }, 
        ], 
    }; 

    return ( 

        <> 
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}> 
                <Typography variant="h6">Log Types</Typography> 
                <Tabs 
                    value={selectedLogType} 
                    onChange={handleChange} 
                    indicatorColor="primary" 
                    textColor="primary" 
                    variant="scrollable" 
                    scrollButtons="auto" 
                    sx={{ mt: 2 }} 
                > 
                    {logTypes.map((type, index) => ( 
                        <Tab label={type} key={type} /> 
                    ))} 
                </Tabs> 
            </Paper> 

            <Paper elevation={3} sx={{ p: 2, height: 400 }}> 
                <Typography variant="h6" sx={{ mb: 2 }}> 
                    {logTypes[selectedLogType]} Logs 
                </Typography> 
                <DataGrid 
                    rows={logData[logTypes[selectedLogType]]} 
                    columns={columns[logTypes[selectedLogType]]} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 25]} 
                    checkboxSelection 
                    disableSelectionOnClick 
                /> 
            </Paper> 
        </> 
    ); 
}; 

export default Logs; 