import React from 'react';
import {useState, useEffect} from 'react'

function RadioInput(props) {
  const [values, setValue] = useState('xxx')

  const handleValue = (value) => {
    console.log(value)
    props.callback(value)
  }

  return (
    <div>
      <div >
        <input type="radio" name='number' value="1" onChange={(e)=>{handleValue(e.target.value)}}/>1
        <input type="radio" name='number' value="2" onChange={(e) => {props.callback(e.target.value)}}/>2
        <input type="radio" name='number' value="3" onChange={(e) => {props.callback(e.target.value)}}/>3
      </div>
    </div>
  )
}
        
export default RadioInput