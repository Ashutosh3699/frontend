// createSlice
import { createSlice } from "@reduxjs/toolkit";
// courseSlice

const initialState = {
    step: 1,
    paymentLoading: false,
    course: null,
    editCourse: false,
    
};

export const courseSlice = createSlice({

    name: "course",
    initialState:initialState,
    reducers:  {
       setStep:(state,action)=> {
            state.step = action.payload;
       },
       setCourse:(state,action)=>{
        state.course = action.payload;
       },
       setEditCourse: (state,action)=>{
            state.editCourse = action.payload;
       },
       setPaymentLoading: (state,action)=>{
            state.paymentLoading = action.payload;
       },
       resetCourseState: (state)=>{
        state.course = null;
        state.step=1;
        state.editCourse = false;
       }

    }
})

export const {
    setStep,
    setCourse,
    setEditCourse,
    setPaymentLoading,
    resetCourseState,
  } = courseSlice.actions
export default courseSlice.reducer