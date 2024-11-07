import React from "react";
import { Menu, MenuItem } from "@mui/material";

const ContextMenu = ({anchorPosition, onClose, onRemove}) => {
    return (
        <Menu
            open={Boolean(anchorPosition)}
            onClose={onClose}
            anchorReference="anchorPosition"
            anchorPosition={
                anchorPosition
                    ? {top: anchorPosition.mouseY, left: anchorPosition.mouseX}
                    : undefined   
            }
        >
            <MenuItem onClick={onRemove}>Remove Function</MenuItem>
        </Menu>
    );
};

export default ContextMenu;