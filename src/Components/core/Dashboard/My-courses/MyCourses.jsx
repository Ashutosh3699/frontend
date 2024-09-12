import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../common/loader/Loading';
import { getAccountCourses } from '../../../../services/operations/profileApi';

const MyCourses = () => {

    const {token,loading} = useSelector((state)=>state.auth);
    const  [myCourses, setMyCourses] = useState([]);

    const dispatch = useDispatch();

    const fetchCourses =()=>{

        dispatch(getAccountCourses(token, setMyCourses));
    }

    useEffect(() => {
        // console.log("fetching courses ....");
        fetchCourses();
        // console.log("fetch course after");
    }, [])
    

  return (
    <div className='text-white'
    >

    {
        loading ? (
            <Loading/>
        ) : (
            !myCourses.length  ? (<div>No courses created yet</div>) : (
                <div>

                    <h2>My Courses</h2>

                        <div className='flex flex-col gap-2 items-start '>

                            <div  className='flex items-center px-6 py-2 justify-between'>

                                <h3>Courses</h3>
                                <h3>Duration</h3>
                                <h3>Price</h3>
                                <h3>Actions</h3>

                            </div>

                            {
                                myCourses.map((course,index)=>(
                                    <div key={index}>

                                        <div>
                                                <img  src={course?.image} alt='profile-course' />
                                                <div>
                                                        <h4>{course?.courseName}</h4>
                                                        <h6>{course?.whatWeWillLearn}</h6>
                                                        <h6>{course?.courseDetail}</h6>

                                                        {/* status of course */}
                                                </div>
                                        </div>

                                        <div>
                                            {course?.timeduration}
                                        </div>

                                        <div>
                                            <p> Rs  {course?.price}</p>
                                        </div>

                                        <div className='flex gap-3'>
                                            <button>
                                                Edit
                                            </button>
                                            <button>
                                                Remove
                                            </button>
                                        </div>

                                    </div>
                                ))
                            }

                            </div>


                </div>
            )
        )
    }
    
    
    </div>
  )
}

export default MyCourses