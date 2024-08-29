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

        <div  className='flex flex-row  items-center justify-between '>
            <img  src={image2}  alt='know your progress' className=' object-contain  ' />

            <img  src={image1} alt='know your progress'  className=' object-contain  -ml-32'/>

            <img  src={image3} alt='know your progress'  className=' object-contain  -ml-36'/>
        </div>

        <div >
            <CTAbutton  active={true}  linkto={"/signup"}>
                Learn More
            </CTAbutton>
        </div>
    </div>
  )
}

export default LearnAnyLanguage