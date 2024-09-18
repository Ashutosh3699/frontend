import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './Addcourses/CourseInformationForm';
import CreateSection from './craeteSection/CreateSection';



const RenderSteps = () => {

    const {step} = useSelector((state)=> state.course);
    console.log("step is:", step);

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]

  return (
    <>
        <div>
            {steps.map( (item) => (
                <div key={item.id}>
                    <div>
                        <div className={`${step === item.id 
                        ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}>

                        {
                            step > item.id ? (<FaCheck/>) :(item.id)
                        }

                        </div>
                    </div>
                   {/* Add COde for dashes between the labels */}
                </div>
            ) )}
        </div>
        <div>
            {steps.map((item) => (
                <div key={item.id}>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </div>
            ))}
        </div>

        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CreateSection/>}
        {/* {step===3 && <PublishCourse/>} */}
    </>
  )
}

export default RenderSteps
