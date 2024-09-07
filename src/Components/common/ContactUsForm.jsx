import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {contact_us} from "../../services/apis";
import {apiConnector} from "../../services/apiConnector";
import CountryCode from "../../data/countrycode.json";
import Loading from "../common/loader/Loading"

const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
     } = useForm();

     const submitContactForm = async(data)=>{

        // console.log("logging data : ", data);
        try{
            setLoading(true);
            const response = await apiConnector("POST", contact_us.CONTACT_US_API, data);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
     }

     useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                contactNumber:"",
            })
        }
    },[reset, isSubmitSuccessful] );

    

  return (
    <div>
        {
            loading ? (<Loading/>) : (
                <form onSubmit={handleSubmit(submitContactForm)}>
                    <div className='flex flex-col gap-4 items-start justify-between '>

                        <div className='flex flex-row gap-3 items-center'>
                            <label className='flex flex-col gap-2'>
                                <h3>FirstName <span><sup className=' text-blue-200'>*</sup></span> : </h3>
                                <input
                                name='firstName'
                                id='firstName'
                                type='text'
                                placeholder='Enter First Name'
                                className='p-2  text-richblack-50 bg-richblack-800  text-md font-edu-sa
                                rounded-xl border border-richblack-400  shadow-richblack-400 shadow-inner '
                                {...register('firstName', { required: true })}
                                />
                                {errors.firstName && <p>First name is required.</p>}
                            </label>

                            <label className='flex flex-col gap-2'>
                                <h3>LastName <span><sup className=' text-blue-200'>*</sup></span> : </h3>
                                <input
                                name='lastName'
                                id='lastName'
                                type='text'
                                placeholder='Enter last Name'
                            className='p-2  text-richblack-50 bg-richblack-800  text-md font-edu-sa
                                rounded-xl border border-richblack-400  shadow-richblack-400 shadow-inner '
                                {...register('lastName', { required: true })}
                                />
                                {errors.lastName && <p>Last name is required.</p>}
                            </label>
                        </div>

                        <div className='flex flex-col gap-2'>

                            <label htmlFor='contactNumber'>Phone Number</label>

                            <div className='flex flex-row gap-3'>
                                {/* dropdown */}
                            
                                    <select
                                        name='dropdown'
                                        id="dropdown"
                                        className='p-2  text-richblack-50 bg-richblack-800  text-md font-edu-sa
                                rounded-xl border border-richblack-400  shadow-richblack-400 shadow-inner w-[75px] '
                                        {...register("countrycode", {required:true})}
                                    >
                                        {
                                            CountryCode.map( (element , index) => {
                                                return (
                                                    <option key={index} value={element.code}>
                                                        {element.code} -{element.country}
                                                    </option>
                                                )
                                            } )
                                        }
                                    </select>
                                    
                                    <input
                                        type='number'
                                        name='contactNumber'
                                        id='contactNumber'
                                        placeholder='12345 67890'
                                        className='p-2  text-richblack-50 bg-richblack-800  text-md font-edu-sa
                                rounded-xl border border-richblack-400  shadow-richblack-400 shadow-inner  '
                                        {...register("contactNumber",  
                                        {
                                            required:{value:true, message:"Please enter Phone Number"},
                                            maxLength: {value:10, message:"Invalid Phone Number"},
                                            minLength:{value:8, message:"Invalid Phone Number"} })}
                                    />
                            
                            </div>
                            {
                                errors.phoneNo && (
                                    <span>
                                        {errors.phoneNo.message}
                                    </span>
                                )
                            }

                        </div>

                        <label className='flex flex-col gap-2'>
                            <h3>Email <span><sup className=' text-blue-200'>*</sup></span> : </h3>
                            <input
                            name='email'
                            id='email'
                            type='email'
                            placeholder='Enter Email Address'
                            className='p-2  text-richblack-50 bg-richblack-800  text-md font-edu-sa
                                rounded-xl border border-richblack-400  shadow-richblack-400 shadow-inner  '
                            {...register('email', { required: true })}
                            />
                            {errors.email && <p>email is required.</p>}
                        </label>

                        <label className='flex flex-col gap-2'>
                                <h3>Message <span><sup className=' text-blue-200'>*</sup></span> : </h3>
                                <textarea
                                name='message'
                                cols={50}
                                rows={7}
                                id='message'
                                type='text'
                                placeholder='Enter message'
                                className='p-4  text-richblack-50 bg-richblack-800  text-lg font-edu-sa
                                rounded-xl border border-richblack-400  shadow-richblack-400 shadow-inner '
                                {...register('message', { required: true })}
                                />
                                {errors.message && <p>message is required.</p>}
                            </label>


                        <button className='px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300 
                            drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)]   bg-[#FFD60A]  text-black mt-4'>
                            Send message
                        </button>
                    </div>

                    </form>
            )
        }
    </div>
  )
}

export default ContactUsForm