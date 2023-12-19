import React, { useState, useEffect } from "react";
import HospitalInfo from "./HospitalInfo";
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom';
import './Accordion.css';
import know_more_icon from './icons/ui_zoom_in.svg';
import phone_icon from './icons/phone.svg';
import ambulance_icon  from './icons/ambulance.svg';
import hospital_icon from './icons/hospital.svg';

function Accordion(props){
  console.log("inside accordion = ",props.data);
    const [isActive, setIsActive]=useState(false);
    const [displayHospitalInfo, setDisplayHospitalInfo]=useState(false);
    

    const title= 'Section 1';
      const content= `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
      laborum cupiditate possimus labore, hic temporibus velit dicta earum
      suscipit commodi eum enim atque at? Et perspiciatis dolore iure
      voluptatem.`;



    return(
      <div key={props.key} className={isActive ? "myaccordion-item active":"myaccordion-item"}>
        <div className={isActive && "accordion-title-container"}>
          <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
            <div className="accordion-index">{props.index+1 }</div>      
            <div className="accordion-hospital-name">{props.data.hospital_name}</div>              
              { props.searchType==="hospital_uilitycount" &&
                <div className="accordion-utility-count">{props.data.count}</div>
              }
            {/*<div className="expand-arrow">{isActive ? '-' : '+'}</div>*/}
            </div>
          </div>

          {isActive &&  
          <div className="accordion-content">
            <div className="accordion-address">
            <img className="accordion-content-element" src={hospital_icon} width="40px" height="40px"></img>
              <div className="accordion-content-element"><div className="element-tag">Building#</div><div className="element-value">{props.data.building_no}</div></div>
              <div className="accordion-content-element" ><h5 className="element-tag">Street</h5><h5 className="element-value">{props.data.street}</h5></div>
              <div className="accordion-content-element"><h5 className="element-tag">Area</h5><h5 className="element-value">{props.data.area}</h5></div>
              <div className="accordion-content-element"><h5 className="element-tag">City</h5><h5 className="element-value">{props.data.city}</h5></div>
              <div className="accordion-content-element"><h5 className="element-tag">Pincode</h5 ><h5 className="element-value">{props.data.pincode}</h5></div>
            </div>
            <div className="accordion-phone">
              <div className="accordion-content-element"><img src={phone_icon} width="30px" height="30px"></img><h5 className="element-value">{props.data.phone_appointment}</h5></div>
              <div className="accordion-content-element"><img src={ambulance_icon} width="40px" height="40px"></img><h5 className="element-value">{props.data.phone_ambulance}</h5></div>
            </div>
            <div className="accordion-more-info">
              <div className="accordion-content-element">{props.data.last_updated}</div>
                
                <Link className="know-more-link" to={`/search/hospital-info`} state={{hospital_id:props.data.hospital_id, data:props.data}}>
                  <img src={know_more_icon} width="40px" height="40px"></img>
                </Link>
              
            </div>
          </div>}
      
            
      </div>        

    );

}

export default Accordion;