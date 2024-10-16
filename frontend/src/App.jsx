import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';
// Import other components as needed

const App = () => (
  <div className='app-container'>
    <Header/>
    <Sidebar/>
  </div>
);

export default App;