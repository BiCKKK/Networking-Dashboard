import React from 'react';  
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => (
  <Drawer
    variant="permanent"
    anchor="left"
    sx={{width: 240, flexShrink: 0}}>
    <List>
      <ListItem button>
        <ListItemText primary='Home'/>
      </ListItem>
      <ListItem button>
        <ListItemText primary='Topology'/>
      </ListItem>
      <ListItem button>
        <ListItemText primary='Traffic Analysis'/>
      </ListItem>
      <ListItem button>
        <ListItemText primary='Attack Detection'/>
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;