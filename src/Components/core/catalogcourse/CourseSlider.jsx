import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import  {CourseCardContent} from "./Course_Card";


const CourseSlider = ({Courses}) => {
  return (
    <>
      {
        Courses?.length===0 ? (
          <p>No Course Found</p>
        ): (
          <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
          modules={[Autoplay, Navigation]}
          >

            {
              Courses?.map((course,index)=>(
                <SwiperSlide key={index}>
                    <CourseCardContent  course={course} height={"h-[250px]"} />
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