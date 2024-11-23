import React from "react"; 
import NetworkFunction from "./NetworkFunction";

const functions = [ 
    { type: 'Forwarding', color: 'green', label: 'Forwarding' }, 
    { type: 'Mirroring', color: 'blue', label: 'Mirroring' }, 
    { type: 'ACL', color: 'red', label: 'Access Control' }, 
    { type: 'Asset Discovery', color: 'purple', label: 'Asset Discovery' }, 
    { type: 'DoS_Mitigation', color: 'orange', label: 'DOS Mitigation' },
    { type: 'Monitoring', color: 'brown', label: 'Monitoring' }, 
    { type: 'Goose_Analyser', color: 'orange', label: 'GOOSE Analyser' },  
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