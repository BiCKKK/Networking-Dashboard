import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import './Header.css';

const Header = ({toggleSidebar}) => {
    return (
        <AppBar position="fixed" className="header">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
                    <Typography variant="h6" noWrap>
                        Network Monitoring Dashboard
                    </Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
