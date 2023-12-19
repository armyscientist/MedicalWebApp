import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import home_video from './videos/HomeVideo.mp4';
function Home(){
    
    return( 
    <div className='home'>
      <video className='home-video' autoPlay loop muted>
      
      <source src={home_video} type='video/mp4' />
      </video>
      <div className='overlay'></div>
    <div className='hero-container'>
    
    
    <h1>Check Availability</h1>
    <p>of Ventilator, ICU, General bed and many!</p>
    <p>Check latest count in your city</p>
    <button className="home-check-button">
    <Link to='/search' >Check Now</Link>
    </button>
  </div>
  </div>
  );

}

export default Home;