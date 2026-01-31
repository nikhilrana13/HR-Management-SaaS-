import React, { useEffect, useState } from 'react'

const useDebounce = (value,delay=500) => {
     const [debounceValue,setDebounceValue] = useState(value)

     useEffect(()=>{
        const handler = setTimeout(() => setDebounceValue(value),delay);
        // clean timeout 
        return (()=>clearTimeout(handler))
     },[value,delay])
  return debounceValue;
}

export default useDebounce