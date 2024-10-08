import React from 'react';
import CourseLectureData from './CourseLectureData';

const CourseSectionData = ({course}) => {

  return (
    <div className='w-[60%] py-8 '>

        <div className='w-[90%] mx-auto py-3 border border-richblack-600 px-5 flex flex-col gap-3 '>

                <h3 className='text-xl text-richblack-50 font-semibold'>What you will learn</h3>

                <div className='text-white'>
                     <p>{course?.courseDetails?.whatWeWillLearn}</p>
                    {
                        course?.courseDetails?.instructions?.map((instruction,index)=>(
                            <p key={index}>{instruction}</p>
                        ))
                    }
                </div>
        </div>

        {/* course sections */}
       <div className='mt-4'>
            <CourseLectureData sections={ course?.courseDetails?.courseContent} courseDuration={course?.totalDuration} />
       </div>

        {/*instructor section  */}
        <div className='w-[90%] mx-auto py-3  flex flex-col gap-3'>
            <h3 className='text-3xl font-semibold text-richblack-50'>Author</h3>
            <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full overflow-hidden  text-white'>
                         <img  src={course?.courseDetails?.instructor?.image}  className='w-full object-cover' />
                    </div>
                    <p className=' text-white'><span>{course?.courseDetails?.instructor?.firstName}  </span>
                    <span>{course?.courseDetails?.instructor?.lastName}</span></p>
            </div>

            <div className=' text-white'>
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