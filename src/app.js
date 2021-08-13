import { divide } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './components/ToDoApp'

// Stateless Functional Component
// 函数型组件没有生命周期方法和state属性，但有props参数
const App = () => {
  return (
    <div>
        Hello World 
        <ToDoApp />
    </div>
  )
}

//ES6创建component
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         Hello World
//       </div>
//     );
//   }
// }

//使用createClass创建组件
// const App = React.createClass({
//   render: function() {
//     return (
//       <div>
//           Hello World 
//           <ToDoApp />
//       </div>
//     );
//   }
// })

ReactDOM.render(<App/>, document.getElementById('app'))