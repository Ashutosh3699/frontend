import React from 'react';
import HighLightContext from '../HomePage/HighLightContext';
import CTAbutton from '../HomePage/CTAbutton';


const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningAbout = () => {

  return (
    <div
    className='  text-richblack-50 grid  grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit mt-16'
    >

      {
        LearningGridArray.map((item,index)=>{
          return(<div 
          key={index}
          className={`${index === 0 && " lg:col-span-2  p-5 "}  
                    ${index===3 && " lg:col-start-2"}
                    ${item.order%2===0 ? ("bg-richblack-700") : ("bg-richblack-800")}
                    ${index===0 && "bg-richblack-900"}  mx-auto
                  
          `}>

            {
              item.order<0 ? (
                <div className=' flex flex-col pb-5 gap-3 h-[280px] w-[500px] '>
                  <h3  className='text-4xl font-semibold'>
                    {item.heading}
                    <HighLightContext>{item.highlightText}</HighLightContext>
                  </h3>
                  <p className='font-medium'>
                      {item.description}
                  </p>
                  <div className='w-fit mt-4'>
                      <CTAbutton active={true} linkto={item.BtnLink}>
                          {item.BtnText}
                      </CTAbutton>
                  </div>
                </div>
              ): 
              (
                <div className='flex flex-col gap-8 p-7 h-[280px]  w-[350px]'>
                        <h1 className='text-richblack-5 text-2xl'>
                            {item.heading}
                        </h1>
                        <p className='text-richblack-300 font-medium'>
                            {item.description}
                        </p>
                    </div>
              )
            }

          </div>)
        })
      }
    
    </div>
  )
}

export default LearningAbout