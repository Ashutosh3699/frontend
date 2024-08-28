import React from 'react'
import { Link } from 'react-router-dom';
import studyLogo1 from "../../../assets/Logo/Logo-Full-Light.png";
import { PiYoutubeLogoDuotone } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FooterLink2 } from '../../../data/footer-links';

const Footer = () => {
  return (
    <div className='w-full  bg-richblack-700 py-6  '>

        <div  className='w-9/12  flex flex-col  mx-auto '>

            <div  className='flex gap-x-10 items-start justify-between '>
                {/* main content of the footer */}
                <div  className='flex gap-x-10 items-start '>

                    <div className='flex flex-col  items-start  gap-1  text-richblack-300  text-sm font-medium' >

                        <Link  to={"/"}>
                            <img  src={studyLogo1}  alt='logo1' loading='lazy' />
                        </Link>

                        <h3 className='text-lg font-semibold  mt-2  text-richblack-100 '>Company</h3>
                        <p className=' cursor-pointer hover:underline'>About</p>
                        <p className=' cursor-pointer  hover:underline'>Careers</p>
                        <p className=' cursor-pointer  hover:underline'>Affiliates</p>

                        <div className='flex flex-row gap-3 text-lg  items-center mt-3'>
                            <PiYoutubeLogoDuotone className='text-3xl  cursor-pointer' />
                            <FcGoogle className='text-2xl cursor-pointer' />
                            <FaFacebook  className='text-2xl cursor-pointer' />
                            <FaXTwitter  className='text-2xl cursor-pointer'  />

                        </div>
                    </div>

                    <div className='flex flex-col  items-start  justify-between  gap-3'>

                        <div className='flex flex-col  items-start  justify-between  gap-1  text-richblack-300  text-sm font-medium'>
                            <h3 className='text-lg font-semibold  mt-2  text-richblack-100 '>Resources</h3>
                            <p className=' cursor-pointer  hover:underline'>Article</p>
                            <p className=' cursor-pointer  hover:underline'>Blogs</p>
                            <p className=' cursor-pointer hover:underline'>Chart Sheet</p>
                            <p className=' cursor-pointer hover:underline'>Code Challenge</p>
                            <p className=' cursor-pointer hover:underline'>Docs</p>
                            <p className=' cursor-pointer hover:underline'>Videos</p>
                            <p className=' cursor-pointer hover:underline'>Projects</p>
                            <p className=' cursor-pointer hover:underline'>Works Space</p>

                        </div>

                        <div className='flex flex-col  items-start  justify-between  gap-1  text-richblack-300  text-sm font-medium'>
                            <h3 className='text-lg font-semibold  mt-2  text-richblack-100 '>Support</h3>
                            <p className=' cursor-pointer hover:underline'>Help</p>

                        </div>
                    </div>

                    <div className='flex flex-col  items-start  justify-between  gap-3'>

                        <div className='flex flex-col  items-start  justify-between  gap-1  text-richblack-300  text-sm font-medium'>
                            <h3 className='text-lg font-semibold  mt-2  text-richblack-100 '>Plans</h3>
                            <p className=' cursor-pointer hover:underline'>Paid memberships</p>
                            <p className=' cursor-pointer hover:underline'>For Student</p>
                            <p className=' cursor-pointer hover:underline'>Business Solutions</p>

                        </div>

                        <div className='flex flex-col  items-start  justify-between  gap-1  text-richblack-300  text-sm font-medium'>
                            <h3 className='text-lg font-semibold  mt-2  text-richblack-100 '>Communtiy</h3>
                            <p className=' cursor-pointer hover:underline'>Forums</p>
                            <p className=' cursor-pointer hover:underline'>Chanpters</p>
                            <p className=' cursor-pointer hover:underline'>Events</p>

                        </div>
                    </div>

                </div>
                

                <div className='  flex gap-x-10 items-start'>

                    {
                        FooterLink2.map((items)=>{
                            return <div  key={items.title} className='flex flex-col  items-start
                              justify-between  gap-1  text-richblack-300  text-sm font-medium'>

                            <h3 className='text-lg font-semibold  mt-2  text-richblack-100 '>{items.title}</h3>

                            {
                                items.links.map((items)=>{
                                    return <Link key={items.title}  to={items.link} className=' hover:underline'>
                                         {items.title}
                                    </Link>
                                })
                            }

                            </div>
                        })
                    }

                </div>

            </div>

            <div  className='h-[1px]  w-[100%]  mx-auto bg-richblack-100 mt-6'></div>

            <div  className='w-full flex justify-between  items-center mt-4'>
                 
                 <div className='flex gap-4  items-center  text-richblack-100  text-sm  font-semibold'>
                        <Link to={"/"}>
                            Privacy Policy
                        </Link>
                        <Link to={"/"}>
                            Customer policy
                        </Link>
                        <Link to={"/"}>
                           Terms
                        </Link>
                 </div>
                 <div className=' text-richblack-100  text-sm  font-semibold'>
                    Made by, Ashutosh Bishoi @ 2024
                 </div>
            </div>

        </div>
    
    
    </div>
  )
}

export default Footer