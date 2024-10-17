import React, { useState } from "react";
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import TrafficIcon from "@mui/icons-material/Traffic";
import BugReportIcon from "@mui/icons-material/BugReport";
import DescriptionIcon from "@mui/icons-material/Description";
import SecurityIcon from "@mui/icons-material/Security";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Sidebar = ({}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { test: 'Network Overview', icon: <NetworkCheckIcon /> },
        { test: 'Traffic Analysis', icon: <TrafficIcon /> },
        { test: 'Packet Inspection', icon: <BugReportIcon /> },
        { test: 'Logs', icon: <DescriptionIcon /> },
        { test: 'Intrusion Detection', icon: <SecurityIcon /> },
    ]
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={isOpen}
            sx={{
                width: isOpen ? 240 : 60,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isOpen ? 240 : 60,
                    transition: 'width 0.3s',
                    overflowX: 'hidden',
                    top: '64px',
                },
            }}
        >
            <div>
                <IconButton onClick={toggleDrawer}>
                    {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={item.text}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {isOpen && <ListItemText primary={item.text} />}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;