import React from "react"; 

const TopologySidebar = () => { 
  const functions = [ 
    { type: 'Forwarding', color: 'green' }, 
    { type: 'Mirroring', color: 'blue' }, 
    { type: 'ACL', color: 'red' }, 
    { type: 'Asset Discovery', color: 'purple' }, 
    { type: 'Monitoring', color: 'orange' }, 
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
          onDragStart={(e) => e.dataTransfer.setData('functionType', func.type)} 
        > 
          {func.type} 
        </div> 
      ))} 
    </div> 
  ); 
}; 

export default TopologySidebar; 