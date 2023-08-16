import React from 'react'

export default function CategoryName({children,title,bgimg}) {
  return (
    <div>
        <h3 className='ps-2 text-capitalize'>{title}</h3>
        {children}
    </div>
  )
}
