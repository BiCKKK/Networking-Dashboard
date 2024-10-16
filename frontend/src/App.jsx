import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer'
import './App.css';
// Import other components as needed

const App = () => (
  <div className='app-container'>
    <Header/>
    <Sidebar/>
    <Footer/>
  </div>
);

export default App;