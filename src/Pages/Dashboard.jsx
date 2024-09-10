import React from 'react'
import SideBar from '../Components/core/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='w-full bg-richblack-900'>

        <div className='relative flex  flex-row w-full  items-start  max-h-full'>
            <SideBar/>

            <div className='w-full mx-auto max-w-6xl py-10'>
                {/* section / outlet */}
                <Outlet/>
            </div>

        </div>
    
    </div>
  )
}

export default Dashboard