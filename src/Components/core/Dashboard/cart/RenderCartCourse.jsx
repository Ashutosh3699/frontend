import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TiStarFullOutline } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { removeCard } from '../../../../features/cartSlice';
import ReactStars from "react-rating-stars-component";

const RenderCartCourse = () => {

  const {carts} = useSelector((state)=>state.cart);
  const dispatch = useDispatch();

  console.log("carts is: ", carts);

  return (
    <div className="flex flex-1 flex-col">
    
      {
        carts.map((course,index) => {

          return (<div key={index}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            index !== carts.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${index !== 0 && "mt-6"} `}
          >

                <div className="flex flex-1 flex-col gap-4 xl:flex-row">

                      <div className="h-[148px] w-[220px] rounded-lg overflow-hidden" >
                          <img  src={course?.courseDetails?.thumbnail}  
                           alt={course?.courseName}
                          className="h-[148px] w-[220px] rounded-lg object-cover" />
                      </div>

                      <div className="flex flex-col space-y-1">
                          <h3 className="text-lg font-medium text-richblack-5">{course?.courseDetails?.courseName}</h3>
                          <p className="text-sm text-richblack-300">{course?.courseDetails?.category?.categoryName}</p>

                          <div className="flex items-center gap-2">
                              <span className="text-yellow-5">4.8</span>
                              <ReactStars
                                count={5}
                                value={course?.courseDetails?.ratingAndReviews?.length}
                                edit={false}
                                size={20}
                                emptyIcon={<TiStarFullOutline />}
                                fullIcon={<TiStarFullOutline />}
                                activeColor="#ffd700"
                              />

                              <span  className="text-richblack-400">{course?.courseDetails?.reviewAndRating?.length} Ratings</span>
                          </div>

                      </div>

                      <div className="flex flex-col items-end space-y-2">

                          <button
                          onClick={()=> dispatch(removeCard(course?._id))}
                           className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                          >
                           <AiFillDelete /> <span>Remove</span>
                          </button>

                          <h5 className="mb-6 text-3xl font-medium text-yellow-100">
                            ₹ {course?.courseDetails?.price} 
                          </h5>
                      </div>

                </div>

          </div>)
        })
      }
    
    </div>
  )
}

export default RenderCartCourse