import React from 'react';
import { IoIosTimer } from "react-icons/io";
import { FaMousePointer,FaMobileAlt  } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { addItems } from '../../../../features/cartSlice';
import { useDispatch } from 'react-redux';

const BuyCourseCard = ({course}) => {

    const dispatch = useDispatch();

  return (
    <div className='w-[300px] bg-richblack-700 flex flex-col gap-2 rounded-md overflow-hidden'>
            <div  className='w-full'>
                <img  src={course?.courseDetails?.thumbnail} className='w-full object-cover' />
            </div>

           <div className='px-6 flex flex-col gap-y-3 pt-4 pb-10'>
                 <h3 className=' text-2xl text-richblack-5 font-bold'> Rs. {course?.courseDetails?.price}</h3>

                <div className='flex flex-col gap-3 w-full items-center'>
                    <button
                    onClick={()=>dispatch(addItems(course?.courseDetails))}
                    className='bg-yellow-50 text-richblack-700 py-2 w-[90%] rounded-md'
                    >Add to Cart</button>
                    <button
                    className=' bg-richblack-800 text-richblack-5 font-semibold py-2 w-[90%] rounded-md border-b-2 border-richblack-500'
                    >Buy now</button>
                    <p className='text-xs text-caribbeangreen-50'>30-Day Money-Back Guarantee</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <h4>This course includes:</h4>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'> <IoIosTimer/> <span>8 hours on-demand video</span></p>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'> <FaMousePointer/> <span>Full Lifetime access</span></p>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'><FaMobileAlt/> <span>Access on Mobile and TV</span></p>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'><GrCertificate/> <span>Certificate of completion</span></p>
                </div>
           </div>
    </div>
  )
}

export default BuyCourseCard