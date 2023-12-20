import React, { useState, useEffect } from 'react';
//import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import menu_icon from './icons/ui_menu.svg';
import home_icon from './icons/home-quarantine.svg';
import search_icon from './icons/magnifying_glass.svg';
import top_icon from './icons/star_large.svg';
import utility_list_icon from './icons/medicines.svg';
import web_logo from './icons/mobile.svg';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>            
          <img src={web_logo} width="50px" height="50px"></img>          
          </Link>

          <div className='menu-icon' onClick={handleClick}>
          <img src={menu_icon} width="45px" height="45px"></img>
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
           
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              <img src={home_icon} width="50px" height="50px"></img>
              <h1>Home</h1>
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/search' className='nav-links' onClick={closeMobileMenu}>
              <img src={search_icon} width="50px" height="50px"></img> 
              <h1>Search</h1>
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/top-utilities'
                className='nav-links'
                onClick={closeMobileMenu}>
                <img src={top_icon} width="50px" height="50px"></img>     
                <h1>Top</h1>
              </Link>
            </li>

          </ul>
          {/*button && <Button buttonStyle='btn--outline'>SIGN UP</Button>*/}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
