const INPUT_CHANGED = 'react-redux-ducks/toDoApp/INPUT_CHANGED';
const INPUT_SUBMIT = 'react-redux-ducks/toDoApp/INPUT_SUBMIT';
const LIST_ITEM_CLICK = 'react-redux-ducks/toDoApp/LIST_ITEM_CLICK';
const DELETE_LIST_ITEM = 'react-redux-ducks/toDoApp/DELETE_LIST_ITEM';

const initialState = {
  list: [{item:'thing1', done: false}, {item:'thing2', done: false}, {item:'thing3', done: false}], // just added this to test that state is being passed down propperly
  newToDo: ''
};

export function inputChange(value) {
  return {
    type: INPUT_CHANGED,
    value  // 相当于value: value
  }
}

export function inputSubmit() {
  return {
    type: INPUT_SUBMIT
  }
}

export function listItemClick(index) {
  return {
    type: LIST_ITEM_CLICK,
    index  // 相当于index: index
  }
}

export function deleteListItem(index) {
  return {
    type: DELETE_LIST_ITEM,
    index
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGED:
      return Object.assign(
        {},
        state,
        {newToDo: action.value}
      );
    case INPUT_SUBMIT:
      return Object.assign(
        {},
        state,
        { 
          list: [...state.list, {item: state.newToDo, done: false}],
          newToDo: ''
        }
      );
    case LIST_ITEM_CLICK:
      return Object.assign(
        {},
        state,
        {
          list: [
            ...state.list.slice(0, action.index), // slice returns a new array without modifying the existing array. Takes everything up to, but not including, the index passed in.
            Object.assign({}, state.list[action.index], {done: !state.list[action.index].done}), // Object.assign is a new ES6 feature that creates a new object based on the first param (in this case an empty object). Other objects can be passed in and will be added to the first object without being modified.
            ...state.list.slice(action.index+1) // takes everything after the index passed in and adds it to the array.
          ]
        }
      )
    case DELETE_LIST_ITEM:
      return Object.assign(
        {},
        state,
        {
          list: [
            ...state.list.slice(0, action.index),
            ...state.list.slice(action.index+1)
          ]
        }
      );
    default:
      return state;  // 一开始渲染没操作的时候就是返回这个初始值
  }
}