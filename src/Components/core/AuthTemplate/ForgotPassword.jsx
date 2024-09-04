import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
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
            ( <div>
                {
                    !resetToken ? (
                        <div>Reset Your Password</div>
                    ) : (
                        <div>
                            Check Your Email
                        </div>
                    )
                }
                {
                    !resetToken ? (
                        <div>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
                    ) : (
                        <div>We have sent the reset email to {`${email}`}</div>
                    )
                }
        
                <form
                onSubmit={submitHandler}
                >
                    {
                        !resetToken && <label>
                            <p>Email Address <span><sup>*</sup></span></p>
        
                            <input
                                required
                                type='email'
                                placeholder='Enter Email Address'
                                name='email'
                                id='email'
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
        
                <div>
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