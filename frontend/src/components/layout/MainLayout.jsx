import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, Toolbar } from "@mui/material";

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: "flex", width: '100%' }}>
            <Header onMenuClick={toggleSidebar} />
            <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
            <Box
                component="main"
                sx={{ flexGrow: 1, p:3, marginTop: '64px', width: `calc(100% - ${sidebarOpen ? '240px' : '60px'})` }}    
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;