import React from 'react'

const IconBtn = ({text,children,type,disabled=false,outline,onclick,customCLass }) => {
  return (
    <button
    type={type}
    disabled={disabled}
    onClick = {onclick}
    className={customCLass}
    >
        {
          children ? (<div>
            <div>{text}</div>
             {children}
          </div>) :(text)
        }
    </button>
  )
}

export default IconBtn