import React from 'react'

const HighLightContext = ({children}) => {
  return (
    <span  className='text-3xl font-bold text-blue-200'>
        {children}
    </span>
  )
}

export default HighLightContext