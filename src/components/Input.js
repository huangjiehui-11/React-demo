import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form>
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
          <button className="btn btn-primary">
            Add Item
          </button>
        </div>
      </form>
    )
  }
}

export default Input;