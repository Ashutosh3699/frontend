import React, { useState } from 'react';
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { FaStarOfLife } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {ACCOUNT_TYPE}  from "../../../utils/constant";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setsignupData} from "../../../features/authSlice";
import {sendOTP} from "../../../services/operations/authApi"


const SignupForm = () => {

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPass, setShowPass] = useState(false);
    const [signupData, setSignupData] = useState({
        firstName:"",
        lastName: "",
        email:"",
        password:"",
        confirmPassword:""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler= (event)=>{
      setSignupData((prev)=>({
            ...prev,
            [event.target.name]: event.target.value
        }))
        // console.log(signupData);
    }

    const submitHandler= (event)=>{
        event.preventDefault();

        if(signupData.confirmPassword !== signupData.password){
            toast.error("Passwords Do Not Match")
            return
        }
        
        const signupdata = {
             ...signupData,
              accountType
          }
        

        // console.log("signupdata is : ", signupData);

        dispatch(setsignupData(signupdata));
        
        // send otp 
        dispatch(sendOTP(signupData.email, navigate));
        // Reset
        setSignupData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    // console.log(signupData);

  return (
    <div  className='mt-6' >

      <div  className=' text-richblack-50  text-lg shadow-pure-greys-100  bg-richblack-700 shadow-inner p-1 flex  w-[50%]  
      justify-around  rounded-full'>

          <button
          className= {`py-1  px-4  rounded-full   ${accountType === ACCOUNT_TYPE.STUDENT ? (" bg-richblack-800  text-richblack-5 ") : ("")}`}
          onClick={()=>setAccountType(ACCOUNT_TYPE.STUDENT)}
          >
              {ACCOUNT_TYPE.STUDENT}
          </button>
          
          <button
          className={`py-1  px-4  rounded-full   ${accountType === ACCOUNT_TYPE.INSTRUCTOR ? (" bg-richblack-800  text-richblack-5 ") : ("")}`}
          onClick={()=>setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
          >
              {ACCOUNT_TYPE.INSTRUCTOR}
          </button>

      </div>

      <form
      className='flex flex-col gap-4'
      onSubmit={submitHandler}
      >

        <div  className='flex flex-row gap-3 '>

          <div  className='flex flex-col gap-1 items-start  my-4'>
                <label  htmlFor='firstName'  className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>
                firstName  <FaStarOfLife size={6} color='red' />
                </label>
                <input
                    type='text'
                    placeholder='Enter firstName'
                    name='firstName'
                    id='firstName'
                    required={true}
                    value={signupData.firstName}
                    onChange={changeHandler}
                    className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border 
                      border-richblack-400 shadow-inner  shadow-richblack-300'
                />
            </div>

            <div  className='flex flex-col gap-1 items-start  my-4'>
              <label  htmlFor='lastName'  className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>
              lastName <FaStarOfLife size={6} color='red' />
              </label>
              <input
                  type='text'
                  placeholder='Enter lastName'
                  name='lastName'
                  id='lastName'
                  required={true}
                  value={signupData.lastName}
                  onChange={changeHandler}
                  className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border 
                    border-richblack-400 shadow-inner  shadow-richblack-300'
              />
          </div>

        </div>


          <div  className='flex flex-col gap-1 items-start  my-4'>
              <label  htmlFor='email'  className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>
                  Email Address <FaStarOfLife size={6} color='red' />
              </label>
              <input
                  type='email'
                  placeholder='Enter Email Address'
                  name='email'
                  id='email'
                  required={true}
                  value={signupData.email}
                  onChange={changeHandler}
                  className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border 
                    border-richblack-400 shadow-inner  shadow-richblack-300'
              />
          </div>

          <div  className='flex flex-row gap-3'>

            <div className='flex flex-col gap-1 items-start '>
                <label  htmlFor='password'  className='text-md text-richblack-5 font-semibold  pl-4 flex gap-1  items-start'>
                    Password <FaStarOfLife size={6} color='red' />
                </label>

                <div  className='flex flex-row w-full relative '>
                    <input
                        type={showPass? ('text') : ('password')}
                        placeholder='Enter Password'
                        name='password'
                        id='password'
                        required={true}
                        value={signupData.password}
                        onChange={changeHandler}
                        className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border  border-richblack-400 shadow-inner  shadow-richblack-300'
                    />

                    {
                        showPass? (  <IoEyeOff className='text-white  absolute cursor-pointer  right-3 text-3xl  top-[25%]' onClick={()=>setShowPass(false)} />): 
                        (<IoEye className='text-white  absolute  cursor-pointer right-3 text-3xl  top-[25%]'  onClick={()=>setShowPass(true)} />)
                    }
                  
                </div>

            </div>

            <div className='flex flex-col gap-1 items-start '>
                <label  htmlFor='confirmPassword'  className='text-md text-richblack-5 font-semibold  pl-4 flex gap-1  items-start'>
                ConfirmPassword <FaStarOfLife size={6} color='red' />
                </label>

                <div  className='flex flex-row w-full relative '>
                    <input
                        type={showPass? ('text') : ('password')}
                        placeholder='Enter Password'
                        name='confirmPassword'
                        id='confirmPassword'
                        required={true}
                        value={signupData.confirmPassword}
                        onChange={changeHandler}
                        className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border  border-richblack-400 shadow-inner  shadow-richblack-300'
                    />

                    {
                        showPass? (  <IoEyeOff className='text-white  absolute cursor-pointer  right-3 text-3xl  top-[25%]' onClick={()=>setShowPass(false)} />): 
                        (<IoEye className='text-white  absolute  cursor-pointer right-3 text-3xl  top-[25%]'  onClick={()=>setShowPass(true)} />)
                    }
                  
                </div>

            </div>


          </div>
          
          
        
          <button className={`px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300  mt-4
              drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)] bg-[#FFD60A]  text-black`}>
              Submit
          </button>

      </form>

  </div>
  )
}

export default SignupForm