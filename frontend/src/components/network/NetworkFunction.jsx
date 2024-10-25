import { useDrag } from "react-dnd"; 

const NetworkFunction = ({ type, color, label }) => { 
  const [{ isDragging }, drag] = useDrag(() => ({ 
    type: 'FUNCTION', 
    item: { type }, 
    collect: (monitor) => ({ 
      isDragging: !!monitor.isDragging(), 
    }), 
  })); 

  return ( 
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', backgroundColor: color, padding: '8px', borderRadius: '4px' }}> 
      {label} 
    </div> 
  ); 
}; 

export default NetworkFunction; 