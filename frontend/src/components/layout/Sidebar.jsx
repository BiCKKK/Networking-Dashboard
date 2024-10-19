import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import TrafficIcon from "@mui/icons-material/Traffic";
import BugReportIcon from "@mui/icons-material/BugReport";
import DescriptionIcon from "@mui/icons-material/Description";
import SecurityIcon from "@mui/icons-material/Security";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, onClose}) => {
    const menuItems = [
        { text: 'Network Overview', icon: <NetworkCheckIcon />, path: '/' },
        { text: 'Traffic Analysis', icon: <TrafficIcon />, path: '/traffic-analysis' },
        { text: 'Packet Inspection', icon: <BugReportIcon />, path: '/packet-inspection' },
        { text: 'Logs', icon: <DescriptionIcon />, path: '/logs' },
        { text: 'Intrusion Detection', icon: <SecurityIcon />, path: '/intrusion-detection' },
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
                    <NavLink
                        to={item.path}
                        key={item.text}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <ListItem 
                            button 
                            sx={{cursor: 'pointer'}}
                            onClick={() => {
                                if (open) {
                                    onClose();
                                }
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {open && <ListItemText primary={item.text} />}
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;