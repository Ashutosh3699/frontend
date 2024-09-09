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
    <div>

          <div className='w-10 h-10 rounded-full overflow-hidden'>
                 <img src={user?.image}  alt={`profile-${user?.image}`} className='w-full' />
             </div>

            <form  onSubmit={submitHandler}>
                    <label >Select image
                    <input 
                    type="file"
                    id="myfile"
                    name="myfile"
                    onChange={(e)=>setImage(e.target.files[0])}
                    />
                    </label>

                    <button type='submit'>
                        upload
                    </button>
            </form>

          </div>
  )
}

export default UploadImage