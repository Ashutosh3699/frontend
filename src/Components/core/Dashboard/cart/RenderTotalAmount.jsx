import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {

    const {total,cart} = useSelector((state)=>state.cart);

    const handleBuyCourse= ()=>{

        const courses = cart.map((course)=>course._id);
        console.log("buy courses: ", courses);
    }

  return (
    <div>
        <p>Total: </p>
        <h4>Rs {total}</h4>

        <IconBtn
            text={"Buy Now"}
            onclick={handleBuyCourse}
            />
    
    </div>
  )
}

export default RenderTotalAmount