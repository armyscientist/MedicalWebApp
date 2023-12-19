import React, { useState, useEffect } from 'react';
import {MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import axios from 'axios';
import Accordion  from './Accordion';
import HospitalInfo from './HospitalInfo';
import './SearchResults.css';


function SearchResults(props){
    console.log("search results callled = ",props.searchQuery);
    const [response_data, setResultData]=useState([]);
    const [searchType, setSearchType]=useState('');
    const [isButtonClicked, setIsButtonClicked]=useState(false);

    const setSearchTypeConditional=()=>{
        if((props.searchQuery.utility_id && props.searchQuery.hospital_name)|| props.searchQuery.utility_id){
            setSearchType("hospital_uilitycount");
        }
        else {
            setSearchType("hospital_list");
        }
    };
    console.log("response_data=",response_data);
    //const addressSearchHeaders=["SRN", ""]
    useEffect(() =>{
        loadSearchResultData();
        //console.log("useeffect");
      },[props.searchQuery]);
      

    const loadSearchResultData= async () => {
    return await axios.get('http://127.0.0.1:5000/search', {params:props.searchQuery})
        .then((response) => {setResultData(response.data); setSearchTypeConditional();})
        .catch((err)=>console.log(err)); 
    };


    return(
        <div className='search-results'>
            
            {response_data.length===0
                ?(<Accordion
                    data={{hospital_name:"Search Results"}}                    
                    />)

                :(  response_data.result_data==null
                    ?(<Accordion
                    
                        data={{hospital_name:"No Search Results"}}                    
                        />)

                    :(<div>
                        {
                        response_data.result_data.map((data, index)=>
                        <Accordion                     
                        key={index}
                        index={index}
                        data={data}                    
                        searchType={searchType}/>)}
                        </div>            
                    )                
                )
            }
            
        
        </div>
    );
}
export default SearchResults;