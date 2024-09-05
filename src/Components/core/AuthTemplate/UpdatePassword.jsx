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
    <div className=''>
    
        <h3>Choose Your New Password </h3>
        <p>Almost done. Enter your new password and youre all set. </p>

        <form  onSubmit={submitHandler}>
            <label>
                <h4> New Password<span><sup>*</sup></span> </h4>
                <input
                    id='password'
                    name='password'
                    type={showPass ? "text" : "password"}
                    value={formData.password}
                    required
                    onChange={changeHandler}
                />
                <span  onClick={()=>setShowPass((prev)=>(!prev))}>
                    {
                        showPass ? (<IoEyeOffSharp />) : (<IoEyeSharp />)
                    }
                </span>
            </label>

            <label>
                <h4> Confirm Password<span><sup>*</sup></span> </h4>
                <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPass ? "text" : "password"}
                    value={formData.confirmPassword}
                    required
                    onChange={changeHandler}
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