import React from 'react';
import HighLightContext from '../Components/core/HomePage/HighLightContext';
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import image4 from "../assets/Images/FoundingStory.png";
import AboutusSection3 from "../Components/core/AboutUs/AboutusSection3";
import LearningAbout from '../Components/core/AboutUs/LearningAbout';
import ContactUsForm from '../Components/common/ContactUsForm';
import Footer from "../Components/common/footer/Footer"

const AboutUs = () => {
  return (
    <>
         <div className='w-full bg-richblack-900 pb-20'>
            
            {/* section1 */}
        
            <div className='w-full mx-auto flex flex-col pt-16 bg-richblack-800 items-center gap-8 relative pb-[250px]' >
                <h2 className=' text-lg  font-semibold text-richblack-100'>About Us</h2>
                <h3  className='flex flex-col text-center items-center  text-2xl  font-extrabold text-richblack-100'>
                Driving Innovation in Online Education for a 
                <span>
                    <HighLightContext> Brighter Future </HighLightContext>
                </span>
                </h3>

                <p className='lg:w-[60%] mx-auto text-center text-richblack-300 font-edu-sa  text-md'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, 
                leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>

                <div className='flex flex-row items-center justify-center gap-5 w-11/12 mx-auto absolute -bottom-32'>
                    <img  src={image1} alt='image1' />
                    <img  src={image2} alt='image2' />
                    <img  src={image3} alt='image3' />
                </div>
            </div>

            {/* section2 */}

            <div className='w-full mx-auto flex flex-col pt-16 bg-richblack-900 items-center gap-32  mb-10'>

                <blockquote className='text-3xl font-semibold font-inter text-center w-[70%] mx-auto  text-richblack-50 lg: mt-32'>
                    We are passionate about revolutionizing the way we learn. 
                    Our innovative platform combines technology, expertise, and <span><HighLightContext>community to create</HighLightContext>
                    </span> an unparalleled educational experience.
                </blockquote>

                <div className='flex flex-row  w-[70%] mx-auto items-center justify-between gap-10'>

                <div className='flex flex-col gap-4'>
                        <h3 className='text-2xl  text-blue-100  font-bold'> Our Founding Story </h3>
                    
                    <section className='flex flex-col gap-2 text-richblack-50  font-edu-sa'>
                        <p >
                            Our e-learning platform was born out of a shared vision and passion for transforming education. 
                            It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, 
                            flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>

                            <p>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. 
                            We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. 
                            We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                    </section>
                </div>

                <img src={image4} alt='image4'   />
                </div>


                <div className='w-[65%] mx-auto flex flex-row justify-between gap-10 items-center'>
                    
                    <div className='flex flex-col items-start gap-5'>
                        <h3 className='text-xl  text-blue-100  font-bold'>Our Vision</h3>
                        <p className='text-richblack-50  font-edu-sa text-md'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. 
                        Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge 
                        technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    <div className='flex flex-col items-start gap-5'>
                        <h3 className='text-xl  text-blue-100  font-bold'>Our Mission</h3>
                        <p className='text-richblack-50  font-edu-sa text-md'>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals
                        can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, 
                        and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>

                </div>

            </div>

            <div className='w-full  bg-richblack-800'>
                <AboutusSection3/>
            </div>
            
            <LearningAbout/>
        

            <div  className='mt-32 w-[75%] mx-auto text-white flex flex-col py-10 border border-richblack-400 rounded-lg items-center
            gap-6'>

                <h3 className='font-bold text-4xl text-richblack-100 font-inter'>Get to touch</h3>
                <p className='font-medium text-xl text-richblack-5 font-inter'>We’d love to here for you, Please fill out this form.</p>

                <ContactUsForm/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default AboutUs