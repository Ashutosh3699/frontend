import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import Loading from '../../common/loader/Loading';

const VerifyEmail = () => {

    const  [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {signupData, loading} = useSelector((state)=>state.auth);

    useEffect(()=>{

        if(signupData===null){
            navigate("/signup");
        }
    },[])
    console.log("signup data is: ", signupData);

    const submitHandler=(e)=>{

        e.preventDefault();

        const {firstName,lastName,accountType,email,password,confirmPassword} = signupData;
        dispatch(signup(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));

    }

  return (
    <div className='w-full h-screen bg-richblack-900 text-richblack-5 flex flex-col items-center justify-center gap-6'>

       {
        loading ? (<Loading/>) : (
            <div>
                <h1 className='text-3xl  text-blue-100  font-bold'>Verify Email</h1>
                <p className='text-richblack-50  font-edu-sa text-md'>A verification code sent to your email. Enter the code below:</p>

                <form  onSubmit={submitHandler} className='text-richblack-50'>

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input
                        {...props} 
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2
                        focus:outline-yellow-50"/>}
                    />

                    {/* button */}
                    <button 
                    type="submit"
                    className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                        Verify mail
                    </button>
                </form>
            </div>
        )
       }
    
    </div>
  )
}

export default VerifyEmail