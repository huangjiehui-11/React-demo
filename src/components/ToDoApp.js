import React from 'react';
import Input from './input';
import List from './List';
import Time from './Timing';
import ReactHooks from './ReactHooks';
import Stop from './Stop';

class ToDoApp extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     list: [],
  //     newToDo: 'test'
  //   }
  // }

  componentWillMount() {
    this.setState({
      list: ['thing1', 'thing2', 'thing3'],
      newToDo: 'test',
      count: 0
    })

    // 写成箭头函数的形式，组件使用时不需要显示绑定this
    this.onInputChange = (event) => {
      this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
    };
  }

  // onInputChange = (event) => {
  //   this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
  // };

  handleAdd = () => {
    console.log(this);
    this.setState({
      count: 5
    })
  }

  handleClick() {
    console.log(this)
    this.setState({
      count: 6
    })
  }

  render() {
    console.log('This.state.newToDo: ', this.state.newToDo)
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
            <div className="panel-body">
              <h1>My To Do App</h1>
              <hr/>
              <List listItems = {this.state.list} />
              <hr/>
              <Input 
                values = {this.state.newToDo}
                onChange = {this.onInputChange}
              />
              <hr/>
              <p>react的class指针 count: {this.state.count}</p>
              <button onClick={this.handleAdd}>无bind点击一下（箭头函数形式）</button>
              <button onClick={this.handleClick}>无bind点击一下（普通函数形式）</button>
              <button onClick={() => this.handleClick()}>无bind点击一下（普通函数形式）</button>
              <button onClick={this.handleClick.bind(this)}>有bind点击一下（普通函数形式）</button>
              <hr/>
              <Time />
              <hr/>
              <ReactHooks />
              <hr/>
              <Stop />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoApp;