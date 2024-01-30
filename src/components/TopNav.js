import { Link, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import "./topnav.css"


function TopNav() {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const handleMenuItemClick = (index) => {
    // debugger
    // setActiveMenuItem(index);
    // if (index === '0') {
    //   <Route path="/user-details" element={<Userdetail />}></Route>
    // }
  };


  let isUserLoggedIn = true
  let haveToken = true


  return (
    <div>

      <nav class="navbar">
        <div class="nav-container">

          <div class="navbar-header">
            <button class="navbar-toggler" data-toggle="open-navbar1">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <a className='anchor' href="#">
              <h4>Bridge<span>fix</span></h4>
            </a>
          </div>

          <div class="navbar-menu" id="open-navbar1">
            <ul class="navbar-nav">
              <li class="navbar-dropdown"><Link to="/page/tracker" className='anchor' href="#">Dashboard</Link></li>
              <li class="navbar-dropdown">

                {
                  isUserLoggedIn
                    ?
                    <Link to="/page/user-details" className='anchor' class="dropdown-toggler" data-dropdown="my-dropdown-id">
                      Profile
                    </Link>
                    
                    :
                    null
                }
                {/* <ul class="dropdown" id="my-dropdown-id">
                  <li><a className='anchor' href="#">Actions</a></li>
                  <li><a className='anchor' href="#">Something else here</a></li>
                  <li class="separator"></li>
                  <li><a className='anchor' href="#">Seprated link</a></li>
                  <li class="separator"></li>
                  <li><a className='anchor' href="#">One more seprated link.</a></li>
                </ul> */}
              </li>
              
              <li class="navbar-dropdown">
                <Link to="/page/add-attendence" className='anchor' class="dropdown-toggler" data-dropdown="blog">
                  Manage Attendence
                </Link>
              </li>
              <li><Link className='anchor' href="#">Members</Link></li>
              <li><Link className='anchor' href="#">Calender</Link></li>
              <li><Link className='anchor' href="#">Contact</Link></li>
              <li><Link className='anchor' href="#">Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

    </div>
  );
}

export default TopNav;
