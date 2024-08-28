import React from 'react'
import HighLightContext from './HighLightContext';
import image1 from "../../../assets/Images/Compare_with_others.png";
import image2 from "../../../assets/Images/Know_your_progress.png";
import image3 from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from './CTAbutton';

const LearnAnyLanguage = () => {
  return (
    <div className='w-[85%]  flex flex-col gap-8 items-center mx-auto  lg:mt-32 '>
    
      <div className='w-full  space-y-3'>
        <div  className='w-[60%]  mx-auto  text-3xl  font-bold  text-center'>
            Your swiss knife for<span> </span> <HighLightContext>learning any language</HighLightContext>
            </div>
            <div  className='w-[60%] mx-auto text-center'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
      </div>

        <div  className='flex flex-row  relative justify-between  w-[90%]  mx-auto  mt-10'>

            <div className='w-[100%] '>
                <img  src={image2}  />
            </div>
            <div className=' w-[100%]  absolute   left-[30%]  -top-[10%]'>
                <img  src={image1}  />
            </div>
            <div  className=' z-10  w-[100%] absolute   left-[65%] -top-[10%] '>
                <img  src={image3}  />
            </div>

        </div>

        <div className='mt-16 '>
            <CTAbutton  active={true}  linkto={"/signup"}>
                Learn More
            </CTAbutton>
        </div>
    </div>
  )
}

export default LearnAnyLanguage