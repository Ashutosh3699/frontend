import React from 'react'
import CTAbutton from './CTAbutton';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, codecolor, bgGradient }) => {
  return (
    <div  className={`flex ${position} gap-2 my-20  justify-between`}>
    
        {/* section 1 of content */}
        <div  className='flex flex-col  gap-8  w-[50%]'>
            
            {heading}
            <div className=' text-richblack-400  font-bold'>
                {subheading}
            </div>

            <div  className='flex mt-4 gap-4'>
                <CTAbutton  active={ctabtn1.active} linkto={ctabtn1.linkto} >
                   <div className='flex gap-1 items-center'>
                        {ctabtn1.content}
                        <FaArrowRight />
                   </div>
                </CTAbutton>

                <CTAbutton  active={ctabtn2.active} linkto={ctabtn2.linkto} >
                    {ctabtn2.content}
                </CTAbutton>

            </div>
        </div>

        {/* type-animation of codeblock */}
        <div  className='flex flex-row  h-fit text-md w-[48%]  py-3 '
        style={
            {
                background: bgGradient
            }
        }
        >
            {/* background gradient */}
            <div  className='text-center flex flex-col  font-inter  text-richblack-300  font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>

            <div  className={`${codecolor}  w-[90%]  flex flex-col  gap-2  font-bold  font-mono pr-2`}>
            <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                omitDeletionAnimation={true}
                cursor={true}
                speed={50}
                style={{
                    whiteSpace: "pre-line",
                    display: "block"
                }}
            />
            </div>

        </div>


    </div>
  )
}

export default CodeBlock