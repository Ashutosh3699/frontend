import React, { useEffect, useState } from 'react';
import CourseSlider from '../Components/core/catalogcourse/CourseSlider';
import Footer from '../Components/common/footer/Footer';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import { Course_Card } from '../Components/core/catalogcourse/Course_Card';

const Catalog = () => {

    const {catalogName} =  useParams();
    const [catalogCourse, setCatalogCourse] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    // fetch all categories
    useEffect(()=>{

        const getCategories  = async()=>{
            const res = await apiConnector("GET",categories.CATEGORY_API );
            console.log("res is category : ", res);
            const  category_id = 
            res?.data?.data?.filter((ct)=> ct.categoryName?.split(" ")?.join("-")?.toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName])

    useEffect(()=>{

        const getCategoryDetails = async()=>{
            try {
                const res = await getCatalogPageData(categoryId);
                setCatalogCourse(res);
                console.log("res is :", res);
            } catch (error) {
                console.log("Error at getting Catgory Details",error);
            }
        }

        if(categoryId){
            getCategoryDetails()
        }

    },[categoryId])


  return (
    <div className='text-richblack-50 bg-richblack-900 w-full  '>

        <div>
                <div>
                    <p>{`Home  /  Catalog  /  ` } <span>{catalogCourse?.getCoursebyCategory?.categoryName}</span></p>
                    <p>{catalogCourse?.getCoursebyCategory?.categoryName}</p>
                    <p>{catalogCourse?.getCoursebyCategory?.description}</p>
                </div>

                <div>
                    Side Notes
                </div>
        </div>

        <div>
                {/* section 1 */}
                <div>

                    <h3>Courses to get you started</h3>
                    <div className='flex gap-x-4 items-center'>
                        <p>Most Popular</p> 
                        <p>New</p>
                    </div>
                    <div>
                        <CourseSlider
                            Courses = {catalogCourse?.getCoursebyCategory?.course}
                        />
                    </div>
               
                </div>
                {/* section 2 */}
                <div>
                        <h3>Top Courses in {catalogCourse?.getCoursebyCategory?.categoryName}</h3>
                        <div>
                            <CourseSlider
                                Courses = {catalogCourse?.differentCategory?.course}
                            />
                        </div>
                </div>
                {/* section 3 */}
                <div>
                    <p>Frequently Brought Courses</p>

                    <div className='py-8'>

                            <div className='grid grid-cols-1 lg:grid-cols-2'>

                                    {
                                        catalogCourse?.mostSellingCourses?.length === 0 ? (<p>No Courses available</p>) : (
                                            catalogCourse?.mostSellingCourses?.splice(0,4)
                                            .map((course,index)=>(
                                                <Course_Card   course={course} key={index} height={"h-[400px]"}   />
                                            ))
                                        )
                                    }
                            </div>

                    </div>

                </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Catalog