import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'
import './Sidebar.css';
import { Button } from "bootstrap";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/*Button to open the sidebar*/}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <MenuIcon />
            </button>

            {/*Sidebar content*/}
            <div className={`sidebar ${isOpen ? 'open':''}`}>
                {/*Close button inside the sidebar*/}
                <button className="close-btn" onClick={toggleSidebar}>
                    <CloseIcon/>
                </button>
                <ul>
                    <li>Network Overview</li>
                    <li>Packet Inspection</li>
                    <li>Attack Detection</li>
                    <li>Settings</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
