import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {DeleteAccount} from "../../../services/operations/profileApi"

const DeleteProfile = () => {
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const deleteHandler=()=>{

        dispatch(DeleteAccount(token))
    }
    
  return (
    <div className=' flex flex-col  w-[80%] justify-between  pr-4  pl-8 items-start  py-8  bg-richblack-800 rounded-lg border border-richblack-700'>
        <h3 className='text-xl font-semibold text-richblack-50'>Delete Account</h3>

        <button onClick={deleteHandler}
        className={`px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300  mt-4
          drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)] bg-[#FFD60A]  text-black`}
        >Delete</button>
    </div>
  )
}

export default DeleteProfile