import React from "react";

const NetworkFunction = ({ functionData }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('application/json', JSON.stringify(functionData));
  };
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        cursor: 'move',
        backgroundColor: functionData.color,
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '5px',
      }}
    >
      {functionData.label}
    </div>
  );
};

export default NetworkFunction; 