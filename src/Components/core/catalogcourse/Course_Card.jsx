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
                    <div>
                      <img src={course?.thumbnail}
                        alt='course thumbnail'
                        className={`${height}  w-full object-fill  rounded-xl`}
                       />
                    </div>

                    <div>
                          {/* course name */}
                          <p>{course?.courseName}</p>
                          {/* instructor */}
                          <p><span>{course?.instructor?.firstName}</span> <span>{course?.instructor?.lastName}</span>  </p>

                          <div>
                              <span>{avgReviewCount}</span>
                              <RatingStars  Review_Count={avgReviewCount}/>
                              <span>{course?.studentEnrolled?.length}</span>
                          </div>
                        {/* price */}
                          <p>{course?.price}</p>
                    </div>
                </div>

        </Link>
    </div>
  )
}
