import React from "react";

class NewLifeHook extends React.Component {
  state = {count: 0}
  handleAdd = () => {
    this.setState({count: this.state.count+1})
  }
  componentDidMount() {
    console.log('NewLifeHook-----componentDidMount')
  }
  shouldComponentUpdate() {
    console.log('NewLifeHook-----shouldComponentUpdate')
    return true
  }
  componentDidUpdate() {
    console.log('NewLifeHook-----componentDidUpdate')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render() {
    const {count} = this.state
    return (
      <div>
        <p>count: {count}</p>
        <button onClick={this.handleAdd}>点我+1</button>
        <button onClick={this.props.death}>卸载组件</button>
      </div>
    )
  }
}

export default NewLifeHook