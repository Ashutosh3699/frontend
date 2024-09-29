import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { PiLaptop } from "react-icons/pi";

const CourseLectureData = ({sections, courseDuration}) => {

    // console.log("section is:", sections);
    const [totalLecture, setTotalLecture] = useState(0);

    useEffect(()=>{
       
        if(sections){
            let total = 0;
            for (const course of sections) {
                total += course?.videoUrl?.length;
            }
            setTotalLecture(total);
            // console.log("total is: ", total);
        }
    },[])

  return (
    <div className='w-[90%] mx-auto py-3  flex flex-col gap-3  '>

        <h3 className='text-2xl font-semibold text-richblack-50'>Course Content</h3>

        <p className='flex items-center gap-3 text-xs'>
            <span>{sections?.length} sections</span>
            <span>{totalLecture} lectures</span>
            <span>{courseDuration} total length</span>
        </p>

      <div>
               { 
                sections?.map((lecture)=>(
                    
                    <details  key={lecture._id}>

                            <summary className='flex justify-between items-center border
                                         border-richblack-500  px-5 py-2 border-b-4 border-b-richblack-200 bg-richblack-700'>

                                        <div className='flex justify-between items-center gap-x-3 '>
                                                <IoIosArrowUp className="text-2xl text-richblack-50"/>
                                                <p className="font-semibold text-richblack-50">{lecture?.sectionName}</p>
                                        </div>

                                        <div className='text-yellow-50'>
                                            <span>{lecture?.videoUrl?.length}  </span> lectures
                                        </div>

                            </summary>

                            <div>
                                    {
                                        lecture?.videoUrl?.map((video)=>(
                                            <details className='flex justify-between items-center px-5 py-2  '  key={video._id}>
                                                    <summary className='flex justify-between items-center px-1    py-2  '>
                                                        <div className='flex justify-between items-center gap-x-3 '>
                                                                <PiLaptop/>
                                                                <p className="font-semibold text-richblack-50">{video?.title}</p>
                                                                <IoIosArrowUp className="text-2xl text-richblack-50"/>
                                                        </div>
                                                        <div>
                                                            {parseInt(video?.timeDuration)} sec
                                                        </div>
                                                    </summary>
                                                    <div className='px-5'>
                                                        <p>{video?.videoDetail} </p>
                                                    </div>
                                            </details>
                                        ))
                                    }
                            </div>
                    </details>
                ))
                }
        </div> 

    
    </div>
  )
}

export default CourseLectureData