import React from 'react'
import Template from '../Components/core/AuthTemplate/Template'
import loginImg from "../assets/Images/login.webp"
import Footer from '../Components/core/footer/Footer'

const Login = ({setIsLoggedIn}) => {
  return (
    <div  className=' bg-richblack-900  w-full h-full pt-8'>
        <Template
          title="Welcome Back"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          image={loginImg}
          formType="login"
          setIsLoggedIn={setIsLoggedIn}
        />

        <Footer/>
    </div>
  )
}

export default Login