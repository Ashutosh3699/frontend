import React from 'react'
import { useSelector } from 'react-redux';
import RenderTotalAmount from './RenderTotalAmount';
import RenderCartCourse from './RenderCartCourse';

const Cart = () => {

    const {totalItems,total} = useSelector((state)=>state.cart);

  return (
    <div>

        <h2>My Wishlist</h2>
        <p>{totalItems} courses in cart</p>

        {
            total > 0 ? (
                <div>
                    <RenderCartCourse/>
                    <RenderTotalAmount/>
                </div>
            ) : (
                <h3>No courses in the cart</h3>
            )
        }


    
    
    </div>
  )
}

export default Cart