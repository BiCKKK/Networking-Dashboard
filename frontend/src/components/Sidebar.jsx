import React, { useState } from 'react'; 
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material'; 
import { Dashboard, Menu as MenuIcon } from '@mui/icons-material'; 
import './Sidebar.css'; // Ensure Sidebar.css includes styles for .sidebar-open and .sidebar-closed 

const Sidebar = () => { 
  const [isOpen, setIsOpen] = useState(false); 
  const toggleSidebar = () => { 
    setIsOpen(!isOpen); 
  }; 
  return ( 
    <Drawer 
      variant="permanent" 
      open={isOpen}
      className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`} 
      sx={{ 
        width: isOpen ? 240 : 70, 
        flexShrink: 0, 
        '& .MuiDrawer-paper': { 
          width: isOpen ? 240 : 70, 
          boxSizing: 'border-box', 
          transition: 'width 0.3s', 
        }, 
      }} 
    > 
      <div className="sidebar-header"> 
        <IconButton onClick={toggleSidebar} className="toggle-btn"> 
          <MenuIcon /> 
        </IconButton> 
      </div> 
      <List> 
        <ListItem button> 
          <ListItemIcon> 
            <Dashboard /> 
          </ListItemIcon> 
          {isOpen && <ListItemText primary="Dashboard" />} 
        </ListItem> 
        {/* Additional ListItems can be added here */} 
      </List> 
    </Drawer> 
  ); 
}; 

export default Sidebar; 