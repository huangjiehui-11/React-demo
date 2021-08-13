import React from 'react';
import Child from './Child'

class Time extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        date : new Date()
    }
  }

  // 只需要执行一次，setInterval只执行一次，但第一个函数参数会每一秒执行一次；
  componentDidMount(){
    setInterval(()=>{
      this.setState({
          date:new Date()
      });
      //console.log(this); //this指向Time组件，因为使用的是箭头函数，父级执行上下文是Time
    },1000)
  }
  
  // 每隔1秒都会render()重新渲染一次，但Child组件只需要渲染一次，优化方案：
  // 1、PureComponent  注意：PureComponent只能进行浅层比较
  // 2、通过 shouldComponentUpdate(nextProps, nextState)来决定是否是否重新渲染。返回true重新渲染，返回false不渲染。
  //    此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。
  //    不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。
  // 3、React.memo()  注意：React版本需16.0以上才可以使用，第二个参数返回true不渲染，返回false重新渲染；
  render(){
    return (
      <div>
        <Child seconds={1}/>
        <div>{this.state.date.toString()}</div>
      </div>
    )
  }
}

export default Time;