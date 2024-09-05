import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../services/operations/authApi';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

    const  [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {signupData} = useSelector((state)=>state.auth);

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
    <div className='w-full h-screen bg-richblack-900 text-richblack-5 flex flex-col'>

        <h1>Verify Email</h1>
        <p>A verification code sent to your email. Enter the code below:</p>

        <form  onSubmit={submitHandler}>

            {/* otp - input */}
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} className='p-4 bg-richblack-700  font-bold text-xl' />}
             />

            {/* button */}
            <button type='submit'>
                Verify mail
            </button>
        </form>
    
    </div>
  )
}

export default VerifyEmail