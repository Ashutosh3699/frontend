import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
// import image from "../../../assets/Logo/Logo-Small-Light.png"
import { Link } from 'react-router-dom';
import useOutsideClick from '../../../custom-hook/useOutsideClick';

const ProfileDropDown = () => {

  // fetch the profile from profileSlice
  const  {user} = useSelector((state) => state.profile);

  const [attributeclass,setattributeClass] = useState("invisible opacity-0");

  const divref = useRef(null);
  const handleClickOutside = () => {
    // function to be added
    setattributeClass("invisible opacity-0");
  };
  useOutsideClick(divref, handleClickOutside);

  const clickHandler=()=>{
    if(attributeclass === "invisible opacity-0"){
      setattributeClass("visible opacity-100");
    }
    else{
      setattributeClass("invisible opacity-0");
    }
  }

  // console.log("attributeclass", attributeclass);

  return (

    <div className='w-10 h-10 rounded-full  relative border border-richblack-600 cursor-pointer '
    onClick={clickHandler}
    ref={divref}
    >
    {/* changes here */}
      <img  src={user.imageUrl} alt='profileimage' className='w-full h-full object-contain '   />

      <div  
      className={`${attributeclass} absolute -left-32 top-[160%] flex flex-col justify-center items-center rounded-md
                                   bg-richblack-5  p-4  text-richblack-800   duration-400  transition-all 
                                    lg:w-[200px]  z-10  gap-2`}>

            <div className='absolute w-6 h-6 bg-richblack-5  rounded-md rotate-45 
            -top-2  right-10 z-0'></div>

            <Link  to={"/dashboard"}>
              Dashboard
            </Link>

            <Link to={"/"}>
                <button className='px-3 py-1 bg-blue-100 text-richblack-600 border border-richblack-700 
                 hover:scale-95 rounded-md text-center  transition-all duration-200 w-full'>
                  Logout
                </button>
            </Link>

                                    

          </div>

    </div>
  )
}

export default ProfileDropDown