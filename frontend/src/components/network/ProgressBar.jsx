import { Box } from "@mui/material";
import React from "react";

const ProgressBar = ({ functionsInstalled }) => {
    return (
        <Box sx={{display: 'flex', gap: '4px'}}>
            {functionsInstalled.map((func, idx) => (
                <Box key={idx} 
                    sx={{width: '20px', 
                    height: '20px', 
                    backgroundColor: func ? func.color : '#e0e0e0', 
                    border: '1px solid #ccc',}} />
            ))}
        </Box>
    );
};

export default ProgressBar;