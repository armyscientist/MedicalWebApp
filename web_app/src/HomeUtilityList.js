import React, {useState, useEffect} from 'react';
import UtilityCard from './UtilityCard';
import axios from 'axios';
import Home from './Home';
import './UtilityCard.css';
import './HomeUtilityList.css';
import {Link} from 'react-router-dom';

function HomeUtilityList(){

    return(
        <div className='home-utility-list'>
            <div className='home-utility-list-container'>
        Utility List
        </div>
        
    </div>
  );
}

export default HomeUtilityList;
