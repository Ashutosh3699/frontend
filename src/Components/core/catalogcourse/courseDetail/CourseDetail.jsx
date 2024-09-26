import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../../../../services/operations/courseApi';
import Loading from '../../../common/loader/Loading';
import CourseCategoryDetail from './CourseCategoryDetail';
import CourseSectionData from './CourseSectionData';
import Footer from '../../../common/footer/Footer';
import BuyCourseCard from './BuyCourseCard';

const CourseDetail = () => {

    const {courseId} = useParams();
    const [loading,setLoading] =useState(false);
    const [course,setCourse] = useState(null);

    useEffect(()=>{

        const fetchCourseDdta = async()=>{
            setLoading(true);
            const response = await fetchCourseDetails(courseId);
            console.log(response);
            if(response){
                setCourse(response);
            } else{
                console.log("Error while fetching course");
            }
            setLoading(false);
        }
        if(courseId){
            fetchCourseDdta();
        }
    },[courseId])

  return (
    <div className=' min-h-screen bg-richblack-900  text-white '>
        {
            loading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div className='w-full'>
                    
                    <div className=' w-full flex flex-col '>
                            
                        <div className='flex gap-x-10 items-center h-full w-full pl-40 bg-richblack-800 relative'>
                            <CourseCategoryDetail  course={course}  />

                            <div className='absolute top-10 right-32 '>
                                 <BuyCourseCard course={course}     />
                            </div>
                        
                        </div>

                        <div className='py-8 pl-40'>
                            <CourseSectionData  course={course}  />
                        </div>

                    </div>

                    


                    <div className='py-12 w-full  mx-auto flex justify-center'>
                            <h2>Review And Ratings</h2>
                    </div>

                </div>
            )
        }

        <Footer/>
    </div>
  )
}

export default CourseDetail