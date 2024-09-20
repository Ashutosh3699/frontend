import React, { useEffect, useState } from 'react'

function CourseRequirements({label, name, errors, register, setValue}) {

  const [requirement,setRequirement] = useState("");
  const [requirementList,setRequirementList] = useState([]);

  useEffect(()=>{
    register(name,{
      required:true,
      validate: (value)=>value.length>0
    })
  },[])

  useEffect(()=>{

    setValue(name,requirementList);
  },[requirementList])

  const handleAddrequirement = ()=>{
    if(requirement){
      setRequirementList([...requirementList,requirement]);
      setRequirement("");
    }
  }

  const handleRemoverequirement = (index)=>{
      const updateRequirement = [...requirementList];
      updateRequirement.splice(index,1);
      setRequirementList(updateRequirement);
  }


  return (
    
    <label className="flex flex-col space-y-2 items-start ">
      <div className='text-md text-richblack-25 font-semibold'>
          {label}<sup  className="text-pink-200">*</sup>
      </div>
      <input
          id={name}
          type='text'
          name={name}
          placeholder={`Enter ${label}`}
           className='lg:w-[70%] bg-richblack-800 text-richblack-25 border border-richblack-700 rounded-lg py-1 px-2 text-lg  font-medium'
          value={requirement}
          onChange={(e)=>(setRequirement(e.target.value))}
      />
      <button 
      type='button'
      className="font-semibold text-yellow-50"
      onClick={()=>handleAddrequirement()}>
        Add
      </button>
     
      {
        requirementList.map((element,index)=>(
          <div key={index} className="flex items-center text-richblack-5">
            <span>{element}</span>
            <button 
             className="ml-2 text-xs text-pure-greys-300 "
              type='button'
              onClick={()=>handleRemoverequirement(index)}>
              clear
            </button>
          </div>
        ))
      }
      {errors[name] && <p  className="ml-2 text-xs tracking-wide text-pink-200">{label} is required.</p>}
      
</label>
    
  )
}

export default CourseRequirements
