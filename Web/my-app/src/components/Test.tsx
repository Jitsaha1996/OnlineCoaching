import React, { useState } from 'react'

export const Test = () => {
    const [val,setVal]=useState(0)
    const increment=()=>{ setVal(prev=>prev+1)
        setVal(prev=>prev+1)
        setVal(prev=>prev+1)
    }
    const dec=()=>{ setVal(val-1)}

  return (
    <>
     <div>Test</div>
     <div><button onClick={increment}>Add</button>
     <button onClick={dec}>Dec</button></div>
     
     <div>{val}</div>
    </>
   
  )
}
