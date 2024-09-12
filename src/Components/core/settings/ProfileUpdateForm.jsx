import React from 'react';
import CountryCode from "../../../data/countrycode.json";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {updateProfile} from "../../../services/operations/profileApi"


const ProfileUpdateForm = () => {

    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
     } = useForm();

     const submitForm=(data)=>{

        console.log("data is : ", data);
        data.phoneNumber = `${data.contactNumber}`
        dispatch(updateProfile(data,token));
     }
    

  return (
    <form  onSubmit={handleSubmit(submitForm)}
        className='flex flex-col gap-4  lg:w-10/12 mx-auto mt-6'
    >

        <div className='flex flex-row justify-between items-center'>
            {/* firstName */}
            <div  className='flex flex-col gap-1 items-start  my-4'>
                <label  htmlFor='firstName'  className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>
                firstName 
                </label>
                <input
                    type='text'
                    placeholder='Enter firstName'
                    name='firstName'
                    id='firstName'
                    {...register('firstName')}
                    className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border 
                      border-richblack-400 shadow-inner  shadow-richblack-300'
                />
            </div>
            {/* lastName */}
            <div  className='flex flex-col gap-1 items-start  my-4'>
              <label  htmlFor='lastName'  className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>
              lastName 
              </label>
              <input
                  type='text'
                  placeholder='Enter lastName'
                  name='lastName'
                  id='lastName'
                  {...register('lastName')}
                  className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border 
                    border-richblack-400 shadow-inner  shadow-richblack-300'
              />
          </div>

        </div>

        {/* section2 */}
        <div className='flex flex-row justify-between items-center'>
            {/* date of birth */}
            <div  className='flex flex-col gap-1 items-start  my-4'>
                <label  htmlFor='DOB'  className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>
                dateOfBirth 
                </label>
                <input
                    type='date'
                    placeholder='Enter dateOfBirth'
                    name='DOB'
                    id='DOB'
                    {...register('DOB')}
                    className='w-full  px-5 py-3 font-semibold text-md text-richblack-25 bg-richblack-800  rounded-md border 
                    border-richblack-400 shadow-inner  shadow-richblack-300'
                />
            </div>
            {/* phone Number */}
            <div className='flex flex-col gap-2'>

                            <label htmlFor='contactNumber'>Phone Number</label>

                            <div className='flex flex-row gap-3'>
                                {/* dropdown */}
                            
                                    <select
                                        name='dropdown'
                                        id="dropdown"
                                        className='p-2  text-richblack-50 bg-richblack-800  text-md font-edu-sa
                                rounded-xl border border-richblack-400  shadow-richblack-400 shadow-inner w-[75px] '
                                        {...register("countrycode")}
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
                                        {   maxLength: {value:10, message:"Invalid Phone Number"},
                                            minLength:{value:8, message:"Invalid Phone Number"} })}
                                    />
                            
                            </div>

             </div>

        </div>

        {/* section 3 */}
       
            {/* gender */}
        <div className='flex flex-col justify-between  items-start'>
            <legend className='text-md text-richblack-5 font-semibold pl-4 flex gap-1  items-start'>Gender</legend>
            <div>
                <label>Male
                    <input 
                        type="radio"
                        id="male" 
                        name="gender" 
                        value="Male" 
                        checked
                        {...register("gender")}
                        />
                </label>

                <label>Female
                    <input 
                        type="radio"
                        id="female" 
                        name="gender" 
                        value="Female" 
                        {...register("gender")}
                        />
                </label>

                <label>Others
                    <input 
                        type="radio"
                        id="others" 
                        name="gender" 
                        value="Others" 
                        {...register("gender")}
                        />
                </label>
            </div>
        </div>
       
            
        <button type='submit'
        className={`px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300  mt-4
            drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)] bg-[#FFD60A]  text-black`}>
            Submit
        </button>

    
    </form>
  )
}

export default ProfileUpdateForm