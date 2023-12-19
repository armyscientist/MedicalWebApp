import React, {useState, useEffect} from 'react';
import UtilityCard from './UtilityCard';
import axios from 'axios';
import Home from './Home';
import './UtilityCard.css';
import './HomeUtilityList.css';
import {Link} from 'react-router-dom';

function HomeUtilityList(){
const [utilityListData, setUtilityListData]=useState([]);

useEffect(()=>{
    loadUtilityListData();
},[]);

const loadUtilityListData= async () => {
    return await axios.get('http://127.0.0.1:5000/utility-list',{params:{hospital_id:"all"}})
        .then((response) => {setUtilityListData(response.data);})
        .catch((err)=>console.log(err)); 
    };
console.log("utility list home=",utilityListData);
    return(
        <div className='home-utility-list'>
            <div className='home-utility-list-container'>
        {
            utilityListData.length===0
            ?(<h1>empty data</h1>)
            :(utilityListData.utility_list.length===0
                ?(<h1>empty utility list</h1>)
                :(  
                    utilityListData.utility_list.map((data, index)=>
                    <Link to='../search' className="utility-item-link" state={{value:data.utility_id, label:data.utility_name}}>
                        <UtilityCard  className="green-utility-item" data={data} key={index}/></Link>
                    )

                )
                
                
                
            )
        }
        </div>
        
        </div>
    );

}

export default HomeUtilityList;