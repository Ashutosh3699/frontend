import React from 'react';
import CourseLectureData from './CourseLectureData';

const CourseSectionData = ({course}) => {

    console.log("course is: ", course);
  return (
    <div className='w-[60%] py-8 border border-richblack-500  '>

        <div className='w-[90%] mx-auto py-3 '>

                <h3>What you will learn</h3>

                <div>
                     <p>{course?.courseDetails?.whatWeWillLearn}</p>
                    {
                        course?.courseDetails?.instructions?.map((instruction,index)=>(
                            <p key={index}>{instruction}</p>
                        ))
                    }
                </div>
        </div>

        {/* course sections */}
       <div>
            <CourseLectureData sections={ course?.courseDetails?.courseContent} courseDuration={course?.totalDuration} />
       </div>

        {/*instructor section  */}
        <div className='w-[90%] mx-auto py-3  flex flex-col gap-3'>
            <h3 className='text-3xl font-semibold text-richblack-50'>Author</h3>
            <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                         <img  src={course?.courseDetails?.instructor?.image}  className='w-full object-cover' />
                    </div>
                    <p><span>{course?.courseDetails?.instructor?.firstName}  </span>
                    <span>{course?.courseDetails?.instructor?.lastName}</span></p>
            </div>

            <div>
            {course?.courseDetails?.instructor?.accountDetails?.aboutUser ?
             (
                <p>{course?.courseDetails?.instructor?.accountDetails?.aboutUser}</p>
            )
              : (
                <p>No data of instructor is present</p>
             )
             }
            </div>
        </div>

    
    </div>
  )
}

export default CourseSectionData