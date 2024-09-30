import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { BsChevronDown } from "react-icons/bs"

const VideoDetailsSidebar = ({setReviewModal}) => {

  const  [ activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const {sectionId, subSectionId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures
  }= useSelector((state)=>state.viewCourse);

  useEffect(()=>{

    ;(()=>{
      if(!courseSectionData.length){
        return ;
      };
      const currentSectionIndex = courseSectionData?.findIndex(
        (data)=>data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.videoUrl?.findIndex(
        (data)=>data._id === subSectionId
      );

      const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.videoUrl?.[currentSubSectionIndex]?._id;

      // set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set active subsection here
      setVideoBarActive(activeSubSectionId)

    })();
  },[courseSectionData,courseEntireData, location.pathname])



  return (
    <>
    
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
          {/* for button and heading */}
          <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
              {/* for button */}
              <div className="flex w-full items-center justify-between ">
                    <button
                    onClick={()=>navigate("/dashboard/enrolled-courses")}
                    className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                    >
                      Back
                    </button>

                    <div>
                      <IconBtn
                        text={"Add Review"}
                        onclick={()=>setReviewModal(true)}
                      />
                    </div>
              </div>
          {/* for heading */}
              <div className="flex flex-col">
                <p>{courseEntireData?.courseName}</p>
                <p  className="text-sm font-semibold text-richblack-500">{completedLectures?.length}/ {totalNoOfLectures}</p>
              </div>

          </div>

          {/* sections and subsection  */}

          <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
              {
                courseSectionData.map((section, index)=>(
                  <div
                  className="mt-2 cursor-pointer text-sm text-richblack-5"
                  onClick={()=>setActiveStatus(section._id)}
                  key={index}
                  >
                  {/* section */}
                  <div  className="flex flex-row justify-between bg-richblack-600 px-5 py-4">

                    <div className="w-[70%] font-semibold">
                      {section?.sectionName}
                    </div>
                    {/* toggle icon */}
                    <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                  <span
                    className={`${
                      activeStatus === section?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>

                  </div>
                  {/* subsections */}
                  <div className="flex items-center gap-3">
                      {
                        activeStatus === section._id && (
                          <div className="transition-[height] duration-500 ease-in-out">
                              {
                                section?.videoUrl?.map((lecture, index)=>(
                                  <div key={index}
                                  className={`flex gap-5  p-5 ${
                                  videoBarActive=== lecture?._id ? "bg-yellow-50 text-black" : "bg-richblack-700 text-white"
                                  }`}
                                  onClick={()=>{
                                                  navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${lecture?._id}`);
                                                  setVideoBarActive(lecture?._id)
                                                }}
                                  >

                                              <input
                                                type='checkbox'
                                                checked={completedLectures.includes(lecture?._id)}
                                                onChange={()=>{}}
                                              />
                                              <span>{lecture?.title}</span>
                                  </div>
                                ))
                              }
                          </div>
                        )
                      }
                  </div>


                  </div>
                ))
              }
          </div>


      </div>
    
    
    </>
  )
}

export default VideoDetailsSidebar