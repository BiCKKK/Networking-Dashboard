import React from "react"; 
import { Handle } from "@xyflow/react"; 
import ProgressBar from "../network/ProgressBar"; 

const Node = ({ data }) => { 
  return ( 
    <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #ccc' }}> 
      <div style={{ fontWeight: 'bold' }}>{data.label}</div> 
      <ProgressBar functionsInstalled={data.functionsInstalled} /> 

      {/* React Flow's node handles for connecting nodes */} 
      <Handle type="target" position="top" style={{ background: '#555' }} /> 
      <Handle type="source" position="bottom" style={{ background: '#555' }} /> 
    </div> 
  ); 
}; 

export default Node; 