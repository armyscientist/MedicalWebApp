import React, { useState, useEffect } from 'react';
import {MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import axios from 'axios';
import './App.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import SearchResults from './SearchResults';
import { ActionMeta, OnChangeValue } from 'react-select';
import Filters from './Filters';
import HospitalInfo from './HospitalInfo';
import {Link, useLocation} from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App(props) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery]= useState({"utility_id":null, "utility_name":null, "hospital_name":null});
  let location = useLocation();
  

  const setSearchQueryObject = (attr, e) =>{
    if(e){
    console.log("setSearchQueryObject = ", e,attr);
    if(attr==="utility"){
      setSearchQuery({...searchQuery, ["utility_id"]: e.value, ["utility_name"]: e.label});
     
    }
    else
    {
      setSearchQuery({...searchQuery, ["hospital_name"]: e.label});
    }
    
    }
    else{
      setSearchQuery({...searchQuery, [attr]: null});
    }
    
}
  const inputSearchQueryFromHomeUtilityList=()=>{
    
    if(location.state){
          setSearchQueryObject("utility", location.state);
          console.log('########called', searchQuery, location.state.value);
        }
  };
  
  useEffect(() =>{
    loadDropDownListData();
    inputSearchQueryFromHomeUtilityList();
  },[]);

//For result display
  const loadDropDownListData = async () => {
  return await axios.get('http://127.0.0.1:5000/search-dropdown-filter')
                    .then((response) => setData(response.data))
                    .catch((err) =>console.log(err));

  };
 console.log('searchquery',searchQuery);
  
 
console.log(location)
  return (  
      <div className='search'>
      <div className='search-content'>  
      
        <div className='search-bar'>
          <Select className='search-bar-form select'
          isSearchable   
                     
          isClearable  
          value={{label:searchQuery.utility_name, value:searchQuery.utility_id}}
          options={data}
          placeholder="Select Utility"
          onChange={opt=> {setSearchQueryObject("utility", opt);}}/>

          <CreatableSelect 
          className='search-bar-form creatable-select'
          isClearable                 
          //value={selectedOption}
          placeholder="Type Hospital name" 
          onChange={opt=> (setSearchQueryObject("hospital_name", opt))}     
          //onChange={()=>console.)}
          //onInputChange={()=>console.log("changed")} 
          formatCreateLabel={() => ``}/>
        </div>
        
        

          <Routes>
            <Route path='/' element={
              <div className="below-search-bar">
                <Filters className="filters"/>   
                  {searchQuery.hospital_name===null && searchQuery.utility_id===null
                  ? (console.log("empty input"))
                :(<SearchResults className="search-results"
                searchQuery={searchQuery}/>)
                }
              </div>}
              /> 
            <Route path='/hospital-info' element={<div className="below-search-bar"><HospitalInfo/></div>}/>
          </Routes>  
        </div> 
        </div>
  );
  }

export default App;
