import React from 'react'
import { useSelector } from 'react-redux'
import UploadImage from '../Components/core/settings/UploadImage';

const Settings = () => {

  const {user} = useSelector((state)=>state.profile);


  return (
    <div className='w-full bg-richblack-900  text-richblack-25' >

      <h2>Edit Profile</h2>

      <div>

          {/* section1 */}
          <UploadImage/>
      </div>
    
    
    </div>
  )
}

export default Settings