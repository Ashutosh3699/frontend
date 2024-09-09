import React from 'react'
import SideBar from '../Components/core/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='w-full bg-richblack-900'>

        <div className='relative flex h-screen'>
            <SideBar/>

            <div className='w-11/12 mx-auto  max-w-[1000px] py-10'>
                {/* section / outlet */}
                <Outlet/>
            </div>

        </div>
    
    </div>
  )
}

export default Dashboard