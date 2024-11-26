import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import TrafficIcon from "@mui/icons-material/Traffic";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, onClose}) => {
    const menuItems = [
        { text: 'Network Overview', icon: <NetworkCheckIcon />, path: '/' },
        { text: 'Traffic Analysis', icon: <TrafficIcon />, path: '/traffic-analysis' },
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
                        to={item.path}
                        key={item.text}
                        button="true"
                        component={NavLink}
                        sx={{cursor: 'pointer', textDecoration: 'none', color: 'inherit'}}
                        onClick={() => {
                            if (open) {
                                onClose();
                            }
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {open && <ListItemText primary={item.text} />}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;