import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {ratingAndReview} from "../../services/apis";
import { apiConnector } from '../../services/apiConnector';
import {TiStarFullOutline} from "react-icons/ti"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

// import required modules
import { Autoplay, Navigation, Pagination, FreeMode } from 'swiper/modules';
import ReactStars from "react-rating-stars-component"

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWord = 15;

    useEffect(()=>{

        const fetchAllReview=async()=>{
            const {data} = await apiConnector("GET", ratingAndReview.RATING_AND_REVIEW_API);

            console.log("response of review is: ", data);
            if(data?.success){
                setReviews(data?.result);
            }
        }
        fetchAllReview();
    },[])

  return (
    <div className='w-full mx-auto'>

        <div className=' h-[190px]  max-w-maxContent'>

        <Swiper 
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
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
            reviews.map((item,index)=>(

                <SwiperSlide key={index}>
                        
                        <img
                            src={item?.user?.image ?
                             item?.user?.image  :
                              `https://api.dicebear.com/5.x/initials/svg?seed=${item?.user?.firstName} ${item?.user?.lastName}`}

                              alt='profile-pic'
                              className='w-9 h-9 object-cover rounded-full'
                        />

                        <p>{item?.user?.firstName} {item?.user?.lastName}</p>
                        <p>{item?.course?.courseName}</p>
                        <p>{item?.review}</p>
                        <div>
                            <p>{item?.rating.toFixed(1)}</p>
                            <ReactStars
                                count={5}
                                size={20}
                                value={item?.rating}
                                edit={false}
                                emptyIcon={<TiStarFullOutline />}
                                fullIcon={<TiStarFullOutline />}
                                activeColor="#ffd700"

                            />
                        </div>
                </SwiperSlide>
            ))
        }
            
        </Swiper>

        </div>
    
    </div>
  )
}

export default ReviewSlider