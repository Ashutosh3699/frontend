import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from "react-icons/ti";


const stepData = [
{
    stepNo: 1,
    stepDesc: "Course Information"
},
{
    stepNo: 2,
    stepDesc: "Course Builder"
},
{
    stepNo: 3,
    stepDesc: "Publish"
}
]

const AddCourses = () => {

    const {step,course,editCourse} = useSelector((state)=>state.course);
    const dispatch = useDispatch();


  return (
    <div>

        <div>

            <div className='flex justify-between items-center'>
                    {
                        stepData.map((steps,index) =>{
                            return <div key={index} 
                          
                            >
                               <div
                                 className={`${steps.stepNo=== step ? " bg-yellow-800  border border-yellow-25  text-yellow-5" : 
                                    " bg-richblack-500 text-richblack-50 border border-richblack-700"} rounded-full p-7 flex items-center justify-center`} 
                                >
                                    {
                                            steps.stepNo < step ? (<TiTick />) : (<span>{steps.stepNo}</span>)
                                        }
                               </div>
                               <div>
                                        {
                                            steps.stepDesc
                                        }
                               </div>
                            </div>
                        })
                    }
            </div>

            {/* form renders */}

        </div>

        {/* information */}
        <div>

        </div>
    
    </div>
  )
}

export default AddCourses;