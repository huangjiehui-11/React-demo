import React, { useState, useMemo, useReducer, useRef, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';

// 通过 useRef 获取的子组件必须是类组件
class Children1 extends React.PureComponent {
  introduce1 = () => {
    console.log('i can sing, jump, rap, play basketball')
  }

  render () {
    return (
      <div>
        <p>我是子组件1</p>
      </div>
    )
  }
}

class Children2 extends React.PureComponent {
  render () {
    return (
      <div>
        <p>我是子组件2</p>
      </div>
    )
  }
}

// useImperativeHandle
// 子组件可以选择性的暴露给父组件一些方法，这样可以隐藏一些私有方法和属性。
// 官方建议，useImperativeHandle应当与 forwardRef 一起使用
function Kun (props, ref) {

  const introduce = useCallback (() => {
    console.log('i can sing, jump, rap, play basketball')
  }, [])

  useImperativeHandle(ref, () => ({
    introduce: () => {
      introduce()
    }
  }));

  return (
    <div > { props.count }</div>
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

  useEffect(() => {
    // 相当于 componentDidUpdate
    document.title = count
  })

  useEffect(() => {
    console.log(`count change: count is ${count}`)
  }, [ count ])

  // useMemo 
  // useMemo类似于计算属性，控制某些状态{函数方法}是否随着组件更新渲染重复调用
  // useMemo可以避免函数组件的某些无需重复执行的方法因为组件render更新渲染而被重复调用，将这些可能不需要执行的方法传入useMemo()的第一个参数return出去
  // useMemo 会在渲染的时候执行，而不是渲染之后执行，这一点和 useEffect 有区别，所以 useMemo 不建议有副作用相关的逻辑，会阻塞渲染
  const [ count, setCount ] = useState(0)  // useState设置的变量count只能通过setCount方法来改变
  // console.log('count: ', count)

  // 只有当依赖的值count发生变化时，才会执行回调函数
  const add = useMemo(() => {
    console.log("该回调函数被调用")
    return count + 1
  }, [count])

  // 空数组，只会执行一次回调函数，之后count发生改变也不会再执行，因为会再执行回调函数，因此count+1不会执行，{add}这个状态不会再改变
  // const add = useMemo(() => {
  //   console.log("该回调函数被调用")
  //   return count + 1
  // }, [])

  // 不传数组，相当无优化，每次组件更新渲染都会执行回调函数
  // const add = useMemo(() => {
  //   console.log("该回调函数被调用")
  //   return count + 1
  // })

  // useRef
  // 类似于类组件的React.createRef()，函数组件获取Dom只能通过useRef
  // useRef的参数为设定默认值
  // 因为没有任何一个子组件的ref属性为childrenRef，所以childrenRef.current会赋值为默认值null
  // 因为没有子组件的设定ref属性为childrenRef，所以用不用无所谓，用了就会使用默认值
  const childrenRef = useRef(null)

  // 只要有子组件定义了ref属性，必须拿ref属性的值使用 ref = useRef(), 否则会报错
  // 直接拿Children1组件ref的属性值当变量，也就直接指定了该变量的current指向该子组件
  // 例如子组件Children1定义了ref属性为childrenRef1，所以必须使用 const childrenRef1 = useRef(childrenRef1)
  const childrenRef1 = useRef(null)
  const childrenRef2 = useRef(null)
   
  const onClick1 = useMemo(() => {
    return () => {
      console.log('button click')
      console.log(childrenRef.current.textContent)    // null
      console.log(childrenRef1.current.introduce1)   // Children1
      // console.log(this.refs.child1)    // 只有在类组件才可以用
      console.log(childrenRef2.current)   // Children2
    }
  }, [])

  // useReducer
  // useReducer的功能类似于useState + redux
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
  // console.log('state: ', state)

  // useImperativeHandle
  // useRef可以拿到子组件的全部，使用useImperativeHandle可以让子组件选择性地暴露
  const [ count2, setCount2 ] = useState(0)  // 注意定义state新的变量，避免与其他的hook里state的相同变量相互影响
  // console.log('count2: ', count2)

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
      页面名称: { count } 
      width：{width}
      <button onClick={() => { setCount(count + 1)}}>点我</button>
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
      <p>useRef：</p>
      <p ref={childrenRef}>函数组件里的原生Do不能通过this.ref获取，只能通过useRef</p>
      <Children1 ref={childrenRef1}></Children1>
      <Children2 ref={childrenRef2}></Children2>
      <button onClick={onClick1}>点我</button>
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