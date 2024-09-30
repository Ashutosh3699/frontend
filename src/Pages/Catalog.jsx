import React, { useEffect, useState } from 'react';
import CourseSlider from '../Components/core/catalogcourse/CourseSlider';
import Footer from '../Components/common/footer/Footer';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import { CourseCardContent } from '../Components/core/catalogcourse/Course_Card';

const Catalog = () => {

    const {catalogName} =  useParams();
    const [catalogCourse, setCatalogCourse] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);

    // fetch all categories
    useEffect(()=>{

        const getCategories  = async()=>{
            const res = await apiConnector("GET",categories.CATEGORY_API );
            // console.log("res is category : ", res);
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

        <div className='w-full bg-richblack-800 flex items-center py-10 justify-around gap-10'>
                <div className='flex flex-col gap-y-2 items-start leading-4'>
                    <p className='text-richblack-500 font-semibold'>{`Home  /  Catalog  /  ` } <span className='text-yellow-50 text-lg  font-semibold'>{catalogCourse?.getCoursebyCategory?.categoryName}</span></p>
                    <p className='text-richblack-100 text-4xl font-bold'>{catalogCourse?.getCoursebyCategory?.categoryName}</p>
                    <p className='text-richblack-200 text-base'>{catalogCourse?.getCoursebyCategory?.description}</p>
                </div>

                <div>
                <h2 className='text-richblack-200 text-xl font-semibold'>Related to course</h2>
                   <ul className='px-2 mt-2 text-richblack-300 font-edu-sa'>
                        <li>Doc {catalogCourse?.getCoursebyCategory?.categoryName}</li>
                        <li>CheatSheets</li>
                        <li>Articles</li>
                        <li>Community forums</li>
                        <li>Projects</li>
                   </ul>

                </div>
        </div>

        <div className='w-full'>
                {/* section 1 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">Courses to get you started</div>
                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${
                        active === 1
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Populer
                    </p>
                    <p
                        className={`px-4 py-2 ${
                        active === 2
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                    </div>
                    <div >
                    <CourseSlider
                        Courses={catalogCourse?.getCoursebyCategory?.course}
                    />
                    </div>
                </div>
                {/* section 2 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                        <h3>Top Courses in {catalogCourse?.getCoursebyCategory?.categoryName}</h3>
                        <div className="py-8">
                            <CourseSlider
                                Courses = {catalogCourse?.differentCategory?.course}
                            />
                        </div>
                </div>
                {/* section 3 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <p>Frequently Brought Courses</p>

                    <div className='py-8'>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                                    {
                                        catalogCourse?.mostSellingCourses?.length === 0 ? (<p>No Courses available</p>) : (
                                            catalogCourse?.mostSellingCourses?.splice(0,4)
                                            .map((course,index)=>(
                                                <CourseCardContent   course={course} key={index} height={"h-[400px]"}   />
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