import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../services/operations/profileApi';
import Loading from "../../common/loader/Loading";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const {token, loading} = useSelector((state)=>state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchEnrolledCourse = ()=>{
        dispatch(getEnrolledCourses(token, setEnrolledCourses));
    }

    useEffect(()=>{
         fetchEnrolledCourse();
    },[]);

    console.log("enrolled courses is: ", enrolledCourses);

  return (
    <div className='text-white'>
        
        <h2 className="text-3xl text-richblack-50">Enrolled Courses</h2>
        {
            loading ? (
                <div  className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <Loading/>
                </div>
            ) : 
            !enrolledCourses.length  ? (
                <div className="grid h-[10vh] w-full place-content-center text-richblack-5">No courses enrolled yet</div>
            ) : (
                <div  className="my-8 text-richblack-5">


                        <div  className="flex rounded-t-lg bg-richblack-500 ">

                            <h3 className="w-[45%] px-5 py-3">Course Name</h3>
                            <h3 className="w-1/4 px-2 py-3">Duration</h3>
                            <h3 className="flex-1 px-2 py-3">Progress</h3>

                        </div>

                        {
                            enrolledCourses.map((course,index,arr)=>(
                                <div 
                                className={`flex items-center border border-richblack-700 ${
                                    index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                                key={index}
                                >

                                    <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                    onClick={()=>navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0]?.videoUrl?.[0]._id}`)}
                                    >
                                            <img  src={course?.thumbnail}
                                                alt="course_img"
                                                className="h-14 w-14 rounded-lg object-cover"
                                             />
                                            <div className="flex max-w-xs flex-col gap-2">
                                                    <h4  className="font-semibold">{course?.courseName}</h4>
                                                    <h6 className="text-xs text-richblack-300">
                                                    {course.courseDetail.length > 50
                                                    ? `${course.courseDetail.slice(0, 50)}...`
                                                    : course.courseDetail}
                                                    </h6>
                                            </div>
                                    </div>

                                    <div className="w-1/4 px-2 py-3">
                                        {course?.timeduration}
                                    </div>

                                    <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                        <p>Progress : {course?.courseProgress || 0}</p>
                                        <ProgressBar
                                        completed={course?.courseProgress || 0}
                                        />
                                    </div>

                                </div>
                            ))
                        }

                </div>
            )
        }
    
    
    </div>
  )
}

export default EnrolledCourses