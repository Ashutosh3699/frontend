import React from 'react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { FreeMode,Pagination } from 'swiper/modules';
import { Course_Card } from './Course_Card';
import { Swiper, SwiperSlide } from 'swiper/react';


const CourseSlider = ({Courses}) => {
  return (
    <>
      {
        Courses?.length===0 ? (
          <p>No Course Found</p>
        ): (
          <Swiper
          pagination={true} 
          slidesPerView={1}
          loop={true}
          modules={[Pagination]}
          >

            {
              Courses?.map((course,index)=>(
                <SwiperSlide key={index}>
                    <Course_Card  course={course} height={"h-[250px]"} />
                </SwiperSlide>
              ))
            }

          </Swiper>
        )
      }
    
    </>
  )
}

export default CourseSlider