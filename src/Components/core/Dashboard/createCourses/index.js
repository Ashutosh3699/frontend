import React from 'react'
import {useSelector} from 'react-redux';
import { TiTick } from "react-icons/ti";
import CourseInformationForm from './CourseInformationForm';


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
   

    

  return (
    <div className='w-11/12 flex gap-2'>

        <div className='w-[80%] flex flex-col'>

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
                               <div className='text-md text-richblack-25'>
                                        {
                                            steps.stepDesc
                                        }
                               </div>
                               {/* add dashes */}
                            </div>
                        })
                    }
            </div>

            {/* form renders */}
            {
                step === 1 && <CourseInformationForm/>
            }
            {/* {
                step === 2 &&  section creation
            } */}
            {/* {
                step === 3  && publish Course
            } */}
            
        
        </div>

        {/* information */}
        <div>

        </div>
    
    </div>
  )
}

export default AddCourses;