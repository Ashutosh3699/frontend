import React from 'react';
import image1 from "../../../assets/TimeLineLogo/Logo1.svg";
import image2 from "../../../assets/TimeLineLogo/Logo2.svg";
import image3 from "../../../assets/TimeLineLogo/Logo3.svg";
import image4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

const PathFollower = () => {

    const TimeLine = [
        {
            image: image1,
            heading: "Leadership",
            subHeading: "Fully committed to the success company"
        },
        {
            image: image2,
            heading: "Responsibility",
            subHeading: "Students will always be our top priority"
        },
        {
            image: image3,
            heading: "Flexibility",
            subHeading: "The ability to switch is an important skills"
        },
        {
            image: image4,
            heading: "Solve the problem",
            subHeading: "Code your way to a solution"
        }
    ]

  return (
    <div className='w-[85%]  flex flex-row gap-4 items-center mx-auto  lg:my-16 '>

        <div  className='flex flex-col  gap-4  w-[40%]'>
            {
                TimeLine.map((item,index)=>{

                    return (<div className='flex flex-row  gap-8 items-start'  key={index}>
                        
                        <div className='flex flex-col  items-center'>
                            <div className='p-5  rounded-full shadow-xl flex justify-center items-center'>
                                    <img src={item.image}  alt={item.image} />        
                            </div>
                            {
                                index!==3 ? (<div className='flex flex-col  text-richblack-200'>
                                    <div className='h-1 '>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                    <div className='h-1'>.</div>
                                </div>): (<div></div>)
                            }
                        </div>
                        

                            <div  className='flex flex-col gap-2'>
                                
                                <h3  className=' font-bold  text-richblack-600 text-lg'>{item.heading}</h3>
                                <p  className='text-sm'>{item.subHeading}</p>

                            </div>

                       

                    </div>)
                })
            }

        </div>

        <div className='relative'>
            
            <div className='w-[100%] drop-shadow-[20px_20px_0px_rgba(255,255,255,5)]'>
                <img    src={TimeLineImage}  className='w-full'/>
            </div>

            <div  className=' absolute  -bottom-[10%] left-[13%]   bg-caribbeangreen-300  text-richblack-50 flex gap-3 py-4 px-6  w-[75%]'>

                <div className='flex gap-4 border-r-2 border-caribbeangreen-100  px-4  font-inter  items-center'>
                    <h3 className=' text-caribbeangreen-50  text-3xl '>10</h3>
                    <p className='uppercase text-caribbeangreen-50 text-md w-[50%]'>Years experience</p>
                </div>

                <div className='flex gap-4   px-4  font-inter  items-center'>
                    <h3 className=' text-caribbeangreen-50  text-3xl '>250</h3>
                    <p className='uppercase text-caribbeangreen-50 text-md w-[50%] '>Types of courses</p>
                </div>

            </div>

        </div>
    

    </div>
  )
}

export default PathFollower