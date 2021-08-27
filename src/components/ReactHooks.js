import React, { useState, useMemo, useReducer, useRef, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';

// useImperativeHandle
// 子组件可以选择性的暴露给父组件一些方法，这样可以隐藏一些私有方法和属性。
// 官方建议，useImperativeHandle应当与 forwardRef 一起使用
function Kun (props, ref) {
  const kun = useRef()

  const introduce = useCallback (() => {
    console.log('i can sing, jump, rap, play basketball')
  }, [])

  useImperativeHandle(ref, () => ({
    introduce: () => {
      introduce()
    }
  }));

  return (
    <div ref={kun}> { props.count }</div>
  )
}

const KunKun = forwardRef(Kun)

// 自定义Hook
// 自定义 Hook，可以将组件逻辑提取到可重用的函数中，来解决逻辑难以复用问题
function useWidth (defaultWidth) {
  const [ width, setWidth ] = useState(defaultWidth)

  const onChange = () => {
    setWidth(document.body.clientWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', onChange, false)

    return () => {
      window.removeEventListener('resize', onChange, false)
    }
  }, [])

  return width
}


function ReactHooks () {

  // useState
  // useState定义的都是变量，只能通过数组里对应的方法来进行修改，不能通过其他useState里的方法；反之，本身的方法也不能修改其他useState定义的变量
  // 注意：函数组件没有state，区分类组件，useState定义都只是变量，所以这里的state.count其实拿的是useReducer定义的state对象里的count属性，但因为没有这个属性，所以为undefined
  const [count0, setCount0] = useState(0)

  // useEffect
  // 第二个参数：
  // 1、什么都不传，组件每次 render 之后 useEffect 都会调用，相当于 componentDidMount 和 componentDidUpdate
  // 2、传入一个空数组 [], 只会调用一次，相当于 componentDidMount 和 componentWillUnmount
  // 3、传入一个数组，其中包括变量，只有这些变量变动时，useEffect 才会执行
  const [ width, setWidth ] = useState(document.body.clientWidth)

  const onChange = () => {
    setWidth(document.body.clientWidth)
  }

  useEffect(() => {
    // 相当于 componentDidMount
    console.log('add resize event')
    window.addEventListener('resize', onChange, false)

    // 相当于 componentWillUnmount
    return () => {
      window.removeEventListener('resize', onChange, false)
    }
  }, [])

  // useMemo 
  // 与 Vue 的computed 计算属性类似，都是根据依赖的值计算出结果，当依赖的值未发生改变的时候，不触发状态改变
  // useMemo 会在渲染的时候执行，而不是渲染之后执行，这一点和 useEffect 有区别，所以 useMemo 不建议有 副作用相关的逻辑
  const [ count, setCount ] = useState(0)  // useState设置的变量count只能通过setCount方法来改变

  const add = useMemo(() => {
    return count + 1
  }, [count])

  // useReducer
  // 它更适合一些逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等等的特定场景
  // userReducer有三个参数：函数参数、初始state、惰性初始化
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        console.log(count);
        return {count1: state.count1 + 1};
      case 'decrement':
        console.log(state.count1);
        return {count1: state.count1 - 1};
      default:
        throw new Error();
    }
  }

  // 定义了state变量，是一个对象，{count1: 0}，注意区分类组件里的state
  const [state, dispatch] = useReducer(reducer, {
    count1: 0
  });

  // useImperativeHandle
  const [ count2, setCount2 ] = useState(0)  // 注意定义state新的变量，避免与其他的hook里state的相同变量相互影响

  const kunRef = useRef(null)

  const onClick = useCallback (() => {
    setCount2(count2 => count2 + 1)
    kunRef.current.introduce()
  }, [])

  // 自定义Hook 必须以use开头
  const Width = useWidth(document.body.clientWidth)

  return (
    <div>
      <p>useState：</p>
      count0：{count0}
      <button onClick={() => { setCount0(count0 + 1)}}>点我</button>
      {/* useState定义的都是变量，只能通过数组里对应的方法来进行修改，不能通过其他useState里的方法； */}
      <button onClick={() => { setCount(count0 + 1)}}>点我</button>
      {/* 反之，本身的方法也不能修改其他useState定义的变量 */}
      <button onClick={() => { setCount0(count + 1)}}>点我</button>
      <br/>
      {/* 注意：函数组件没有state，区分类组件，useState定义都只是变量，所以这里的state.count其实拿的是useReducer定义的state对象里的count属性，但因为没有这个属性，所以为undefined */}
      state.count：{state.count}
      <hr/>
      <p>useEffect：</p>
      width：{width}
      <hr/>
      <p>useMemo：</p>
      {/* useState定义的都是变量，只能通过数组里对应的方法来进行修改，不能通过其他useState里的方法；反之，本身的方法也不能修改其他useState定义的变量 */}
      点击次数: { count }
      {/* 注意：函数组件没有state，区分类组件，useState定义都只是变量，所以这里的state.count其实拿的是useReducer定义的state对象里的count属性，但因为没有这个属性，所以为undefined */}
      {/* 点击次数: { state.count } */}
      <br/>
      次数加一: { add }
      <button onClick={() => { setCount(count + 1)}}>点我</button>
      <hr/>
      <p>userReducer：</p>
      点击次数: {state.count1}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <hr/>
      <p>useImperativeHandle：</p>
      点击次数: { count2 }
      <KunKun ref={kunRef}  count={count2}></KunKun>
      <button onClick={onClick}>点我</button>
      <hr/>
      <p>自定义Hook</p>
      可视化窗口宽度：{Width}
    </div>
  )

}

export default ReactHooks;