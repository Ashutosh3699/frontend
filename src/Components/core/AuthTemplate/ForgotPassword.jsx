import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getResetToken } from '../../../services/operations/authApi';

const ForgotPassword = () => {

    const {loading} = useSelector((state)=>state.auth);

    const [resetToken, setResetToken] = useState(false);
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();

    const submitHandler= (e)=>{

        e.preventDefault();
        dispatch(getResetToken(email,setResetToken))
    }


  return (

    <div className='w-full h-screen  bg-richblack-900 text-richblack-5  flex flex-col  justify-center items-center gap-y-3'>
        {
            loading ?
            (<div>loading</div>) : 
            ( <div className='flex flex-col gap-3 items-center lg:w-[50%]  w-[95%]'>
                {
                    !resetToken ? (
                        <div className='text-4xl font-semibold text-blue-100 '>Reset Your Password</div>
                    ) : (
                        <div className='text-4xl font-semibold text-blue-100 '>
                            Check Your Email
                        </div>
                    )
                }
                {
                    !resetToken ? (
                        <div className='text-lg font-medium text-richblack-200 text-center font-edu-sa  my-2'>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
                    ) : (
                        <div className='text-lg font-medium text-richblack-200 text-center font-edu-sa  my-2'>We have sent the reset email to {`${email}`}</div>
                    )
                }
        
                <form
                onSubmit={submitHandler}
                className='flex flex-col gap-10 items-center'
                >
                    {
                        !resetToken && <label className='w-full text-xl font-inter text-richblack-50  flex flex-col items-start gap-2'>
                            <p className='font-edu-sa'>Email Address <span><sup className=' text-blue-200'>*</sup></span></p>
        
                            <input
                                required
                                type='email'
                                placeholder='Enter Email Address'
                                name='email'
                                id='email'
                               className='p-2  text-richblack-50 bg-richblack-800  text-md 
                                rounded-lg border border-richblack-400  shadow-richblack-400 shadow-inner '
                                onChange={(e)=>setEmail( e.target.value )}
                                value={email}
                            />
                        </label>
                    }
                    <button className={`px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300 
                        drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)] bg-[#FFD60A]  text-black`}>
                        {
                            !resetToken ? ("Reset Password") : ("Resend Email")
                        }
                    </button>
                
                </form>
        
                <div className='text-sm font-light text-blue-100 '>
                        <Link to={"/login"}>
                            back to login
                        </Link>
                </div>
        
            </div>)
        }
    </div>
   
  )
}

export default ForgotPassword