import React from "react"; 
import { Fab, Box } from "@mui/material"; 
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; 
import Draggable from "react-draggable";

const AttackSimulatorButton = () => { 
    // Placeholder function for triggering attack simulation 
    const handleAttackSimulation = () => { 
        console.log("Attack simulation triggered"); 
        // Replace this console log with actual attack simulation functionality 
    }; 

    return ( 
        <Draggable bounds="parent">
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
                    aria-label="simulate attack"
                    onClick={handleAttackSimulation}
                >
                    <PlayArrowIcon />
                </Fab>
            </Box>
        </Draggable> 
    ); 
}; 

export default AttackSimulatorButton; 