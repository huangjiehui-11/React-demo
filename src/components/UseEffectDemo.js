import React, {useEffect, useLayoutEffect, useMemo} from 'react';

function UseEffectDemo() {

  const [count, setCount] = React.useState(0);
  const preCountUseRef = React.useRef(count);

  useLayoutEffect(() => {
    preCountUseRef.current = count;
  },[count])

  return (
    <div>
      {/*useEffect在渲染时是异步执行，并且要等浏览器将所有变化渲染到屏幕后才会执行，因此这次展示是旧的pre.current，而且pre.current改变并不会触发re-render，因此执行完useEffect也不会更新最新的值*/}
      <p> preCount: {preCountUseRef.current}</p >
      
      {useMemo(() => {
        return <p>count: {count}</p >
      })}
      <button onClick={() => {setCount(count + 1);}}>
        click
      </button>
    </div>
  )
}

export default UseEffectDemo