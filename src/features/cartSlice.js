// createSlice
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
// cartslice

const initialState = {
    totalItems:  localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    carts: [{id: 1,
        courseName: "AI",
        price: 234
    }]
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

            const card = {
                id: nanoid(),
                name: action.payload.name,
                price: action.payload.price,
            }

            state.carts.push(card);
        },
        // removecard
        removeCard: (state, action) =>{

           state.carts =  state.carts.filter((item) => item.id !== action.payload);
        },
        // resetcard
        resetCart: (state,action) =>{
            state.carts = [];
        }
    }
})

export const {setNumberItems, addItems, removeCard, resetCart} = cartslice.actions;
export default cartslice.reducer