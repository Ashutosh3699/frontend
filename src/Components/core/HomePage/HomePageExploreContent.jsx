import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightContext from './HighLightContext';

const HomePageExploreContent = () => {

    const ExploreBar = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ]

    const [coursetag, setCourseTag] = useState(HomePageExplore[0].tag);
    const [course, setCourse] = useState(HomePageExplore[0].courses);
    const [currentCourse, setCurrentCourse] = useState(HomePageExplore[0].courses[0]);

    const setCourseFunction = (value)=>{

        setCourseTag(value);
        const result = HomePageExplore.filter((element) => element.tag === value);
        setCourse(result[0].courses);
        setCurrentCourse(result[0].courses[0]);
    }



  return (
    <div className='flex flex-col  gap-2  relative  w-full  lg:pb-[150px]'>
        {/* heading  */}
        <div  className='text-3xl text-richblack-100  font-semibold  text-center'>
            Unlock the <span> </span> <HighLightContext>Power of Coding</HighLightContext>
        </div>

        {/* subheading */}
        <div  className='text-sm text-richblack-400  font-medium  text-center'>
            Learn to Build Anything You Can Imagine
        </div>

        {/* explore bar */}
        <div  className='flex flex-row justify-between w-[40%] mx-auto rounded-full  bg-richblack-700 py-1 px-1  lg:mt-6 mb-8'>
            {
                ExploreBar.map((element,index) => {
                    return (
                        <div 
                        key={index}
                        className={`flex  items-center px-3  py-1  rounded-full  text-md  font-medium 
                        ${element===coursetag ? (" text-richblack-5  bg-richblack-900 "):
                        ("  text-richblack-100 ") }  cursor-pointer  hover:bg-richblack-800  hover:text-richblack-25 `}
                        onClick={()=>setCourseFunction(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        {/* cardContent */}

            <div className='flex flex-row gap-6  w-[75%]  mx-auto lg:absolute lg:gap-0  lg:justify-between flex-wrap  lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]'>
                {
                    course.map((element, index)=>{
                        return (
                        <div  className={`flex flex-col pt-6 pb-3 px-4 gap-10 w-[31%] cursor-pointer
                        ${element === currentCourse ? (" bg-richblack-5   drop-shadow-[20px_20px_0px_rgba(255,235,55,5)] "):(" bg-richblack-700")}`}
                        onClick={()=>setCurrentCourse(element)}
                         key={index}>
                           
                           <div className='flex flex-col  gap-3 items-start '>
                             <h4  className={`text-lg  ${element === currentCourse ? (" text-richblack-400"):(" text-richblack-100")}
                              font-semibold`}>{element.heading}</h4>
                                <p className={`text-sm  ${element === currentCourse ? (" text-richblack-200"):(" text-richblack-25")}
                              font-semibold`}>{element.description}</p>
                           </div>

                           <div className='flex flex-col  gap-4 items-start  text-richblack-100'>
                                <div className='h-1 '>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</div>
                                <div  className={`flex gap-24  ${element === currentCourse ? (" text-richblack-400"):(" text-richblack-100")}
                              font-semibold`}>
                                    <div>{element.level}</div>
                                    <div>{element.lessionNumber} lessons</div>
                                </div>
                           </div>

                        </div>
                        )
                    })
                }
            </div>

    </div>
  )
}

export default HomePageExploreContent