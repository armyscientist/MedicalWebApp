import React from 'react';
import Navbar from './Navbar';
import './App.css';
import Home from './Home';
import { Routes, Switch, Route } from 'react-router-dom';
import HomeUtilityList from './HomeUtilityList';
import App from './App';
import TopUtilityList from './TopUtilityList';
import Cards from './Cards.js';
import './MainApp.css';
function MainApp() {
  return (
    <div>
      <div className='main-content'>
    <Navbar/>  
    
    <Routes>
              
          <Route path='/' exact element={<Home/>} />
          <Route path='/top-utilities' element={<TopUtilityList/>} />
          <Route path='/search/*' element={<App/>} />
          <Route path='/utilities' element={<HomeUtilityList/>} />
        </Routes>
        </div>
        </div>
      
  );
}

export default MainApp;
