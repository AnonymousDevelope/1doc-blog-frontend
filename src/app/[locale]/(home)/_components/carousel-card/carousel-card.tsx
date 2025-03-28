import React from 'react'

const CarouselCard= ({children}:{
children:React.ReactNode
}) => {
  return (
    <div className='w-full h-[200px] bg-card shadow-md flex items-center justify-center'>
        {children}
    </div>
  )
}

export default CarouselCard