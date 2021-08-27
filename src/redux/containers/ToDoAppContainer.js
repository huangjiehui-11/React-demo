import { connect } from "react-redux";
import ToDoApp from '../../components/ToDoApp.js'

function mapStateToProps(state) {
  return {
    toDoApp: state.toDoApp  // keys就是传给对应容器组件的变量名
  }
}

function mapDispatchToProps(dispatch) {
  // return一个对象，对象里的键值对就是对应容器组件所使用的函数
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);