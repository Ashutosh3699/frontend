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

      <h2>Edit Profile</h2>

      <div>
          {/* section1 */}
          <UploadImage/>
      </div>

      <div>
          <h3>Profile Information</h3>

          <ProfileUpdateForm   /> 
      </div>

      <div>
        <h3>Password</h3>

        <ChangePassword/>
      </div>

      <div>
        {/* delete section */}

          <DeleteProfile/>
      </div>
    
    
    </div>
  )
}

export default Settings