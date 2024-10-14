import axios from 'axios';

const API_URL = 'http://localhost:5000/api/network_topology';

// Fetch network topology with pagination support
export const fetchNetworkTopology = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching network topology:', error);
    throw error;
  }
};

// Add new network topology node
export const addNetworkTopology = async (nodeData) => {
  try {
    const response = await axios.post(API_URL, nodeData);
    return response.data;
  } catch (error) {
    console.error('Error adding network topology node:', error);
    throw error;
  }
};
