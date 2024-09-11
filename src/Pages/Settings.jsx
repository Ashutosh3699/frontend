import React from 'react'
import { useSelector } from 'react-redux'
import UploadImage from '../Components/core/settings/UploadImage';
import Loading from "../Components/common/loader/Loading";
import ProfileUpdateForm from '../Components/core/settings/ProfileUpdateForm';
import ChangePassword from '../Components/core/settings/ChangePassword';
import DeleteProfile from '../Components/core/settings/DeleteProfile';

const Settings = () => {

  const {loading:profileLoading} = useSelector((state)=>state.profile);
  const {loading:authLoading} = useSelector((state)=>state.auth);

  if(profileLoading || authLoading){

    return <Loading/>
  }


  return (
    <div className='w-full bg-richblack-900  text-richblack-25 h-full' >

      <h2 className='text-2xl font-bold text-richblack-5 mb-6'>Edit Profile</h2>

      <div className='flex flex-col gap-8 items-start w-11/12 mx-auto'>
              {/* section1 */}
              <UploadImage/>
          <div className=' flex flex-col  w-[80%] justify-between  pr-4  pl-8 items-start  py-8  bg-richblack-800 rounded-lg border border-richblack-700'>
              <h3 className='text-xl font-semibold text-richblack-50'>Profile Information</h3>
              <ProfileUpdateForm   /> 
          </div>
          <div className='flex flex-col  w-[80%] justify-between gap-6  pr-4  pl-8 items-start  py-8  bg-richblack-800 rounded-lg border border-richblack-700'>
            <h3 className='text-xl font-semibold text-richblack-50'>Password</h3>
            <ChangePassword/>
          </div>
            {/* delete section */}
            <DeleteProfile/>
      </div>
    
    
    </div>
  )
}

export default Settings