import React, { useState, useEffect } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links"
import { Link, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaChevronDown, FaShoppingCart  } from "react-icons/fa";
import ProfileDropDown from '../core/AuthTemplate/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import Loading from './loader/Loading';
// import cart from "../../features/cartSlice"

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const cart = useSelector((state) => state.cart);
    const [loading,setLoading] = useState(false);

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async()=>{

      setLoading(true);
      try {
        const result = await apiConnector("GET", categories.CATEGORY_API);
        setSubLinks(result.data.data);
        // console.log("sublinks are: ", result);

      } catch (error) {
        console.log("Error at fetching the sublinks from catalog")
      }
      setLoading(false);
    }

    useEffect(() => {
      fetchSubLinks();
    }, [])
    
    
    const location = useLocation();
    const matchRoute=(route)=>{
      return matchPath({path:route}, location.pathname);
    }
    // console.log("sublinks; ", subLinks);

  return (
    <div className='w-full   bg-richblack-900  text-richblack-25  border border-richblack-700'>
    
      <div className='w-11/12 flex flex-row justify-around items-center mx-auto py-2'>
        {/* image */}
        <Link  to={"/"}>
          <img  src={logo} alt='logo' />
        </Link>
        {/* navbarlink */}
          <ul  className='flex flex-row gap-5 items-center justify-center'>
              {
                NavbarLinks.map((navItem,index) =>(
                  <li  key={index}>
                     {
                      navItem.title === "Catalog" ?
                       (
                          <div className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}>
                             <p>{navItem.title}</p> 
                              <FaChevronDown />

                                <div  className=' invisible absolute  -left-44  top-[160%] flex flex-col justify-center items-center rounded-md
                                   bg-richblack-5  p-4  text-richblack-800 opacity-0  duration-400  transition-all
                                   group-hover:visible  group-hover:opacity-100  lg:w-[300px]  z-10  gap-2'>

                                   <div className='absolute w-6 h-6 bg-richblack-5  rounded-md rotate-45 
                                    -top-2  right-10 z-0'></div>
                                    {
                                      loading ?(<Loading/>) : (
                                        subLinks.length ? 
                                          (
                                          subLinks?.
                                          filter(
                                            (subLinks)=>subLinks?.course?.length > 0
                                          )?.
                                          map((item,index) => (
                                            <Link  
                                            to={`/catalog/${item.categoryName?.
                                            split(" ").
                                            join("-").
                                            toLowerCase()}`}  
                                            key={index}  className=' uppercase hover:bg-richblack-50 rounded-md w-[95%] flex 
                                            justify-center items-center'>
                                              {item.categoryName}
                                            </Link>
                                          ))
                                          ) : 
                                          (  <p className="text-center text-black">No Courses Found</p>)
                                      )
                                    }
                                   

                                </div>

                          </div>
                        ): 
                        ( 
                          <Link  to={navItem?.path}>
                          <p  className={`${matchRoute(navItem?.path) ? (" text-yellow-5") : ("text-richblack-25")}`}>
                            {navItem.title}
                          </p>
                        </Link>
                        )
                     }
                  </li>
                ))
              }
          </ul>
        {/* login and dashboard */}
        <div  className='flex flex-row gap-4 items-center'>
          {
            user && user.accoutType !== "Instructor" && (
              <div className='relative  flex flex-row gap-1  items-center'>
                <FaShoppingCart />
                <div>{cart.totalItems}</div>
              </div>
            )
          }
          {
            token  === null && (
              <Link  to={"/login"}>
                <button className='px-3 py-1 bg-richblack-800 text-richblack-400 border border-richblack-700 
                 hover:scale-95 rounded-md text-center  transition-all duration-200'>
                  Login
                </button>
              </Link>
            )
          }
          {
            token  === null && (
              <Link  to={"/signup"}>
                <button className='px-3 py-1 bg-richblack-800 text-richblack-400 border border-richblack-700
                hover:scale-95  rounded-md text-center  transition-all duration-200'>
                  Sign up
                </button>
              </Link>
            )
          }
          {
            token  !== null && (
              <div className=''>
                <ProfileDropDown/>
              </div>
            )
          }
          
        </div>
      </div>
    
    </div>
  )
}

export default Navbar