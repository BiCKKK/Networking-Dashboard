import React from 'react'; 
import { Handle } from '@xyflow/react'; 
import ProgressBar from '../network/ProgressBar'; 

const Node = ({ data }) => {

    return ( 
        <div style={{ 
            padding: '10px', background: '#f9f9f9', 
            borderRadius: '8px', border: '1px solid #ccc', 
            textAlign: 'center', minWidth: '120px', 
            minHeight: '120px', position: 'relative' 
        }}> 
            {data.image && ( 
                <img 
                    src={data.image} 
                    alt={data.label} 
                    style={{ 
                        width: '60px', 
                        height: '60px', 
                        objectFit: 'cover', 
                        marginBottom: '10px', 
                    }} 
                /> 
            )} 
            <div style={{ fontWeight: 'bold' }}>{data.label}</div> 
            <ProgressBar 
                functionsInstalled={data.functionsInstalled}
                onRemoveFunction={data.onRemoveFunction}
            /> 
            <Handle type="target" position="top" style={{ background: '#555' }} /> 
            <Handle type="source" position="bottom" style={{ background: '#555' }} /> 
        </div> 
    ); 
}; 

export default Node; 