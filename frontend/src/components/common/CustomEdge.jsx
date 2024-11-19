// CustomEdge.jsx
import React from "react";
import { getBezierPath, getEdgeCenter } from "@xyflow/react";

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    label,
    onEdgeClick, // Custom prop for handling clicks
}) => {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });

    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
            {label && (
                <text
                x={edgeCenterX}
                y={edgeCenterY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fill: '#000', fontSize: 12 }}
                onClick={(event) => {
                    event.stopPropagation();
                    if (data && data.onClick) data.onClick();
                }}
                >
                {label}
                </text>
            )}
        {/* Example: Add a button-like element */}
        {label === 'Clickable' && (
            <foreignObject x={edgeCenterX - 15} y={edgeCenterY - 15} width={30} height={30}>
                <button
                style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '15px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={(event) => {
                    event.stopPropagation();
                    alert(`Button on edge ${id} clicked!`);
                    // Logic for running GOOSE, SV, and other scripts can be implemented here.
                }}
                >
                Btn
                </button>
            </foreignObject>
        )}
        </>
    );
};

export default CustomEdge;

