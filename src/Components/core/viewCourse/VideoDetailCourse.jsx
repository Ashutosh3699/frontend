import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseApi';
import { updateCompletedLectures } from '../../../features/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; 
import { FaRegCirclePlay } from "react-icons/fa6";
import IconBtn from '../../common/IconBtn';

const VideoDetailCourse = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const {token} = useSelector(state=>state.auth);
  const {courseEntireData, courseSectionData,completedLectures } = useSelector((state)=>state.viewCourse);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(()=>{

    const  setVideoSpecificData = async()=>{
      
      if(!courseSectionData.length){
        return
      }
      if(!courseId || !sectionId || !subSectionId){

        navigate("/dashboard/enrolled-courses")
      }
      else{

        console.log("section data is: ", courseSectionData);

        const filteredData = courseSectionData.filter(
          (data)=>data._id === sectionId
        );
        console.log("filteredData data is", filteredData)

        const filteredVideoData = filteredData[0]?.videoUrl?.filter(
          (data)=>data._id===subSectionId
        );

        console.log("set filtered data is", filteredVideoData)
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);

      }
    };

    setVideoSpecificData();
  },[courseSectionData,courseEntireData, location.pathname])



  const isFirstVideo = ()=>{

    const currentSectionIndex = courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    );

    const currentVideoIndex = courseSectionData[currentSectionIndex]?.videoUrl?.findIndex(
      (data)=>data._id === subSectionId
    );


    if(currentSectionIndex===0 && currentVideoIndex===0){
      return true;
    }
    else{
      return false;
    }

  }

  const isLastVideo=()=>{

    const currentSectionIndex = courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    );

    const currentSectionLength = courseSectionData[currentSectionIndex]?.videoUrl?.length;

    const currentVideoIndex = courseSectionData[currentSectionIndex]?.videoUrl?.findIndex(
      (data)=>data._id === subSectionId
    );

      if(currentSectionIndex === courseSectionData-1 && currentVideoIndex=== currentSectionLength-1 ){
        return true;
      }
      else{
        return false;
      }

  }

  const goToNextVideo=()=>{

    const currentSectionIndex = courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    );

    const currentSectionLength = courseSectionData[currentSectionIndex]?.videoUrl?.length;

    const currentVideoIndex = courseSectionData[currentSectionIndex]?.videoUrl?.findIndex(
      (data)=>data._id === subSectionId
    );

    if(currentVideoIndex !== currentSectionLength-1){
      // same section ki next video
      const nextSubSectionId = courseSectionData[currentSectionIndex]?.videoUrl[currentVideoIndex+1]._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }else{
      // diffrrent section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
      const nextVideoId = courseSectionData[currentSectionIndex+1]?.videoUrl[0]._id;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextVideoId}`)
    }
  }

  const goToPrevVideo=()=>{

    const currentSectionIndex = courseSectionData?.findIndex(
      (data)=>data._id === sectionId
    );

    const currentVideoIndex = courseSectionData[currentSectionIndex]?.videoUrl?.findIndex(
      (data)=>data._id === subSectionId
    );

    if(currentVideoIndex!==0){
      // same section previous video
      const prevSubsectionId= courseSectionData[currentSectionIndex]?.videoUrl[currentVideoIndex-1]._id;
      
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`)
    }
    else{
      // diffrent section previous video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      
      const prevSectionLength = courseSectionData[currentSectionIndex -1]?.videoUrl?.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex -1]?.videoUrl[prevSectionLength]?._id;

      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleCompleteVideo= async()=>{
    // dummy code
    setLoading(true);

    const result = await markLectureAsComplete({
      courseId:courseId,
      subSectionId:subSectionId,
      sectionId:sectionId,
    },
  token);
    // state update
  if(result){
    dispatch(updateCompletedLectures(subSectionId));
  }
    setLoading(false);
  }

  console.log("video data", videoData);

  return (
    <div>

            {
              !videoData ? (<div>No data found</div>) : (
                <Player
                ref={playerRef}
                playsInline
                onEnded={()=>setVideoEnded(true)}
                aspectRatio='16:9'
                src={videoData?.video}
                >
                   
                   <FaRegCirclePlay/>

                   {
                    videoEnded && (
                      <div
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                      }}
                      className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                      >
                          {
                            !completedLectures?.includes(subSectionId) && (
                              <IconBtn
                                disabled={loading}
                                onclick={()=>handleCompleteVideo()}
                                text={!loading ? "Marks as complete" : "...loading"}
                                customCLass="text-xl max-w-max px-4 mx-auto"
                              />
                            )
                          }

                          <IconBtn
                            disabled={loading}
                            text={"Rewatch"}
                            onclick={()=>{
                              if(playerRef?.current){
                                playerRef?.current?.seek(0);
                                setVideoEnded(false)
                              }
                            }}
                             customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                          />

                          <div  className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                {
                                  !isFirstVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={()=>goToPrevVideo()}
                                    className='text-black bg-yellow-5 p-5'
                                    >
                                      prev
                                    </button>
                                  )
                                }
                                {
                                  !isLastVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToNextVideo}
                                    className='text-black bg-yellow-5 p-5'
                                    >
                                      next
                                    </button>
                                  )
                                }
                          </div>
                      </div>
                    )
                   }
                </Player>
              )
            }
    
    <div>
            <h1 className="mt-4 text-3xl font-semibold">{videoData.title}</h1>
            <p className="pt-2 pb-6">{videoData.videoDetail}</p>
    </div>
    
    </div>
  )
}

export default VideoDetailCourse