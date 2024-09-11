import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateProfilePic} from "../../../services/operations/profileApi"

const UploadImage = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const [image,setImage] = useState("");
    const dispatch = useDispatch();

    const submitHandler= (e)=>{

        e.preventDefault();
        dispatch(updateProfilePic(image,token));
    }

  return (
    <div className='flex flex-row  w-[80%] gap-12  pr-4  pl-8 items-center  py-8  bg-richblack-800 rounded-lg border border-richblack-700 '>

          <div className='w-20 h-20 rounded-full overflow-hidden'>
                 <img src={user?.image}  alt={`profile-${user?.image}`} className='w-full' />
             </div>

            <form  onSubmit={submitHandler} className='flex flex-col gap-3 items-start'>
                <h3 className='text-xl font-semibold text-richblack-50'>Change Profile Picture</h3>
                   <div className='flex gap-4 items-center '>
                   <label for="myfile" class="flex items-center justify-center px-4 py-2 rounded-md transition-all duration-300 
                    bg-yellow-50 text-black font-bold hover:bg-yellow-100 cursor-pointer">
                      Change
                      <input 
                        type="file" 
                        id="myfile" 
                        name="myfile" 
                        class="hidden" 
                        onChange={(e) => setImage(e.target.files[0])} 

                        />
                    </label>

                        <button type='submit' 
                        className='px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300 
                drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)] bg-richblack-600  text-white'
                        >
                            upload
                        </button>
                   </div>
            </form>

          </div>
  )
}

export default UploadImage