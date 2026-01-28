import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        {/* left side */}
        <div></div>
        {/* right side */}
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout