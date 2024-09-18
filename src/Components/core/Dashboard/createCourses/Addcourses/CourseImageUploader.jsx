import React, { useEffect, useState } from 'react'

const CourseImageUploader = ({label,name,setValue,register,errors}) => {

    const [image,setImage] = useState("");
    useEffect(()=>{
        register(name,{
            required:true
        })
    },[])


  const handleImageChange= (event) => {
    const file = event.target.files[0];
    // console.log("file is: ", file);
    if (file) {
      const reader = new FileReader();
      reader.onload= (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file); 
    }
    setValue(name,file);
};

// console.log("image is:", image);
  return (

    <div>
        <label htmlFor={name}> {label} </label>

        <input
            type='file'
            id={name}
            name={name}
             className="flex items-center justify-center px-4 py-2 rounded-md transition-all duration-300 
                    bg-yellow-50 text-black font-bold hover:bg-yellow-100 cursor-pointer"
            onChange={handleImageChange}
        />
        {
            image && <div className='w-20 h-20 rounded-full overflow-hidden'>
                 <img src={image}  alt={`profile-${image}`} className='w-full' />
         </div>
        }
         {
            errors[name] && <p>{label} is required</p>
         }
    </div>
  )
}

export default CourseImageUploader