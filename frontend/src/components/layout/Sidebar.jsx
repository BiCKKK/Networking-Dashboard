import React, { useState } from "react";
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import TrafficIcon from "@mui/icons-material/Traffic";
import BugReportIcon from "@mui/icons-material/BugReport";
import DescriptionIcon from "@mui/icons-material/Description";
import SecurityIcon from "@mui/icons-material/Security";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Sidebar = ({ open, onClose}) => {
    const menuItems = [
        { text: 'Network Overview', icon: <NetworkCheckIcon /> },
        { text: 'Traffic Analysis', icon: <TrafficIcon /> },
        { text: 'Packet Inspection', icon: <BugReportIcon /> },
        { text: 'Logs', icon: <DescriptionIcon /> },
        { text: 'Intrusion Detection', icon: <SecurityIcon /> },
    ];
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? 240 : 60,
                    transition: 'none',
                    overflowX: 'hidden',
                    top: '64px',
                    ml: 1.8,
                    mr: 1.8,
                },
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem 
                        button 
                        key={item.text} 
                        onClick={onClose}
                        sx={{cursor: 'pointer'}}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {open && <ListItemText primary={item.text} />}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;