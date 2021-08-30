import { connect } from "react-redux";
import ToDoApp from '../components/ToDoApp.js'
import { inputChange, inputSubmit, listItemClick, deleteListItem } from "../redux/modules/toDoApp.js";

function mapStateToProps(state) {
  return {
    // state参数为Provider组件传递的store对象，会去store对象里的合并的ruducer找到匹配到的同名的reducer所对应的那个js文件所export default导出的reducer（这个reducer会根据action.type返回对应的action对象）
    toDoApp: state.toDoApp  // return的对象 = UI组件的props对象，keys就是传给对应UI组件props这个对象里的变量名
  }
}

function mapDispatchToProps(dispatch) {
  // return一个对象，对象里的键值对就是对应容器组件所使用的函数
  // 必须在这里加入对应函数，UI组件的props对象里才会存在
  // match对应的组件的js文件里的action creator(dispatch参数里的函数 = 对应相应js文件里export的action creator函数)
  return {
    inputChange: (value) => dispatch(inputChange(value)),
    inputSubmit: (value) => dispatch(inputSubmit(value)),
    listItemClick: (index) => dispatch(listItemClick(index)),
    deleteListItem: (index) => dispatch(deleteListItem(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);