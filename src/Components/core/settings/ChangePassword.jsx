import React, {useState} from 'react';
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {changePassword} from "../../../services/operations/profileApi"

const ChangePassword = () => {

    const [showPass, setShowPass] = useState(false);

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
     } = useForm();

     const submitForm=(data)=>{

        console.log("data is : ", data);
        data.email = user.email;
        dispatch(changePassword(data,token));
     }


  return (
        <form onSubmit={handleSubmit(submitForm)}
        className='flex flex-col gap-4 items-start justify-between w-11/12 mx-auto'
        >

            {/* current password */}
            <div className='flex flex-col gap-2 items-start '>
                    <label  htmlFor='oldPassword'  className='text-md text-richblack-5 font-semibold  pl-4 flex gap-1  items-start'>
                        Current Password 
                    </label>

                    <div  className='flex flex-row w-full relative '>
                        <input
                            type={showPass? ('text') : ('password')}
                            placeholder='Enter current Password'
                            name='oldPassword'
                            id='oldPassword'
                            {...register("oldPassword",{required:true})}
                            className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border  border-richblack-400 shadow-inner  shadow-richblack-300'
                        />
                        {
                            errors.oldPassword && <p>password is required.</p>
                        }

                        {
                            showPass? (  <IoEyeOff className='text-white  absolute cursor-pointer  right-3 text-3xl  top-[25%]' onClick={()=>setShowPass(false)} />): 
                            (<IoEye className='text-white  absolute  cursor-pointer right-3 text-3xl  top-[25%]'  onClick={()=>setShowPass(true)} />)
                        }
                    
                    </div>

                </div>

            <div  className='flex flex-row gap-6'>

                <div className='flex flex-col gap-2 items-start '>
                    <label  htmlFor='newPassword'  className='text-md text-richblack-5 font-semibold  pl-4 flex gap-1  items-start'>
                      New Password 
                    </label>

                    <div  className='flex flex-row w-full relative '>
                        <input
                            type={showPass? ('text') : ('password')}
                            placeholder='Enter newPassword'
                            name='newPassword'
                            id='newPassword'
                            {...register("newPassword",{required:true})}
                            className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border  border-richblack-400 shadow-inner  shadow-richblack-300'
                        />
                        {
                            errors.newPassword && <p>password is required.</p>
                        }

                        {
                            showPass? (  <IoEyeOff className='text-white  absolute cursor-pointer  right-3 text-3xl  top-[25%]' onClick={()=>setShowPass(false)} />): 
                            (<IoEye className='text-white  absolute  cursor-pointer right-3 text-3xl  top-[25%]'  onClick={()=>setShowPass(true)} />)
                        }
                    
                    </div>

                </div>

                <div className='flex flex-col gap-2 items-start '>
                    <label  htmlFor='confirmPassword'  className='text-md text-richblack-5 font-semibold  pl-4 flex gap-1  items-start'>
                    ConfirmPassword 
                    </label>

                    <div  className='flex flex-row w-full relative '>
                        <input
                            type={showPass? ('text') : ('password')}
                            placeholder='Enter confirmPassword'
                            name='confirmPassword'
                            id='confirmPassword'
                            {...register("confirmPassword",{required:true})}
                            className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border  border-richblack-400 shadow-inner  shadow-richblack-300'
                        />
                        {
                            errors.confirmPassword && <p>password is required.</p>
                        }


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
  )
}

export default ChangePassword