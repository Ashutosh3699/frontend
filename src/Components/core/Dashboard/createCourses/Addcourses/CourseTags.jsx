import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

const CourseTags = ({label, name, register, setValue,errors,placeholder }) => {

    const [chips,setChips] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(()=>{

        if (editCourse) {
            // console.log(course)
            setChips(course?.tag)
          }

        register(name,{
            required:true,
            validate: (value)=>value.length>0
        })
    },[]);

    useEffect(()=>{
        setValue(name,chips)
    },[chips])

   // Function to handle user input when chips are added
   const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  // console.log("chip is: ", chips);

  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className='text-md text-richblack-25 font-semibold' htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the chips and input */}
      <div className="flex flex-col w-full flex-wrap gap-y-2">
        {/* Map over the chips array and render each chip */}
        <div className='flex gap-x-2 flex-wrap items-center'>
            {chips?.map((chip, index) => (
              <div
                key={index}
                className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
              >
                {/* Render the chip value */}
                {chip}
                {/* Render the button to delete the chip */}
                <button
                  type="button"
                  className="ml-2 focus:outline-none"
                  onClick={() => handleDeleteChip(index)}
                >
                  <MdClose className="text-sm" />
                </button>
              </div>
            ))}
        </div>
        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className='lg:w-[70%] bg-richblack-800 border text-richblack-25 border-richblack-700 rounded-lg py-1 px-4 text-lg  font-medium'
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default CourseTags