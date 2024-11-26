import React, { useRef, useState } from "react"; 
import { Fab, Box, Menu, MenuItem, Typography } from "@mui/material"; 
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; 
import axios from "axios";

const commands = [
    { name: 'Packet Count', endpoint: 'http://localhost:5100/api/packet_count' },
    { name: 'Start GOOSE Communication', endpoint: 'http://localhost:5100/api/start_goose' },
    { name: 'Start SV Communication', endpoint: 'http://localhost:5100/api/start_sv' },
    { name: 'Start IEC104 Communication', endpoint: 'http://localhost:5100/api/start_iec104' },
    { name: 'DoS Attack', endpoint: 'http://localhost:5100/api/dos_attack' },
    { name: 'Start SGLab GOOSE', endpoint: 'http://localhost:5100/api/sglab_goose' },
    { name: 'FDI Attack', endpoint: 'http://localhost:5100/api/fdi_attack' },
    { name: 'Performance Monitoring', endpoint: 'http://localhost:5100/api/perfmon' },
    { name: 'Mirror Attack', endpoint: 'http://localhost:5100/api/mirror_attack' },
]

const SimulationCommands = () => { 
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleButtomClick = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
    };

    const handleCommandTrigger = async (command) => {
        try {
            const response = await axios.post(command.endpoint);
            alert(`${command.name} triggered succesfully!`);
        } catch (error) {
            alert(`Failed to trigger ${command.name}: ${error.response?.data?.error || error.message}`);
        }
        setMenuAnchor(null);
    };

    return ( 
    
        <Box
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 1300, // Ensures it floats above other content 
            }}
        >
            <Fab
                color="primary"
                aria-label="simulate network commands"
                onClick={handleButtomClick}
                sx={{
                    "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                    },
                }}
            >
                <PlayArrowIcon />
            </Fab>
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleCloseMenu}
                disablePortal
                disableScrollLock
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: 48 * 4.5,
                            width: "20ch",
                        }
                    }
                }}
            >
                {commands.map((command, index) => (
                    <MenuItem key={index} onClick={() => handleCommandTrigger(command)}>
                        <Typography variant="body1">{command.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    ); 
}; 

export default SimulationCommands; 