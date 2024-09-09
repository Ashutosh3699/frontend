import React from 'react';
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLinks = ({link,iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }

  return (
    <NavLink
    to={link.path}
    // onclick
    className={ ` relative py-2 px-8 text-sm  text-richblack-25 font-medium 
     ${matchRoute(link.path) ? ("bg-yellow-800") : ("bg-opacity-0")}`}
    >

    <span className={`absolute bg-yellow-5 h-full w-1 left-0 top-0  ${matchRoute(link.path) ? ("opacity-100") : ("opacity-0")}`}>
    </span>

    <div className='flex flex-row items-center gap-2'>
        
        <Icon  className="text-lg"/>
        <span>{link.name}</span>

    </div>
    
    
    </NavLink>
  )
}

export default SidebarLinks