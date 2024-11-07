import React, { useMemo } from "react"; 
import { ReactFlow, Background, Controls, MiniMap, 
    useEdgesState, useNodesState, addEdge, } from "@xyflow/react"; 
import Node from "./Node"; 
import TopologySidebar from "./TopologySidebar";
import "@xyflow/react/dist/style.css"; 

const initialNodes = [ 
    { id: '1', type: 'customNode', position: { x: 400, y: 50 }, data: { label: 'CONTROL SW', image: '/images/control-sw.png', functionsInstalled: Array(5).fill(null) } }, 
    { id: '2', type: 'customNode', position: { x: 850, y: 150 }, data: { label: 'CONTROL SCADA', image: '/images/control-scada.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '3', type: 'customNode', position: { x: 200, y: 250 }, data: { label: 'WAN R1', image: '/images/wan-r1.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '4', type: 'customNode', position: { x: 600, y: 250 }, data: { label: 'WAN R2', image: '/images/wan-r2.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '5', type: 'customNode', position: { x: 400, y: 420 }, data: { label: 'DPS GW', image: '/images/dps-gw.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '6', type: 'customNode', position: { x: 400, y: 700 }, data: { label: 'DPS RS', image: '/images/dps-rs.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '7', type: 'customNode', position: { x: 100, y: 900 }, data: { label: 'DPS HV', image: '/images/dps-hv.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '8', type: 'customNode', position: { x: -150, y: 1100 }, data: { label: 'IED1', image: '/images/ied1.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '9', type: 'customNode', position: { x: 100, y: 1100 }, data: { label: 'IED2', image: '/images/ied2.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '10', type: 'customNode', position: { x: 700, y: 900 }, data: { label: 'DPS MV', image: '/images/dps-mv.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '11', type: 'customNode', position: { x: 700, y: 1100 }, data: { label: 'IED3', image: '/images/ied3.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '12', type: 'customNode', position: { x: 950, y: 1100 }, data: { label: 'IED4', image: '/images/ied4.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '13', type: 'customNode', position: { x: 400, y: 1000 }, data: { label: 'DPS HMI', image: '/images/dps-hmi.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '14', type: 'customNode', position: { x: 0, y: 500 }, data: { label: 'DSS1 GW', image: '/images/dss1-gw.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '15', type: 'customNode', position: { x: -250, y: 675 }, data: { label: 'IDS', image: '/images/ids.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '16', type: 'customNode', position: { x: 0, y: 700 }, data: { label: 'DSS1 RTU', image: '/images/dss1-rtu.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '17', type: 'customNode', position: { x: 800, y: 500 }, data: { label: 'DSS2 GW', image: '/images/dss2-gw.png', functionsInstalled: Array(5).fill(null)  } }, 
    { id: '18', type: 'customNode', position: { x: 800, y: 700 }, data: { label: 'DSS2 RTU', image: '/images/dss2-rtu.png', functionsInstalled: Array(5).fill(null)  } }, 
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
                    onConnect={(params) => setEdges((eds) => addEdge(params, eds))} 
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

