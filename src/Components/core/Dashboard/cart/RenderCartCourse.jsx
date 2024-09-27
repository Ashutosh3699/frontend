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
    <div>
    
      {
        carts.map((course,index) => {

          return (<div key={index}>

                <div className='text-richblack-100 '>

                      <div>
                          <img  src={course?.thumbnail}  alt='course-image1' />
                      </div>

                      <div>
                          <h3>{course?.courseName}</h3>
                          <p>{course?.category?.categoryName}</p>

                          <div>
                              <span>4.8</span>
                              <ReactStars
                                count={5}
                                edit={false}
                                size={20}
                                emptyIcon={<TiStarFullOutline />}
                                fullIcon={<TiStarFullOutline />}
                                activeColor="#ffd700"
                              />

                              <span>{course?.reviewAndRating?.length} Ratings</span>
                          </div>

                      </div>

                      <div>

                          <button
                          onClick={()=> dispatch(removeCard(course?._id))}
                          >
                           <AiFillDelete /> <span>Delete</span>
                          </button>

                          <h5>
                             Rs {course?.price} 
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