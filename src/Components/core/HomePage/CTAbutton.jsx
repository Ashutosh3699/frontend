import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({children, active, linkto}) => {
  return (
    <div>

        <Link  to={linkto}>
            <div className={`px-5  py-2  rounded-md font-semibold  hover:scale-95 transition-all duration-300 
                drop-shadow-[0_1px_10px_rgba(255,255,255,0.5)]
             ${active ? "bg-[#FFD60A]  text-black" : "bg-richblack-600  text-white"}`}>
                {children}
            </div>
        </Link>

    </div>
  )
}

export default CTAbutton