import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../Components/common/IconBtn';

const MyProfile = () => {

  const {user} = useSelector((state)=>state.profile);
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className='bg-richblack-900 text-richblack-25'>

        <h1>My Profile</h1>

        <div>

          {/* section 1 */}
            <div>
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                 <img src={user?.image}  alt={`profile-${user?.image}`} className='w-full' />
                </div>

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
                  {/* secction 2 */}
            <div>
               
               <div>

                       <h2>About</h2>

                      <p>{
                        user?.accountDetails?.aboutUser ? (user?.accountDetails?.aboutUser) : (<span>Write anything about yourself</span>)
                      }
                        </p>
               </div>

               <IconBtn
                  text={"Edit"}
                  onclick={()=>{
                    navigate("/dashboard/settings")
                  }}

                />

            </div>
                  {/* section3 */}
            <div>

                 <div>

                   <h2>Personal Details</h2>

                    <div>

                      <div>
                          <p>First Name:</p>
                          <p>{user?.firstName}</p>
                      </div>

                      <div>
                          <p>Last Name:</p>
                          <p>{user?.lastName}</p>
                      </div>
                      
                    </div>

                    <div>

                        <div>
                            <p>Email:</p>
                            <p>{user?.email}</p>
                        </div>

                        <div>
                            <p>Phone Number:</p>
                            <p>{user?.accountDetails?.phoneNumber ? (user.accountDetails.phoneNumber) : (<span>Enter Mobile Number</span>)}</p>
                        </div>

                    </div>

                    <div>

                        <div>
                            <p>Gender:</p>
                            <p>{user?.accountDetails?.gender  ? (user.accountDetails.gender) : (<span>Add gender</span>)}</p>
                        </div>

                        <div>
                            <p>Date of Birth:</p>
                            <p>{user?.accountDetails?.DOB  ? (user.accountDetails.DOB) : (<span>Enter date of birth</span>)}</p>
                        </div>

                    </div>
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