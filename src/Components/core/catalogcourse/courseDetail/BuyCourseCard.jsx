import React, { useEffect, useState } from 'react';
import { IoIosTimer } from "react-icons/io";
import { FaMousePointer,FaMobileAlt,FaShareSquare   } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { addItems } from '../../../../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../../services/operations/studentFeaturesApi';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../common/loader/Loading';
import ConfirmationModal from '../../../common/ConfirmationModal';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../../utils/constant';

const BuyCourseCard = ({course}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {courseId} = useParams();
        // confirmation modal also over buy button
        const [confirmationModal, setConfirmationModal] = useState(null);
      // payment loading pending && profile loading
      const {paymentLoading} = useSelector((state)=>state.course);
      const {loading} = useSelector((state)=>state.profile);
      // if user already have the course
      const [alreadyExist, setAlreadyExist] = useState(false);
      useEffect(()=>{
        // console.log("user is: ", user);
        if(user ===null){
          setAlreadyExist(false);
        }
        else if(user.accountCourses?.includes(courseId)){
          setAlreadyExist(true);
        }
      },[])

    if(loading || paymentLoading){
      return (
        <Loading/>
      )
    }
  

    const handleBuyFunction= ()=>{
      if(token){
         buyCourse(token, [courseId], user, navigate, dispatch)
        return;
      }
      else{
        setConfirmationModal({
          text1: "Do you want to buy the course",
          text2: "You are not logged in, please login first",
          btn1text:"login",
          btn2text:"cancel",
          btn1Handler:()=>navigate("/login"),
          btn2Handler:()=>setConfirmationModal(null),
        })
      }
    }

    const handleAddToCart=()=>{

      console.log("course is: ", course);
      if(!user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("Your account type is instrutor or u are not logged in");
      }
      else{
        dispatch(addItems(course));
      }
    }

    const handleShare=()=>{

      copy(window.location.href);
      toast.success("copy successfull");
    }


  return (
    <div className='w-[300px] bg-richblack-700 flex flex-col gap-2 rounded-md overflow-hidden'>
            <div  className='w-full'>
                <img  src={course?.courseDetails?.thumbnail} className='w-full object-cover' />
            </div>

           <div className='px-6 flex flex-col gap-y-3 pt-4 pb-10'>
                 <h3 className=' text-2xl text-richblack-5 font-bold'> Rs. {course?.courseDetails?.price}</h3>

                <div className='flex flex-col gap-3 w-full items-center'>
                   {
                    !alreadyExist &&  <button
                    onClick={()=>handleAddToCart()}
                    className='bg-yellow-50 text-richblack-700 py-2 w-[90%] rounded-md'
                    >Add to Cart</button>
                   }
                   {
                    !alreadyExist &&   <button
                    onClick={()=>handleBuyFunction()}
                    className=' bg-richblack-800 text-richblack-5 font-semibold py-2 w-[90%] rounded-md border-b-2 border-richblack-500'
                    >Buy now</button>
                   }
                   {
                    alreadyExist && <button
                    onClick={()=>navigate(`/dashboard/enrolled-courses`)}
                    className='bg-yellow-50 text-richblack-700 py-2 w-[90%] rounded-md'
                    >Go to courses</button>
                   }
                    <p className='text-xs text-caribbeangreen-50'>30-Day Money-Back Guarantee</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <h4>This course includes:</h4>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'> <IoIosTimer/> <span>8 hours on-demand video</span></p>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'> <FaMousePointer/> <span>Full Lifetime access</span></p>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'><FaMobileAlt/> <span>Access on Mobile and TV</span></p>
                    <p className='text-xs text-caribbeangreen-50 flex gap-1 items-center'><GrCertificate/> <span>Certificate of completion</span></p>
                </div>

                <div onClick={handleShare} className='w-full flex justify-center mt-4 text-xs text-yellow-5 items-center gap-2 cursor-pointer'>
                  <FaShareSquare/> <span>Share</span>
                </div>
           </div>

          

           {confirmationModal && <ConfirmationModal  modalData={confirmationModal}   />}
    </div>
  )
}

export default BuyCourseCard