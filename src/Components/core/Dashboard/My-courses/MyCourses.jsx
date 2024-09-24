import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../common/loader/Loading';
import { getAccountCourses } from '../../../../services/operations/profileApi';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseApi';
import IconBtn from '../../../common/IconBtn';
import CoursesTable from './CoursesTable';

const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const  [courses, setCourses] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();

    const fetchCourses = async()=>{
        const result = await fetchInstructorCourses(token);
        // console.log("result", result);
        if(result){
            setCourses(result);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [])
    

  return (
    <div className='text-white'
    >

    {
        loading ? (
            <Loading/>
        ) : (
           <div>
                <div className='flex justify-between items-center pb-10 pt-2'>
                    <h2>My Courses</h2>
                    <IconBtn
                        text={"Add course"}
                        onclick={()=>navigate("/dashboard/add-course")}
                    />
                </div>

                {
                    courses && <CoursesTable courses={courses}  setCourses={setCourses}/>
                }

           </div>
        )
    }
    
    
    </div>
  )
}

export default MyCourses