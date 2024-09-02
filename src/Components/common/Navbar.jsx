import React from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links"
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='w-full   bg-richblack-900  text-richblack-25  border border-richblack-700'>
    
      <div className='w-11/12 flex flex-row justify-around items-center   mx-auto py-2'>

        {/* image */}
        <img  src={logo} alt='logo'  />
        {/* navbarlink */}
          <ul  className='flex flex-row gap-5 items-center justify-center'>
              {
                NavbarLinks.map((navItem,index) =>(
                  <li  key={index}>
                     {
                      navItem.title === "Catalog" ?
                       (
                        <div></div>
                        ): 
                        ( 
                          <Link  to={navItem.path}>
                          {navItem.title}
                        </Link>
                        )
                     }
                  </li>
                ))
              }
          </ul>
        {/* login and dashboard */}

        <div>
          login and signup
        </div>
      </div>
    
    </div>
  )
}

export default Navbar