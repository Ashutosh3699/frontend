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
    
    <label className='w-full'>
      <div>
          {label}<sup>*</sup>
      </div>
      <input
          id={name}
          type='text'
          name={name}
          placeholder={`Enter ${label}`}
          className='lg:w-[70%]'
          value={requirement}
          onChange={(e)=>(setRequirement(e.target.value))}
      />
      <button 
      type='button'
      onClick={()=>handleAddrequirement()}>
        Add
      </button>
     
      {
        requirementList.map((element,index)=>(
          <div key={index}>
            <span>{element}</span>
            <button 
              type='button'
              onClick={()=>handleRemoverequirement(index)}>
              clear
            </button>
          </div>
        ))
      }
      {errors[name] && <p>{label} is required.</p>}
      
</label>
    
  )
}

export default CourseRequirements
