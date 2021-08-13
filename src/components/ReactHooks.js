import React, { useState, useMemo, useReducer, useRef, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';

// useImperativeHandle
// 子组件可以选择性的暴露给副组件一些方法，这样可以隐藏一些私有方法和属性。
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
  // seMemo 会在渲染的时候执行，而不是渲染之后执行，这一点和 useEffect 有区别，所以 useMemo 不建议有 副作用相关的逻辑
  const [ count, setCount ] = useState(0)

  const add = useMemo(() => {
    return count + 1
  }, [count])

  // useReducer
  // 它更适合一些逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等等的特定场景
  // userReducer有三个参数：函数参数、初始state、惰性初始化
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    count: 0
  });

  // useImperativeHandle
  const [ count1, setCount1 ] = useState(0)  // 注意定义新的state，避免与其他的hook里的state相同造成相互影响
  
  const kunRef = useRef(null)

  const onClick = useCallback (() => {
    setCount1(count1 => count1 + 1)
    kunRef.current.introduce()
  }, [])

  // 自定义Hook
  const Width = useWidth(document.body.clientWidth)

  return (
    <div>
      <p>useEffect：</p>
      width：{width}
      <hr/>
      <p>useMemo：</p>
      点击次数: { count }
      <br/>
      次数加一: { add }
      <button onClick={() => { setCount(count + 1)}}>点我</button>
      <hr/>
      <p>userReducer：</p>
      点击次数: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <hr/>
      <p>useImperativeHandle：</p>
      点击次数: { count1 }
      <KunKun ref={kunRef}  count={count1}></KunKun>
      <button onClick={onClick}>点我</button>
      <hr/>
      <p>自定义Hook</p>
      可视化窗口宽度：{Width}
    </div>
  )

}

export default ReactHooks;