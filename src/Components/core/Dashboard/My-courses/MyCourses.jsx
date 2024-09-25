import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../common/loader/Loading';
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseApi';
import IconBtn from '../../../common/IconBtn';
import CoursesTable from './CoursesTable';

const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const  [courses, setCourses] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchCourses = async()=>{
        setLoading(true);
        const result = await fetchInstructorCourses(token);
        // console.log("result", result);
        if(result){
            setCourses(result);
        }
        setLoading(false);
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
                        customCLass={"px-3 py-1 text-richblack-500 rounded-lg"}
                    >
                        <IoIosAddCircle/>
                    </IconBtn>
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