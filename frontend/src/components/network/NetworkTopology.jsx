import React, { useMemo } from "react"; 
import { ReactFlow, Background, Controls, MiniMap, 
    useEdgesState, useNodesState, } from "@xyflow/react"; 
import Node from "./Node"; 
import TopologySidebar from "./TopologySidebar";
import "@xyflow/react/dist/style.css"; 


const initialNodes = [ 
    { id: '1', type: 'customNode', position: { x: 400, y: 50 }, data: { label: 'CONTROL SW', image: '/images/control-sw.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '2', type: 'customNode', position: { x: 850, y: 60 }, data: { label: 'CONTROL SCADA', image: '/images/control-scada.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '3', type: 'customNode', position: { x: 200, y: 250 }, data: { label: 'WAN R1', image: '/images/wan-r1.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '4', type: 'customNode', position: { x: 600, y: 250 }, data: { label: 'WAN R2', image: '/images/wan-r2.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '5', type: 'customNode', position: { x: 400, y: 420 }, data: { label: 'DPS GW', image: '/images/dps-gw.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '6', type: 'customNode', position: { x: 400, y: 650 }, data: { label: 'DPS RS', image: '/images/dps-rs.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '7', type: 'customNode', position: { x: 100, y: 650 }, data: { label: 'DPS HV', image: '/images/dps-hv.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '8', type: 'customNode', position: { x: -100, y: 950 }, data: { label: 'IED1', image: '/images/ied1.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '9', type: 'customNode', position: { x: 150, y: 950 }, data: { label: 'IED2', image: '/images/ied2.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '10', type: 'customNode', position: { x: 700, y: 650 }, data: { label: 'DPS MV', image: '/images/dps-mv.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '11', type: 'customNode', position: { x: 750, y: 950 }, data: { label: 'IED3', image: '/images/ied3.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '12', type: 'customNode', position: { x: 1000, y: 950 }, data: { label: 'IED4', image: '/images/ied4.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '13', type: 'customNode', position: { x: 450, y: 950 }, data: { label: 'DPS HMI', image: '/images/dps-hmi.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '14', type: 'customNode', position: { x: -200, y: 250 }, data: { label: 'DSS1 GW', image: '/images/dss1-gw.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '15', type: 'customNode', position: { x: -500, y: 260 }, data: { label: 'IDS', image: '/images/ids.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '16', type: 'customNode', position: { x: -150, y: 500 }, data: { label: 'DSS1 RTU', image: '/images/dss1-rtu.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
    { id: '17', type: 'customNode', position: { x: 1000, y: 250 }, data: { label: 'DSS2 GW', image: '/images/dss2-gw.png', functionsInstalled: Array(5).fill(null), deviceType: 'switch' } }, 
    { id: '18', type: 'customNode', position: { x: 1050, y: 500 }, data: { label: 'DSS2 RTU', image: '/images/dss2-rtu.png', functionsInstalled: Array(5).fill(null), deviceType: 'host' } }, 
]; 

const initialEdges = [ 
    { id: 'e1-2', source: '1', sourceHandle: 'right-source', target: '2', targetHandle: 'right-target' }, 
    { id: 'e1-3', source: '1', sourceHandle: 'bottom-source', target: '3', targetHandle: 'top-target' }, 
    { id: 'e1-4', source: '1', sourceHandle: 'bottom-source', target: '4', targetHandle: 'top-target' },
    { id: 'e1-5', source: '1', sourceHandle: 'bottom-source', target: '5', targetHandle: 'top-target' }, 
    { id: 'e5-6', source: '5', sourceHandle: 'bottom-source', target: '6', targetHandle: 'top-target' }, 
    { id: 'e6-7', source: '6', sourceHandle: 'left-source', target: '7', targetHandle: 'right-target' }, 
    { id: 'e7-8', source: '7', sourceHandle: 'left-source', target: '8', targetHandle: 'top-target' }, 
    { id: 'e7-9', source: '7', sourceHandle: 'bottom-source', target: '9', targetHandle: 'top-target' }, 
    { id: 'e6-10', source: '6', sourceHandle: 'right-source', target: '10', targetHandle: 'left-target' }, 
    { id: 'e10-11', source: '10', sourceHandle: 'bottom-source', target: '11', targetHandle: 'top-target' }, 
    { id: 'e10-12', source: '10', sourceHandle: 'right-source', target: '12', targetHandle: 'top-target' }, 
    { id: 'e6-13', source: '6', sourceHandle: 'bottom-source', target: '13', targetHandle: 'top-target' }, 
    { id: 'e3-14', source: '3', sourceHandle: 'right-source', target: '14', targetHandle: 'left-target' }, 
    { id: 'e14-15', source: '14', sourceHandle: 'right-source', target: '15', targetHandle: 'left-target' }, 
    { id: 'e14-16', source: '14', sourceHandle: 'bottom-source', target: '16', targetHandle: 'top-target' }, 
    { id: 'e4-17', source: '4', sourceHandle: 'left-source', target: '17', targetHandle: 'right-target' }, 
    { id: 'e17-18', source: '17', sourceHandle: 'bottom-source', target: '18', targetHandle: 'top-target' }, 
];  

const NetworkTopology = () => { 
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); 
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); 

    const installFunctionInFirstEmptySlot = (functionsInstalled, functionType) => {
        const updatedFunctions = [...functionsInstalled];
        const emptyIndex = updatedFunctions.findIndex((func) => func === null);
        const newFunction = { type: functionType, color: getFunctionColor(functionType) };

        if (emptyIndex !== -1) {
            updatedFunctions[emptyIndex] = newFunction;
        } else {
            updatedFunctions.push(newFunction);
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
        }
    };

    const handleRemoveFunction = (nodeID, slotIndex) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => 
                node.id === nodeID
                    ? {
                        ...node, 
                        data: {
                            ...node.data,
                            functionsInstalled: node.data.functionsInstalled
                                .map((func, idx) => (idx === slotIndex ? null: func))
                                .filter((func) => func !== null),
                    },
                }
            :node
            )
        );
    };

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

    const nodesWithRemoveCallback = useMemo(
        () => 
            nodes.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    onRemoveFunction: (index) => handleRemoveFunction(node.id, index),
                },
            })),
        [nodes]
    );

    return ( 
        <div style={{ width: '100%', height: '1000px', display: 'flex' }}> 
            <div style={{ width: '80%', height: '100%', border: '1px solid #ccc' }}> 
                <ReactFlow 
                    nodes={nodesWithRemoveCallback} 
                    edges={edges} 
                    onNodesChange={onNodesChange} 
                    onEdgesChange={onEdgesChange} 
                    nodeTypes={{ customNode: Node }} 
                    onDrop={(event) => {
                        const nodeID = event.target.closest('.react-flow__node')?.dataset.id;
                        const node = nodes.find((n) => n.id === nodeID);
                        if (node) {handleDrop (event, node)};
                    }} 
                    onDragOver={(event) => event.preventDefault()} 
                    style={{ width: '100%', height: '90%' }} 
                    fitView 
                    nodesDraggable={false} 
                    nodesConnectable={false}
                    defaultEdgeOptions={{ type: 'straight'}}
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

