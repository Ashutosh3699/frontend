import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../Components/common/IconBtn';

const MyProfile = () => {

  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();

  return (
    <div>

        <h1>My Profile</h1>

        <div>
            <div>
                <img src={user?.image}  alt={`profile-${user?.image}`} />

                <div>
                    <p>{user?.firstName + "  "  + user?.lastName} </p>
                    <p> {user?.email}</p>

                </div>
                <IconBtn
                  text={"Edit"}
                  onclick={()=>{
                    navigate("/dashboard/settings")
                  }}

                />

            </div>

        </div>
    
    
    </div>
  )
}

export default MyProfile