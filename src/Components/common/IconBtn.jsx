import React from 'react'

const IconBtn = ({text,children,type,disabled=false,outline,onclick,customCLass }) => {
  return (
    <button
     disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        }  ${customCLass}`}
        type={type}
    >
        {
          children ? (<div className='flex flex-row gap-3 items-center'>
            <div>{text}</div>
             {children}
          </div>) :(text)
        }
    </button>
  )
}

export default IconBtn