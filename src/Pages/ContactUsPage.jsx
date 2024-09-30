import React from 'react'
import Footer from '../Components/common/footer/Footer';
import { IoIosChatboxes } from "react-icons/io";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";
import ContactUsForm from '../Components/common/ContactUsForm';
import ReviewSlider from '../Components/common/ReviewSlider';


const ContactUsPage = () => {
  return (
   <>
     <div className='w-full bg-richblack-900 '>

        <div className='w-10/12  mx-auto flex flex-row gap-3  items-start py-10'> 

            <section className='px-20 py-8 bg-richblack-800  rounded-xl flex flex-col gap-10'>

                <div className='flex flex-col gap-3 items-start'>
                    <div className='text-xl text-richblack-25 font-bold  flex flex-row gap-5'>
                         <IoIosChatboxes />
                        <h3> Chat on us</h3>
                    </div>

                   <div className='flex flex-col gap-1  text-richblack-200 font-medium' >
                     <p>Our friendly team is here to help.</p>
                     <p>@mail address</p>
                   </div>
                </div>

                <div className='flex flex-col gap-3 items-start'>
                    <div className='text-xl text-richblack-25 font-bold  flex flex-row gap-5'>
                    <BsGlobeCentralSouthAsia />
                        <h3> Visit us</h3>
                    </div>

                   <div className='flex flex-col gap-1  text-richblack-200 font-medium' >
                     <p>Come and say hello at our office HQ.</p>
                     <p>Here is the location/ address</p>
                   </div>
                </div>

                <div className='flex flex-col gap-3 items-start'>
                    <div className='text-xl text-richblack-25 font-bold  flex flex-row gap-5'>
                    <IoCallSharp />
                        <h3> Call us</h3>
                    </div>

                   <div className='flex flex-col gap-1  text-richblack-200 font-medium' >
                     <p>Mon - Fri From 8am to 5pm.</p>
                     <p>+123 456 7890</p>
                   </div>
                </div>

            </section>

            <div  className='  mx-auto text-white flex flex-col py-10  border border-richblack-400 rounded-lg items-center
            gap-6 px-10'>

                <h3 className='font-bold text-3xl text-blue-100 font-inter lg:w-[500px] mx-auto  text-center'>Got a Idea? We’ve got the skills. Let’s team up</h3>
                <p className='font-medium text-md text-richblack-300  font-edu-sa'>Tall us more about yourself and what you’re got in mind.</p>

                <ContactUsForm/>
            </div>

        </div>

        
     <div className="relative mx-auto py-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        <ReviewSlider />
      </div>
     </div>


        <Footer/>
   </>
  )
}

export default ContactUsPage