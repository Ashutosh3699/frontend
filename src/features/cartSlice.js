// createSlice
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// cartslice

const initialState = {
    totalItems:  localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    carts: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};

export const cartslice = createSlice({

    name: "cart",
    initialState:initialState,
    reducers:  {
        setNumberItems: (state, action)=>{
            state.totalItems = action.payload;
        },

        // addcard
        addItems: (state, action) =>{

            const course = action.payload;
            const index = state.carts.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                // If the course is already in the cart, do not modify the quantity
                toast.error("Course already in cart")
                return
              }

            state.carts.push(course);

            // Update the total quantity and price
            state.totalItems++
            state.total += course.price
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.carts))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart")
        },
        // removecard
        removeCard: (state, action) =>{

            const courseId = action.payload
            const index = state.carts.findIndex((item) => item._id === courseId)
      
            if (index >= 0) {
              // If the course is found in the cart, remove it
              state.totalItems--
              state.total -= state.carts[index].price
              state.carts.splice(index, 1)
              // Update to localstorage
              localStorage.setItem("cart", JSON.stringify(state.carts))
              localStorage.setItem("total", JSON.stringify(state.total))
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
              // show toast
              toast.success("Course removed from cart")
            }
        },
        // resetcard
        resetCart: (state,action) =>{
            state.carts = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})

export const {setNumberItems, addItems, removeCard, resetCart} = cartslice.actions;
export default cartslice.reducer