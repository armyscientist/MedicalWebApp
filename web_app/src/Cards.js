import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards(props) {
  return (
    <div className='cards'>
      <div className='cards-container'>
        <img  className="card-logo" src="{}" width="30px" height="30px"></img>
        <div className="card-title">{props.utility_name}</div>      
        <div className="card-utility-count">{props.count}</div>            
        <div className='card-slash'>/</div>
        <div className="card-utility-total">{props.total}</div>
              
        
      </div>
    </div>
  );
}

export default Cards;
