import { Box, Typography } from "@mui/material"; 
import React, { useState } from "react"; 
import ContextMenu from "../common/ContextMenu";

const ProgressBar = ({ functionsInstalled, onRemoveFunction }) => {
    const [contextMenuPosition, setContextMenuPosition] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleContextMenu = (event, idx) => {
        event.preventDefault();
        setSelectedSlot(idx);
        setContextMenuPosition({
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenuPosition(null);
        setSelectedSlot(null);
    };

    const handleRemoveFunction = () => {
        if (selectedSlot !== null && onRemoveFunction) {
            onRemoveFunction(selectedSlot);
        }
        handleCloseContextMenu();
    }

    return ( 
        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {functionsInstalled.map((func, idx) => (
                <Box 
                    key={idx} 
                    sx={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: functionsInstalled[idx] ? functionsInstalled[idx].color : '#e0e0e0', 
                        border: '1px solid #ccc', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: functionsInstalled[idx] ? 'pointer' : 'default', 
                        position: 'relative' 
                    }}  
                    onContextMenu={(event) => func && handleContextMenu(event, idx)}
                > 
                    {func && ( 
                        <Typography 
                            variant="caption" 
                            sx={{ color: '#fff', fontWeight: 'bold' }} 
                        > 
                            {func.type.slice(0, 2)} 
                        </Typography> 
                    )} 
                </Box> 
            ))} 

            <ContextMenu
                anchorPosition={contextMenuPosition}
                onClose={handleCloseContextMenu}
                onRemove={handleRemoveFunction} />
        </Box> 
    ); 
}; 

export default ProgressBar; 