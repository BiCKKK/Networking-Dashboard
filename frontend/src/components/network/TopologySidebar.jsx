import React from "react"; 

const TopologySidebar = () => { 
    const functions = [ 
        { type: 'Forwarding', color: 'green', label: 'Forwarding' }, 
        { type: 'Mirroring', color: 'blue', label: 'Mirroring' }, 
        { type: 'ACL', color: 'red', label: 'Access Control' }, 
        { type: 'Asset Discovery', color: 'purple', label: 'Asset Discovery' }, 
        { type: 'Monitoring', color: 'orange', label: 'Monitoring' }, 
    ]; 

    return ( 
        <div style={{ width: '20%', padding: '10px', background: '#f0f0f0' }}> 
            <h4>Network Functions</h4> 
            {functions.map((func) => ( 
                <div 
                    key={func.type} 
                    style={{ 
                        padding: '10px', 
                        background: func.color, 
                        color: '#fff', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        marginBottom: '5px', 
                    }} 
                    draggable 
                    onDragStart={(e) => e.dataTransfer.setData("functionType", func.type)} 
                > 
                    {func.label} 
                </div> 
            ))} 
        </div> 
    ); 
}; 

export default TopologySidebar; 