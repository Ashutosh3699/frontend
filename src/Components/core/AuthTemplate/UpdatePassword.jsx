import React, { useState } from 'react';
import { IoEyeSharp, IoEyeOffSharp  } from "react-icons/io5"
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {getResetPassword} from "../../../services/operations/authApi"

const UpdatePassword = () => {

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })

    const changeHandler=(e)=>{

        setFormData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    // find the token from the location
    const location = useLocation();
    const token = location.pathname.split("/").at(-1);
    // onsubmitfunc
    const  submitHandler=(e)=>{

        e.preventDefault();
        const {password,confirmPassword} = formData;

        dispatch(getResetPassword(password,confirmPassword,token,navigate));
    }

  return (
    <div className='w-full h-screen bg-richblack-900 flex flex-col items-center justify-center gap-6 text-richblack-25'>
    
        <h3 className='text-3xl text-blue-100 font-semibold'>Choose Your New Password </h3>
        <p className='text-md text-richblack-100  font-edu-sa'>Almost done. Enter your new password and youre all set. </p>

        <form  onSubmit={submitHandler} className='flex flex-col gap-3 items-start'>
            <label  className='w-full text-xl font-inter text-richblack-50  flex flex-col items-start gap-2'>
                <h4 className='font-edu-sa'> New Password<span><sup className=' text-blue-200'>*</sup></span> </h4>
                <input
                    id='password'
                    name='password'
                    placeholder='Enter Password'
                    type={showPass ? "text" : "password"}
                    value={formData.password}
                    required
                    onChange={changeHandler}
                     className='p-2  text-richblack-50 bg-richblack-800  text-md 
                        rounded-lg border border-richblack-400  shadow-richblack-400 shadow-inner '
                />
                <span  onClick={()=>setShowPass((prev)=>(!prev))}>
                    {
                        showPass ? (<IoEyeOffSharp />) : (<IoEyeSharp />)
                    }
                </span>
            </label>

            <label className='w-full text-xl font-inter text-richblack-50  flex flex-col items-start gap-2'>
                <h4 className='font-edu-sa'> Confirm Password<span><sup className=' text-blue-200'>*</sup></span> </h4>
                <input
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='Enter Password'
                    type={showConfirmPass ? "text" : "password"}
                    value={formData.confirmPassword}
                    required
                    onChange={changeHandler}
                     className='p-2  text-richblack-50 bg-richblack-800  text-md 
                                rounded-lg border border-richblack-400  shadow-richblack-400 shadow-inner '
                />
                <span  onClick={()=>setShowConfirmPass((prev)=>(!prev))}>
                    {
                        showConfirmPass ? (<IoEyeOffSharp />) : (<IoEyeSharp />)
                    }
                </span>
            </label>


            <button  type='submit'>
                Reset Password
            </button>
        </form>
    </div>
  )
}

export default UpdatePassword