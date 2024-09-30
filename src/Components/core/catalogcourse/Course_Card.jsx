import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

export const CourseCardContent = ({course, height}) => {

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(()=>{
      const count = GetAvgRating(course?.reviewAndRating);
      setAvgReviewCount(count)
  },[course]);

  // console.log("course is; ", course);
  // console.log("avg count is: ", avgReviewCount);

  return (
    <div>

        <Link to={`/courses/${course._id}`}>
                <div>
                    <div className="rounded-lg">
                      <img src={course?.thumbnail}
                        alt='course thumbnail'
                        className={`${height}  w-full object-fill  rounded-xl`}
                       />
                    </div>

                    <div className="flex flex-col gap-2 px-1 py-3">
                          {/* course name */}
                          <p className="text-xl text-richblack-5">{course?.courseName}</p>
                          {/* instructor */}
                          <p className="text-sm text-richblack-50 flex gap-3"><span>{course?.instructor?.firstName}</span> <span>{course?.instructor?.lastName}</span>  </p>

                          <div className="flex items-center gap-2">
                              <span className="text-yellow-5">{avgReviewCount}</span>
                              <RatingStars  Review_Count={avgReviewCount}/>
                              <span className="text-richblack-400">{course?.studentEnrolled?.length}</span>
                          </div>
                        {/* price */}
                          <p className="text-xl text-richblack-5">{course?.price}</p>
                    </div>
                </div>

        </Link>
    </div>
  )
}
