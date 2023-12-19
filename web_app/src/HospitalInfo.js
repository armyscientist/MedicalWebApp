import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import UtilityCard from './UtilityCard';
import './HospitalInfo.css';

import know_more_icon from './icons/ui_zoom_in.svg';
import phone_icon from './icons/phone.svg';
import ambulance_icon  from './icons/ambulance.svg';
import hospital_icon from './icons/hospital.svg';
//parameter list : via location : hospital_id, data
function HospitalInfo(){
    const [utility_list_data, setUtilityList]=useState([]);
    const [data, setData]=useState([]);


let location = useLocation();

useEffect(()=>{
    loadUtilityList();
    setData(location.state.data);
    console.log("finished useeffect");
},[]);

const loadUtilityList = async () => {
    return await axios.get('http://127.0.0.1:5000/utility-list', {params:{hospital_id:location.state.hospital_id}})
                      .then((response) => {setUtilityList(response.data); console.log("resposne data=",utility_list_data);})
                      .catch((err) =>console.log(err));
  
    };
console.log("Response data=",utility_list_data);

    return(
            
            <div className="hospital-info" >
                <div className='hospital-profile'>
                    <div className="hospital-profile-title">
                        <img></img>     
                        <div className="hospital-profile-hospital-name">{data.hospital_name}</div>   
                    </div>
                    <div className="accordion-content">
                        <div className="accordion-address">
                        <img className="accordion-content-element" src={hospital_icon} width="40px" height="40px"></img>
                        <div className="accordion-content-element"><div className="element-tag">Building#</div><div className="element-value">{data.building_no}</div></div>
                        <div className="accordion-content-element" ><h5 className="element-tag">Street</h5><h5 className="element-value">{data.street}</h5></div>
                        <div className="accordion-content-element"><h5 className="element-tag">Area</h5><h5 className="element-value">{data.area}</h5></div>
                        <div className="accordion-content-element"><h5 className="element-tag">City</h5><h5 className="element-value">{data.city}</h5></div>
                        <div className="accordion-content-element"><h5 className="element-tag">Pincode</h5 ><h5 className="element-value">{data.pincode}</h5></div>
                        </div>
                        <div className="accordion-phone">
                        <div className="accordion-content-element"><img src={phone_icon} width="30px" height="30px"></img><h5 className="element-value">{data.phone_appointment}</h5></div>
                        <div className="accordion-content-element"><img src={ambulance_icon} width="40px" height="40px"></img><h5 className="element-value">{data.phone_ambulance}</h5></div>
                        </div>
                        <div className="accordion-phone">
                        <div className="accordion-content-element"><img src={phone_icon} width="30px" height="30px"></img><h5 className="element-value">{data.inc}</h5></div>
                        <div className="accordion-content-element"><img src={ambulance_icon} width="40px" height="40px"></img><h5 className="element-value">{data.phone_ambulance}</h5></div>
                        </div>      

                
                    </div>
                </div>

                <div className='utility-list'>
                    <h2>Utility List</h2>
                    {utility_list_data.length===0 
                    ?(<h1>Empty data</h1>)
                    :(utility_list_data.utility_list.length===0 
                        ?(<h1>No utility found</h1>)
                        :(  utility_list_data.utility_list.map((data, index)=>
                            <UtilityCard className="blue-utility-item" data={data} with_count="true"/> )
                            
                        )
                    )
                    }                    
                </div>

            </div>

    );

}

export default HospitalInfo;