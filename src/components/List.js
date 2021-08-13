import React from 'react';

// we're using an arrow function and const variable type, a ES6 features

const List = (props) => {   
  const list = props.listItems.map((el, i) => {
    return (
      <li key={i}><h2>{el}</h2></li>
    )
  })

  return (
    <div>
      <ul>
        {list}
      </ul>
    </div>
  )
};

export default List;