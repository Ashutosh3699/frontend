import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TiStarFullOutline } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { removeCard } from '../../../../features/cartSlice';
import ReactStars from "react-rating-stars-component";

const RenderCartCourse = () => {

  const {cart} = useSelector((state)=>state.cart);
  const dispatch = useDispatch();

  return (
    <div>
    
      {
        cart.map((course,index) => {

          return (<div key={index}>

                <div>

                      <div>
                          <img  src={course?.image}  alt='course-image1' />
                      </div>

                      <div>
                          <h3>{course?.courseName}</h3>
                          <p>{course?.category?.name}</p>

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

                              <span>{course?.ratingAndReview?.length} Ratings</span>
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