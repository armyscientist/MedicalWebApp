import React from 'react';
import { Link } from 'react-router-dom';
import bed_icon from './icons/inpatient.svg';

function UtilityCard(props) {
  return (
    <div key={props.key} className={props.className}>        
          {props.with_hospital &&
          <div className='hospital-content'>            
            <div className='hospital-name'>{ props.data.hospital_name}</div>
          </div>}
          
          <div className='utility-content'>
            <img className="card-logo" src={bed_icon} width="30px" height="30px"></img>
            <div className='utility-name'>{props.data.utility_name}</div>              
           
            <div className='utility-count-content'>
              <div className="card-utility-count">{props.with_count && (props.data.count)}</div>            
              <div className='card-slash'>{props.with_count && ("/")}</div>
              <div className="card-utility-total">{props.with_count && (props.data.total)}</div>
            </div> 

          </div>        
            
               
    </div>
  );
}

export default UtilityCard;
