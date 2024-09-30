import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoDetailsSidebar from '../Components/core/viewCourse/VideoDetailsSidebar';
import { Outlet, useParams } from 'react-router-dom';
import CourseReviewModal from '../Components/core/viewCourse/CourseReviewModal';
import { getFullDetailsOfCourse } from '../services/operations/courseApi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../features/viewCourseSlice';
import Loading from '../Components/common/loader/Loading';

const ViewCourse = () => {

  const  [reviewModal, setReviewModal] = useState(null);
  const {courseId} = useParams();
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const setCourseSpecificData = async()=>{
      setLoading(true);
      const response = await getFullDetailsOfCourse(courseId, token);
      console.log("response is:", response);

      dispatch(setEntireCourseData(response?.courseDetails));
      dispatch(setCourseSectionData(response?.courseDetails?.courseContent));
      dispatch(setCompletedLectures(response?.completedVideo));

      let lecture = 0;
      response?.courseDetails?.courseContent?.forEach((sec)=>{
        lecture += sec?.videoUrl?.length;
      })
      dispatch(setTotalNoOfLectures(lecture));
      setLoading(false);
    };


    setCourseSpecificData();
  },[]);

  if(loading){
    return (
      <Loading/>
    )
  }


  return (
    <div className=' bg-richblack-900 w-full'>

        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
           <VideoDetailsSidebar   setReviewModal={setReviewModal}  />

           <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mx-6">
              <Outlet/>
           </div>
        </div>

        {
          reviewModal && <CourseReviewModal   setReviewModal={setReviewModal}   />
        }
    
    </div>
  )
}

export default ViewCourse