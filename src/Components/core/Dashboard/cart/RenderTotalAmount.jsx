import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentFeaturesApi';

const RenderTotalAmount = () => {

    const {total,carts} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse= ()=>{

        const courses = carts.map((course)=>course.courseDetails._id);
        console.log("buy courses: ", courses);
        if(token){
          buyCourse(token, courses, user, navigate, dispatch)
         return;
        }
    }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 mr-10">
       <p className="mb-1 text-sm font-medium text-richblack-300 text-center">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100 text-center">₹ {total}</p>
        <IconBtn
          text="Buy Now"
          onclick={handleBuyCourse}
          customCLass="w-full justify-center bg-yellow-50 text-black text-center px-4 py-2"
        />
    </div>
  )
}

export default RenderTotalAmount