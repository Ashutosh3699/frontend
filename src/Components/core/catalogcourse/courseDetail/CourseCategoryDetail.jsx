import React, { useEffect, useState } from 'react';
import GetAvgRating from '../../../../utils/avgRating';
import RatingStars from '../../../common/RatingStars';
import { BsFillInfoCircleFill, BsGlobe2  } from "react-icons/bs";

const CourseCategoryDetail = ({course}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course?.courseDetails?.reviewAndRating);
        setAvgReviewCount(count)
    },[course])


  return (
    <div className='w-[60%] '>

        <div className='w-full flex items-center py-10 justify-around '>
                <div className='flex flex-col gap-y-2 items-start leading-4 border-r border-richblack-600 pr-24'>
                    <p className='text-richblack-500 font-semibold'>{`Home  /  Catalog  /  ` }
                     <span className='text-yellow-50 text-lg  font-semibold'>{course?.courseDetails?.category?.categoryName}</span></p>

                    <p className='text-richblack-100 text-4xl font-bold'>{course?.courseDetails?.category?.description}</p>

                    <p className='text-richblack-200 text-base'>This {course?.courseDetails?.category?.categoryName} for beginners 
                    course will help you to become Zero to Hero. Learn {course?.courseDetails?.category?.categoryName} in Easy Way.</p>

                    <div className='flex items-center gap-3 text-white'>
                             <span className='text-yellow-50'>{avgReviewCount}</span>
                              <RatingStars  Review_Count={avgReviewCount}/>
                              <span>{course?.courseDetails?.studentEnrolled?.length}  students</span>
                    </div>

                    <p className=' text-white'>Created by <span>{course?.courseDetails?.instructor?.firstName}  </span>
                     <span>{course?.courseDetails?.instructor?.lastName}</span>
                     </p>

                     <div className='flex gap-3 items-center  text-white'>
                        <span><BsFillInfoCircleFill/> </span> <span>Created at: 12/9/2024</span> 
                        <span><BsGlobe2/>  </span> <span>English or spanish</span>
                     </div>

                </div>

        </div>
    
    </div>
  )
}

export default CourseCategoryDetail