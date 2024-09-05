import React from 'react'
import CTAbutton from '../HomePage/CTAbutton'

const ResetComplete = () => {
  return (
    <div className='flex flex-col bg-richblack-900 text-richblack-5 gap-3  items-center justify-center w-full h-screen'>

        <h3>
            Reset complete!
        </h3>
        <p>
            All done! We have sent an email to  ***********@gmail.com to confirm
        </p>
        <CTAbutton  active={true} linkto={"/login"}>
            Return to login
        </CTAbutton>
    </div>
  )
}

export default ResetComplete