import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../createCourses/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseApi';
import { setCourse, setEditCourse } from '../../../../features/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state)=>state.course);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{

        const populateCourseDetail =async()=>{
            setLoading(true);
            const result = await  getFullDetailsOfCourse(courseId,token);

            console.log("result of edit course is: ", result);

            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }

        populateCourseDetail()
    },[])



    if(loading){

        return <div>
            ...Loading
        </div>
    }

  return (
    <div className='text-white'>
        <h2>Edit Course</h2>

        <div>
                {
                    course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
                }
        </div>
    </div>
  )
}

export default EditCourse