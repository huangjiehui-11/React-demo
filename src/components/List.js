import React from 'react';

// we're using an arrow function and const variable type, a ES6 features

const List = (props) => {   
  const list = props.listItems.map((el, i) => {
    console.log('reRender') // 用来判断父组件的state发生变化时，子组件是否会整个都全部重新更新渲染
    return (
      <li key={i}>
        <span
          style={
            el.done
            ? {textDecoration: 'line-through', fontSize: '20px'}
            : {textDecoration: 'none', fontSize: '20px'}
          }
          onClick={props.onListItemClick.bind(this, i)}  // 记得使用bind绑定自身作用域
          // onClick={() => props.onListItemClick(i)}    // 使用箭头函数也可以
        >
          {el.item}
        </span>
        <button className="btn btn-danger" onClick={props.deleteListItem.bind(this, i)}>
          x
        </button>
      </li>
    )
  })

  return (
    <div>
      <h2>List：</h2>
      <ul>
        {list}
      </ul>
      <h4>子组件的count：（父组件的state改变，子组件会更新渲染）（点击下面react的class指针里的按钮）{props.count}</h4>
    </div>
  )
};

export default List;