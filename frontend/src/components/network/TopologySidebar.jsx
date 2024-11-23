import React from "react"; 
import NetworkFunction from "./NetworkFunction";

const functions = [ 
    { type: 'forwarding', color: 'green', label: 'Forwarding' }, 
    { type: 'mirror', color: 'blue', label: 'Mirroring' },  
    { type: 'assetdisc', color: 'purple', label: 'Asset Discovery' }, 
    { type: 'dos_mitigation', color: 'orange', label: 'DOS Mitigation' },
    { type: 'monitoring', color: 'brown', label: 'Monitoring' }, 
    { type: 'goose_analyser', color: 'gray', label: 'GOOSE Analyser' },  
]; 

const TopologySidebar = () => { 
    return ( 
        <div style={{ width: '20%', padding: '10px', background: '#f0f0f0' }}> 
            <h4>Network Functions</h4> 
            {functions.map((func) => ( 
                <NetworkFunction
                    key={func.type}
                    functionData={func}
                /> 
            ))} 
        </div> 
    ); 
}; 

export default TopologySidebar; 