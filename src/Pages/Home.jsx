import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighLightContext from '../Components/core/HomePage/HighLightContext';
import CTAbutton from '../Components/core/HomePage/CTAbutton';
import video1 from "../assets/Images/banner.mp4";
import CodeBlock from '../Components/core/HomePage/CodeBlock';
import Footer from '../Components/core/footer/Footer';

const Home = () => {
  return (
    <div>

        {/* section 1 of homepage */}
        <div className=' bg-richblack-900  w-full h-full  pt-16  pb-8'>

            <div  className='mx-auto w-11/12 flex flex-col  items-center gap-y-6 '>

                {/* section of button 1 */}
                <Link  to={"/signup"}>
                    <div className='px-6  py-2  bg-richblack-700  rounded-full  hover:scale-95  transition-all  duration-200  
                    w-fit drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)]'>
                            <div className='flex gap-1  text-richblack-300  font-bold  text-center  items-center'>
                                <p  className=' text-lg'>Become an instructor</p>
                                <FaArrowRight />
                            </div>
                    </div>
                </Link>

                <div className='flex flex-row  gap-2'>
                    <p className='text-3xl  font-bold  text-white' > Empower Your Future with </p>
                    <HighLightContext>
                        Coding Skills
                    </HighLightContext>
                </div>

                <div  className='font-semibold  text-richblack-400  w-[60%]  mx-auto  text-center'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, 
                    including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className='flex flex-row gap-4 '>
                    <CTAbutton  active={true} linkto={"/signup"} >Learn More</CTAbutton>
                    <CTAbutton  active={false} linkto={"/login"} >Book a demo</CTAbutton>
                </div>

                <div className='w-[65%]  mx-auto lg:mt-8  drop-shadow-[20px_20px_0px_rgba(255,255,255,5)] '>
                    <video
                    autoPlay
                    muted
                    loop
                    className='rounded-md  drop-shadow-[-5px_-5px_10px_rgba(105,247,255,1)]'
                    >
                        <source  src={video1}  type="video/mp4"  />
                    </video>
                </div>
                
                <div className='xl:w-[65%]  mx-auto w-[90%]'>

                    <CodeBlock  
                        position={"flex-row"}
                        heading={<div className='text-4xl font-semibold text-white'>
                            Unlock your <HighLightContext>coding potential </HighLightContext>
                            with our online courses.
                        </div>}
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                content: "Try It Yourself",
                                active:true,
                                linkto: "/signup"
                            }
                        }
                        ctabtn2={
                            {
                                content: "Learn More",
                                active:false,
                                linkto: "/login"
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html>\n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n <body>
                            <h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>  `} 
                        codecolor={"text-yellow-25"} 
                        bgGradient={"radial-gradient(circle, rgba(36,158,184,1) 0%, rgba(0,0,0,1) 100%)"}
                    />

                    <CodeBlock  
                        position={"flex-row-reverse"}
                        heading={<div className='text-4xl font-semibold text-white'>
                            Start <HighLightContext>coding 
                            in seconds</HighLightContext>
                        </div>}
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                content: "Continue Lesson",
                                active:true,
                                linkto: "/signup"
                            }
                        }
                        ctabtn2={
                            {
                                content: "Learn More",
                                active:false,
                                linkto: "/login"
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html>\n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n <body>
                            <h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>  `} 
                        codecolor={"text-yellow-25"} 
                        bgGradient={"radial-gradient(circle, rgba(146,184,36,1) 0%, rgba(0,0,0,1) 100%)"}
                    />
                </div>

            </div>

        </div>

        {/* section 2 of homepage */}

        {/* section 3 of homepage */}
        
        <Footer/>
    
    </div>
  )
}

export default Home