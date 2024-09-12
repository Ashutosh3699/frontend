import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../services/operations/profileApi';
import Loading from "../../common/loader/Loading";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {

    const {token, loading} = useSelector((state)=>state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const dispatch = useDispatch();

    const fetchEnrolledCourse = ()=>{
        dispatch(getEnrolledCourses(token, setEnrolledCourses));
    }

    useEffect(()=>{
         fetchEnrolledCourse();
    },[]);


  return (
    <div className='text-white'>
        
        {
            loading ? (
                <Loading/>
            ) : 
            !enrolledCourses.length  ? (
                <div>No courses enrolled yet</div>
            ) : (
                <div className='w-full bg-richblack-900 '>

                    <h2>Enrolled Courses</h2>

                    <div className='flex flex-col gap-2 items-start '>

                        <div  className='flex items-center px-6 py-2 justify-between'>

                            <h3>Course Name</h3>
                            <h3>Duration</h3>
                            <h3>Progress</h3>

                        </div>

                        {
                            enrolledCourses.map((course,index)=>(
                                <div key={index}>

                                    <div>
                                            <img  src={course?.image} alt='profile-course' />
                                            <div>
                                                    <h4>{course?.courseName}</h4>
                                                    <h6>{course?.courseDetail}</h6>
                                            </div>
                                    </div>

                                    <div>
                                        {course?.timeduration}
                                    </div>

                                    <div>
                                        <p>Progress : {course?.courseProgress || 0}</p>
                                        <ProgressBar
                                        completed={course?.courseProgress || 0}
                                        />
                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </div>
            )
        }
    
    
    </div>
  )
}

export default EnrolledCourses