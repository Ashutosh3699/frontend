import React from 'react'

const AboutusSection3 = () => {

    const dataSection = [
        {
            number: "5K",
            desc: "Active Students",
        },
        {
            number: "10+",
            desc: "Mentors",
        },
        {
            number: "200+",
            desc: "Courses",
        },
        {
            number: "50+",
            desc: "Awards",
        },

    ]

  return (
    <div className='py-16 w-[75%]  mx-auto  flex flex-row justify-around items-center'>
        
        {
            dataSection.map((item,index) =>{
                return (
                    <div className='flex flex-col gap-1 items-center'  key={index}>
                        <h4 className='text-4xl text-richblack-50 font-bold'>{item.number}</h4>
                        <p className='text-xl font-medium text-richblack-500'>{item.desc}</p>
                    </div>
                )
            })
        }
    
    </div>
  )
}

export default AboutusSection3