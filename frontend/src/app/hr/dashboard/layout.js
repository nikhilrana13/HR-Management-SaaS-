import React from 'react'

const layout = ({children}) => {
    
  return (
    <div className='flex'>
        {/* left side */}
        <div>
            side bar
        </div>
        {/* right side */}
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout