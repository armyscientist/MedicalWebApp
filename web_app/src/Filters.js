import React, {useState} from 'react';
import './Filters.css';
import close_icon from './icons/no.svg';

function Filters(){
    const [click, setClick]=useState(false);
    const handleClick =()=>   setClick(!click);
    
    return(
        <div className='filters'>
        
        <button className="filters-button" onClick={handleClick}></button>  
        <div className={click ? "filters-content active": "filters-content"}>  
        <img className="close-icon" src={close_icon} width="45px" height="45px" onClick={handleClick}></img>
            <h1></h1>  
            
        </div>
    
    

    </div>

    );
}

export default Filters;