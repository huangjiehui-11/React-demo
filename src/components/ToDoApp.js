import React from 'react';
import Input from './input';
import List from './List';
import Time from './Timing';
import ReactHooks from './ReactHooks';
import Stop from './Stop';
import RadioInput from './RadioInput';
import UseEffectDemo from './UseEffectDemo';

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{item:'thing1', done: false}, {item:'thing2', done: false}, {item:'thing3', done: false}],
      newToDo: 'test',
      count: 0,
      value: ''
    }
  }

  componentWillMount() {
    // this.setState({
    //   list: ['thing1', 'thing2', 'thing3'],
    //   newToDo: 'test',
    //   count: 0
    // })

    // 写成箭头函数的形式，组件使用时不需要显示绑定this
    // this.onInputChange = (event) => {
    //   this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
    // };

    // 使用react-redux的写法
    this.onInputChange = (event) => {
      this.props.inputChange(event.target.value)  // 使用react-redux的容器组件的mapDispatchToProps里注册的函数 // 将修改state的逻辑放在了reducer里
    } 
  }

  // onInputChange = (event) => {
  //   this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
  // };

  handleAdd = () => {
    console.log(this);
    this.setState({
      count: 5
    })
    console.log(this.state);
  }

  handleClick() {
    console.log(this)
    this.setState({
      count: 6
    })
  }

  // onInputSubmit = (event) => {
  //   event.preventDefault();  //如果表单form里的button按钮写在form表单之外，则不需要preventDefault
  //   this.setState((preState) => ({
  //     list: [...preState.list, {item: preState.newToDo, done: false }],  //不改变原state的list
  //     // newToDo: ''
  //   }));
  //   console.log('this.state: ', this.state.list);
  // }

  // 使用react-redux的写法：
  onInputSubmit = (event) => {
    event.preventDefault();
    this.props.inputSubmit()  // 将修改state的逻辑放在了reducer里
  }

  // onListItemClick = (i) => { // takes the index of the element to be updated
  //   this.setState((preState)=>({
  //     list: [
  //       ...preState.list.slice(0, i), // slice returns a new array without modifying the existing array. Takes everything up to, but not including, the index passed in.
  //       Object.assign({}, preState.list[i], {done: !preState.list[i].done}), // Object.assign is a new ES6 feature that creates a new object based on the first param (in this case an empty object). Other objects can be passed in and will be added to the first object without being modified.
  //       ...preState.list.slice(i+1) // takes everything after the index passed in and adds it to the array.
  //     ]
  //   }))
  // };

  // 使用react-redux的写法：
  onListItemClick = (i) => {
    this.props.listItemClick(i)  // 将修改state的逻辑放在了reducer里
  }

  // deleteListItem = (i) => {
  //   this.setState((previousState)=>({ // using previous state again
  //     list: [
  //       ...previousState.list.slice(0, i), // again with the slice method
  //       ...previousState.list.slice(i+1) // the only diffence here is we're leaving out the clicked element
  //     ]
  //   }))
  // };

  // 使用react-redux的写法：
  deleteListItem = (i) => {
    this.props.deleteListItem(i)  // 将修改state的逻辑放在了reducer里
  }

  callback = (value) => {
    this.setState({
      value: value
    })
  }
  
  submitValue = () => {
    console.log(this.state.value)
  }

  render() {
    console.log('This.state.newToDo: ', this.state.newToDo)
    console.log(this.props)
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
            <div className="panel-body">
              <h1>My To Do App</h1>
              <hr/>
              <List
                count={this.state.count} 
                listItems={this.props.toDoApp.list} 
                onListItemClick={this.onListItemClick} 
                deleteListItem={this.deleteListItem}/>
              <hr/>
              <Input 
                values = {this.props.toDoApp.newToDo}
                onChange = {this.onInputChange}
                onInputSubmit = {this.onInputSubmit}
              />
              <hr/>
              <p>react的class指针 count: {this.state.count}</p>
              <button onClick={this.handleAdd}>无bind点击一下（箭头函数形式）</button>
              <button onClick={this.handleClick}>无bind点击一下（普通函数形式）</button>
              <button onClick={() => this.handleClick()}>无bind点击一下（普通函数形式）</button>
              <button onClick={this.handleClick.bind(this)}>有bind点击一下（普通函数形式）</button>
              <hr/>
              <p>性能优化，避免无需更新的组件重复渲染：shouldComponentUpdate、PureComponent、React.memo、useMemo</p>
              <Time />
              <hr/>
              <ReactHooks />
              <hr/>
              <Stop />
              <hr/>
              <RadioInput callback={this.callback}/>
              <button onClick={this.submitValue}>提交</button>
              <hr/>
              <UseEffectDemo />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoApp;