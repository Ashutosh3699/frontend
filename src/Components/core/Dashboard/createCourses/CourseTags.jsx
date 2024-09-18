import React, { useEffect, useState } from 'react'
import IconBtn from '../../../common/IconBtn';

const CourseTags = ({label, name, register, setValue, getValues,errors }) => {

    const [tags,setTags] = useState("");
    const [tagList, setTagList] = useState([]);

    useEffect(()=>{
        register(name,{
            required:true,
            validate: (value)=>value.length>0
        })
    },[])

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
                <div key={index}>
                   <span> {item}  </span> 
                   <button
                   onClick={()=>handleRemovetag(index)}
                   >X</button>
                </div>
            ))
        }
        <input
            type='text'
            id={name}
            name={name}
            value={tags}
            placeholder={`Enter ${label}`}
            className='lg:w-[70%]'
            onChange={(e)=>(setTags(e.target.value))}
        />
      <IconBtn
      text={"add tag"}
      type={submit}
      onclick={()=>handleAddtag()}
      />
    
    </div>
  )
}

export default CourseTags