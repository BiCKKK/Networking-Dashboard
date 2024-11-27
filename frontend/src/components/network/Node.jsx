import React, { useState } from 'react'; 
import { Handle } from '@xyflow/react'; 
import ProgressBar from '../network/ProgressBar'; 
import AssetDiscoveryTooltip from './AssetDiscoveryTooltip';

const Node = ({ data }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const isSwitch = data.deviceType === 'switch';
    const isAssetDiscoveryInstalled = data.functionsInstalled.some(
        (func) => func.type === 'assetdisc'
    );

    const nodeStyle = {
        padding: '10px',
        background: '#f9f9f9',
        borderRadius: '8px',
        border: data.status === 'connected' ? '2px solid green' : '1px solid #ccc',
        textAlign: 'center',
        minWidth: '120px',
        minHeight: '120px',
        position: 'relative',
        opacity: data.status === 'connected' ? 1 : 0.5,
    };

    if (data.status === 'connected') {
        nodeStyle.border = '2px solid green';
    } else {
        nodeStyle.opacity = 0.5;
    }

    const handleDragOver = (event) => {
        if (isSwitch && data.isActive) {
            event.preventDefault();
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const functionData = JSON.parse(event.dataTransfer.getData('application/json'));
        if (data.onFunctionInstall) {
            data.onFunctionInstall(functionData);
        }
    };

    return ( 
        <div onDragOver={handleDragOver} onDrop={handleDrop} style={nodeStyle} data-id={data.label}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}> 
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

            {showTooltip && isSwitch && data.status === 'connected' && isAssetDiscoveryInstalled && (
                <AssetDiscoveryTooltip dpid={data.dpid} nodeName={data.label} />
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