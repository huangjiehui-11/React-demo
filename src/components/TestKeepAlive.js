import React, { useState }from 'react'
import KeepAlive, { AliveScope } from 'react-activation'

function TestKeepAlive() {
  const [count, setCount] = useState(0)

  return (
    <div>
      count: {count}
      <button onClick={() => {setCount(count )}}></button>
    </div>
  )
}