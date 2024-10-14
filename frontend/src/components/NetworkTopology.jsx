import React, { useState, useEffect } from 'react';
import { fetchNetworkTopology, addNetworkTopology } from '../services/networkService';

const NetworkTopology = () => {
  const [topology, setTopology] = useState([]);
  const [page, setPage] = useState(1);
  const [newNode, setNewNode] = useState({
    node_name: '',
    node_type: '',
    status: 'active',
    location: '',
    connected_nodes: ''
  });

  useEffect(() => {
    const loadTopology = async () => {
      try {
        const data = await fetchNetworkTopology(page);
        setTopology(data);
      } catch (error) {
        console.error('Error fetching network topology:', error);
      }
    };
    loadTopology();
  }, [page]);

  const handleInputChange = (e) => {
    setNewNode({ ...newNode, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedNode = await addNetworkTopology(newNode);
      setTopology((prev) => [...prev, addedNode]); // Add to the list
    } catch (error) {
      console.error('Error adding network topology node:', error);
    }
  };

  return (
    <div>
      <h2>Network Topology</h2>
      <ul>
        {topology.map((node) => (
          <li key={node.id}>{node.node_name} ({node.node_type})</li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>

      <h3>Add New Node</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="node_name"
          value={newNode.node_name}
          onChange={handleInputChange}
          placeholder="Node Name"
          required
        />
        <input
          type="text"
          name="node_type"
          value={newNode.node_type}
          onChange={handleInputChange}
          placeholder="Node Type"
          required
        />
        <input
          type="text"
          name="status"
          value={newNode.status}
          onChange={handleInputChange}
          placeholder="Status"
        />
        <input
          type="text"
          name="location"
          value={newNode.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="connected_nodes"
          value={newNode.connected_nodes}
          onChange={handleInputChange}
          placeholder="Connected Nodes"
        />
        <button type="submit">Add Node</button>
      </form>
    </div>
  );
};

export default NetworkTopology;
