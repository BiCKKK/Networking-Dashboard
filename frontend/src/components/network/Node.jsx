import React from 'react'; 
import { Handle } from '@xyflow/react'; 
import ProgressBar from '../network/ProgressBar'; 

const Node = ({ data }) => {
    const isSwitch = data.deviceType === 'switch';

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
            {isSwitch && (
                <ProgressBar 
                functionsInstalled={data.functionsInstalled}
                onRemoveFunction={data.onRemoveFunction}
                />
            )}
            <Handle type="target" position="top" style={{ background: '#555' }} id="top-target" />
            <Handle type="target" position="bottom" style={{ background: '#555' }} id="bottom-target" />
            <Handle type="target" position="left" style={{ background: '#555' }} id="left-target" /> 
            <Handle type="target" position="right" style={{ background: '#555' }} id="right-target" /> 
            <Handle type="source" position="top" style={{ background: '#555' }} id="top-source" /> 
            <Handle type="source" position="bottom" style={{ background: '#555' }} id="bottom-source" />
            <Handle type="source" position="left" style={{ background: '#555' }} id="left-source" />
            <Handle type="source" position="right" style={{ background: '#555' }} id="right-source" /> 
        </div> 
    ); 
}; 

export default Node; 