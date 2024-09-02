import React, { useState } from 'react';
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaStarOfLife } from "react-icons/fa";

const LoginForm = ({setIsLoggedIn}) => {

    const [accountType, setAccountType] = useState("Student");
    const [showPass, setShowPass] = useState(false);
    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    });


    const changeHandler= (event)=>{

        setLoginData((prev)=>({
            ...prev,
            [event.target.name]: event.target.value
        }))

        console.log(loginData);
    }

    const submitHandler= (event)=>{

        event.preventDefault();

        setLoginData((prev)=>({
            ...prev,
            accountType
        }))

        setIsLoggedIn((prev)=>({
            ...prev,
            loginData,
        }))
    }

  return (
    <div  className='mt-6' >

        <div  className=' text-richblack-50  text-lg shadow-pure-greys-100  bg-richblack-700 shadow-inner p-1 flex  w-[50%]  
        justify-around  rounded-full'>

            <button
            className= {`py-1  px-4  rounded-full   ${accountType === "Student" ? (" bg-richblack-800  text-richblack-5 ") : ("")}`}
            onClick={()=>setAccountType("Student")}
            >
                Student
            </button>
            
            <button
            className={`py-1  px-4  rounded-full   ${accountType === "Instructor" ? (" bg-richblack-800  text-richblack-5 ") : ("")}`}
            onClick={()=>setAccountType("Instructor")}
            >
                Instructor
            </button>

        </div>

        <form
        className='flex flex-col gap-4'
        onSubmit={submitHandler}
        >

            <div  className='flex flex-col gap-1 items-start  my-4'>
                <label  htmlFor='email'  className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>
                    Email Address  <FaStarOfLife size={6} color='red' />
                </label>
                <input
                    type='email'
                    placeholder='Enter Email Address'
                    name='email'
                    id='email'
                    required={true}
                    value={loginData.email}
                    onChange={changeHandler}
                     className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border 
                      border-richblack-400 shadow-inner  shadow-richblack-300'
                />
            </div>
            
            <div className='flex flex-col gap-1 items-start '>
                <label  htmlFor='password'  className='text-md text-richblack-5 font-semibold  pl-4 flex gap-1  items-start'>
                    Password  <FaStarOfLife size={6} color='red' />
                </label>

                <div  className='flex flex-row w-full relative '>
                    <input
                        type={showPass? ('text') : ('password')}
                        placeholder='Enter Password'
                        name='password'
                        id='password'
                        required={true}
                        value={loginData.password}
                        onChange={changeHandler}
                         className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border  border-richblack-400 shadow-inner  shadow-richblack-300'
                    />

                    {
                        showPass? (  <IoEyeOff className='text-white  absolute cursor-pointer  right-3 text-3xl  top-[25%]' onClick={()=>setShowPass(false)} />): 
                        (<IoEye className='text-white  absolute  cursor-pointer right-3 text-3xl  top-[25%]'  onClick={()=>setShowPass(true)} />)
                    }
                  
                </div>

                <Link  to={"forgotPass"}  className='text-xs text-blue-100 pl-3'>
                    forgot password
                </Link>
            </div>
           
            <button className={`px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300  mt-4
                drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)] bg-[#FFD60A]  text-black`}>
                Submit
            </button>

        </form>
    
    </div>
  )
}

export default LoginForm