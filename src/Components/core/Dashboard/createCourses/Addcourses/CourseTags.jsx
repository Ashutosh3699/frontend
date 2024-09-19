import React, { useEffect, useState } from 'react'
import IconBtn from '../../../../common/IconBtn';

const CourseTags = ({label, name, register, setValue,errors }) => {

    const [tags,setTags] = useState("");
    const [tagList, setTagList] = useState([]);

    useEffect(()=>{
        register(name,{
            required:true,
            validate: (value)=>value.length>0
        })
    },[]);

    useEffect(()=>{
        setValue(name,tagList)
    },[tagList])

    const handleRemovetag=(index)=>{

        const updateTaglist = [...tagList];
        updateTaglist.splice(index,1);
        setTagList(updateTaglist);
    }

    const handleAddtag= ()=>{

        if(tags){
            setTagList([...tagList, tags]);
            setTags("");
        }
    }


  return (
    <div className='flex flex-col gap-2 items-start'>

        <label htmlFor={name}>
           {label}
        </label>
        {
            tagList.map((item,index)=>(
                <div key={index} className='lg:w-[70%] bg-richblack-800 border text-white border-richblack-700 rounded-lg py-1 px-2 text-lg  font-medium'>
                   <span> {item}  </span> 
                   <button
                   onClick={()=>handleRemovetag(index)}
                   >X</button>
                </div>
            ))
        }
        {
            errors[name] && <p>{label} is required</p>
        }
        <input
            type='text'
            id={name}
            name={name}
            value={tags}
            placeholder={`Enter ${label}`}
            className='lg:w-[70%] bg-richblack-800 border border-richblack-700 rounded-lg py-1 px-2 text-lg  font-medium'
            onChange={(e)=>(setTags(e.target.value))}
        />
      <IconBtn
      text={"add tag"}
      type={"submit"}
      onclick={()=>handleAddtag()}
      />
    
    </div>
  )
}

export default CourseTags