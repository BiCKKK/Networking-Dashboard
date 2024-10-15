import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NetworkTopology from './components/NetworkTopology';
// Import other components as needed

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <div className='main-content'>
        <Sidebar/>
        <div>
          <h1>Welcome to the Networking</h1>
        </div>
        <NetworkTopology />
      {/* Add other components here */}
      </div> 
    </div>
  );
};

export default App;