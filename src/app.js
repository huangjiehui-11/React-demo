import { divide } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ToDoApp from './components/ToDoApp';
import ToDoAppContainer from './containers/ToDoAppContainer';
import store from './redux/configStore'


// Stateless Functional Component
// 函数型组件没有生命周期方法和state属性，但有props参数
const App = () => {
  return (
    <div>
        Hello World 
        <Provider store={store}>
          <ToDoAppContainer />
        </Provider>
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