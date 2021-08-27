import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  // 如果form标签里的button或input标签没有绑定事件，点击之后会执行form标签上绑定的事件
  onSubmit = () => {
    console.log('submit')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="listInput">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="listItemInput"
            // placeholder="Add new todo"
            value={this.props.values}
            onChange={this.props.onChange} 
          />
          <button 
            className="btn btn-primary"
            onClick={this.props.onInputSubmit}
          >
            Add Item
          </button>
          <input type="submit" onClick={this.props.onInputSubmit}/> 
        </div>
      </form>
      {/* onInputSubmit事件函数里可以不用写preventDefault() */}
      {/* <button 
            className="btn btn-primary"
            onClick={this.props.onInputSubmit}
          >
            Add Item
          </button> */}
      </div>
      
      
    )
  }
}

export default Input;