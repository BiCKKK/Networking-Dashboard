import React, { useEffect, useMemo } from "react"; 
import { ReactFlow, Background, Controls, MiniMap, 
    useEdgesState, useNodesState, } from "@xyflow/react"; 
import Node from "./Node"; 
import TopologySidebar from "./TopologySidebar";
import "@xyflow/react/dist/style.css"; 
import CustomEdge from "../common/CustomEdge";

const NetworkTopology = ( { nodes, edges } ) => { 

    const edgeTypes = {
        custom: CustomEdge,
    };

    return ( 
        <div style={{ width: '100%', height: '1000px', display: 'flex' }}> 
            <div style={{ width: '80%', height: '100%', border: '1px solid #ccc' }}> 
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges} 
                    nodeTypes={{ customNode: Node }}
                    edgeTypes={edgeTypes} 
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

