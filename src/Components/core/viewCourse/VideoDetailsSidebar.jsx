import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

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
    
      <div>
          {/* for button and heading */}
          <div>
              {/* for button */}
              <div>
                    <button
                    onClick={()=>navigate("/dashboard/enrolled-courses")}
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
              <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length}/ {totalNoOfLectures}</p>
              </div>

          </div>

          {/* sections and subsection  */}

          <div>
              {
                courseSectionData.map((section, index)=>(
                  <div
                  onClick={()=>setActiveStatus(section._id)}
                  key={index}
                  >
                  {/* section */}
                  <div>

                    <div>
                      {section?.sectionName}
                    </div>
                    {/* toggle icon */}

                  </div>
                  {/* subsections */}
                  <div>
                      {
                        activeStatus === section._id && (
                          <div>
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