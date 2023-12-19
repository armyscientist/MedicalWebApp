import React, {useState, useEffect} from 'react';
import UtilityCard from './UtilityCard';
import axios from 'axios';
import './TopUtilityList.css';
import './UtilityCard.css';
import {Link} from 'react-router-dom';

function TopUtilityList(){
   const [topUtilityListData, setTopUtilityListData]=useState([]);
    const utilityListData ={'utility_list': [
        {'hospital_name': 'Shri Markandeya Solapur Sahakari Rugnalaya & Research Center Niymit', 'utility_name': 'Ventilator Bed', 'count': 120, 'total': 150},
     {'hospital_name': 'Ashwini Sahakari Rugnalaya Ani Sanshodhan Kendra Niy.', 'utility_name': 'General Bed', 'count': 100, 'total': 105}]}

useEffect(()=>{
    loadUtilityListData();
},[]);


const loadUtilityListData= async () => {
    return await axios.get('http://127.0.0.1:5000/top-utility-list')
        .then((response) => {setTopUtilityListData(response.data);})
        .catch((err)=>console.log(err)); 
    };

    return(
        <div className='top-utility-list'>
            <div className='top-utility-list-container'>
        {
            topUtilityListData.length===0
            ?(<h1>empty data</h1>)
            :(topUtilityListData.top_utility_list.length===0
                ?(<h1>empty utility list</h1>)
                :(
                    topUtilityListData.top_utility_list.map((data, index)=>
                    <Link to='../search/hospital-info' className="utility-item-link" state={{hospital_id:data.hospital_id, data:data}}>
                        <UtilityCard
                        className="pink-utility-item"
                        data={data} 
                        key={index} 
                        with_count={true} with_hospital={true} />
                        </Link>
                    )

                )
                
                
                
            )
        }
        
        </div>
        </div>
    );

}

export default TopUtilityList;