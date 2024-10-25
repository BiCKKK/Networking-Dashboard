import React, { useState } from "react"; 
import { ReactFlow, Background, Controls, MiniMap, 
  useEdgesState, useNodesState, addEdge, } from "@xyflow/react"; 
import Node from "./Node"; 
import TopologySidebar from "./TopologySidebar";
import "@xyflow/react/dist/style.css"; 

const initialNodes = [ 
  { id: '1', type: 'customNode', position: { x: 400, y: 50 }, data: { label: 'CONTROL SW', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '2', type: 'customNode', position: { x: 800, y: 100 }, data: { label: 'CONTROL SCADA', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '3', type: 'customNode', position: { x: 200, y: 200 }, data: { label: 'WAN R1', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '4', type: 'customNode', position: { x: 600, y: 200 }, data: { label: 'WAN R2', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '5', type: 'customNode', position: { x: 400, y: 400 }, data: { label: 'DPS GW', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '6', type: 'customNode', position: { x: 400, y: 600 }, data: { label: 'DPS RS', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '7', type: 'customNode', position: { x: 100, y: 800 }, data: { label: 'DPS HV', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '8', type: 'customNode', position: { x: 0, y: 1000 }, data: { label: 'IED1', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '9', type: 'customNode', position: { x: 200, y: 1000 }, data: { label: 'IED2', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '10', type: 'customNode', position: { x: 700, y: 800 }, data: { label: 'DPS MV', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '11', type: 'customNode', position: { x: 600, y: 1000 }, data: { label: 'IED3', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '12', type: 'customNode', position: { x: 800, y: 1000 }, data: { label: 'IED4', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '13', type: 'customNode', position: { x: 400, y: 1000 }, data: { label: 'DPS HMI', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '14', type: 'customNode', position: { x: 0, y: 300 }, data: { label: 'DSS1 GW', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '15', type: 'customNode', position: { x: -200, y: 375 }, data: { label: 'IDS', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '16', type: 'customNode', position: { x: 0, y: 500 }, data: { label: 'DSS1 RTU', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '17', type: 'customNode', position: { x: 800, y: 300 }, data: { label: 'DSS2 GW', functionsInstalled: [null, null, null, null, null] } }, 
  { id: '18', type: 'customNode', position: { x: 800, y: 500 }, data: { label: 'DSS2 RTU', functionsInstalled: [null, null, null, null, null] } }, 
]; 

const initialEdges = [ 
  { id: 'e1-2', source: '1', target: '2' }, 
  { id: 'e1-3', source: '1', target: '3' }, 
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' }, 
  { id: 'e5-6', source: '5', target: '6' }, 
  { id: 'e6-7', source: '6', target: '7' }, 
  { id: 'e7-8', source: '7', target: '8' }, 
  { id: 'e7-9', source: '7', target: '9' }, 
  { id: 'e6-10', source: '6', target: '10' }, 
  { id: 'e10-11', source: '10', target: '11' }, 
  { id: 'e10-12', source: '10', target: '12' }, 
  { id: 'e6-13', source: '6', target: '13' }, 
  { id: 'e3-14', source: '3', target: '14' }, 
  { id: 'e14-15', source: '14', target: '15' }, 
  { id: 'e14-16', source: '14', target: '16' }, 
  { id: 'e4-17', source: '4', target: '17' }, 
  { id: 'e17-18', source: '17', target: '18' }, 
];  

const NetworkTopology = ({}) => { 
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); 
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); 

  const installFunctionInFirstEmptySlot = (functionsInstalled, functionType) => { 
    const updatedFunctions = [...functionsInstalled];
    const emptyIndex = updatedFunctions.findIndex((func) => func === null); 
    if (emptyIndex !== -1) { 
      updatedFunctions[emptyIndex] = { type: functionType, color: getFunctionColor(functionType) }; 
    } 
    return updatedFunctions; 
  };

  const handleDrop = (event, node) => {
    event.preventDefault();
    const functionType = event.dataTransfer.getData('functionType');
    if (functionType) {
      setNodes((prevNodes) => 
      prevNodes.map((n) => 
      n.id === node.id 
        ? {
          ...n,
          data: {
            ...n.data,
            functionsInstalled: installFunctionInFirstEmptySlot(n.data.functionsInstalled, functionType),
          },
        }
        : n
      )
    );
  }};

  const getFunctionColor = (functionType) => { 
    switch (functionType) {
      case 'Forwarding':
        return 'green'; 
      case 'Mirroring': 
        return 'blue'; 
      case 'ACL': 
        return 'red'; 
      case 'Asset Discovery': 
        return 'purple'; 
      case 'Monitoring': 
        return 'orange'; 
      default: 
        return '#e0e0e0'; 
    } 
  }; 

  return ( 
    <div style={{ width: '100%', height: '1000px', display: 'flex' }}> 
      <div style={{ width: '80%', height: '100%', border: '1px solid #ccc' }}> 
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))} 
          nodeTypes={{ customNode: Node }} 
          onDrop={(event) => {
            const nodeID = event.target.closest('.react-flow__node')?.dataset.id;
            const node = nodes.find((n) => n.id === nodeID);
            if (node) {
              handleDrop(event, node);
            }
          }}
          onDragOver={(event) => event.preventDefault()}
          style={{ width: '100%', height: '90%' }} 
          fitView 
          nodesDraggable={false}
        > 
          <MiniMap /> 
          <Controls /> 
          <Background /> 
        </ReactFlow> 
      </div> 
      <TopologySidebar /> 
    </div> 
  ); 
}; 

export default NetworkTopology; 