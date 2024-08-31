import React, { useState } from 'react';
import { IoEye, IoEyeOff  } from "react-icons/io5";


const SignupForm = () => {

  const [accountType, setAccountType] = useState("Student");
    const [showPass, setShowPass] = useState(false);
    const [signupData, setSignupData] = useState({
        firstName:"",
        lastName: "",
        email:"",
        password:"",
        confirmPassword:""
    });


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
          console.log("password is not correct");
        }
        else{
          setSignupData((prev)=>({
              ...prev,
              accountType
          }))
        }
        
    }

    // console.log(signupData);

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

        <div  className='flex flex-row gap-3 '>

          <div  className='flex flex-col gap-1 items-start  my-4'>
                <label  htmlFor='firstName'  className='text-md text-richblack-5 font-semibold pl-4'>
                firstName
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
              <label  htmlFor='lastName'  className='text-md text-richblack-5 font-semibold pl-4'>
              lastName
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
              <label  htmlFor='email'  className='text-md text-richblack-5 font-semibold pl-4'>
                  Email Address
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
                <label  htmlFor='password'  className='text-md text-richblack-5 font-semibold  pl-4'>
                    Password
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
                <label  htmlFor='confirmPassword'  className='text-md text-richblack-5 font-semibold  pl-4'>
                confirmPassword
                </label>

                <div  className='flex flex-row w-full relative '>
                    <input
                        type={showPass? ('text') : ('password')}
                        placeholder='Enter confirmPassword'
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