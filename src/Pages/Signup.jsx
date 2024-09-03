import React from 'react';
import signupImg from "../assets/Images/signup.webp";
import Template from '../Components/core/AuthTemplate/Template';
import Footer from '../Components/common/footer/Footer'

const Signup = ({setIsLoggedIn}) => {
  return (
    <div  className=' bg-richblack-900  w-full h-full  pt-16  pb-8'>
        <Template
          title="Welcome Back"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          image={signupImg}
          formType="signup"
        />

        <Footer/>
    </div>
  )
}

export default Signup