import React from 'react';

// class Child extends React.PureComponent {
//   render() {
//     console.log('I am rendering');  // 判断Child是否重新渲染
//     return (
//       <div>
//         I am updating the time every {this.props.seconds} seconds
//       </div>
//     )
//   }
// }

// export default Child;

function Child({seconds}){
  console.log('I am rendering');
  return (
      <div>I am update every {seconds} seconds</div>
  )
};

function areEqual(prevProps, nextProps) {
  if(prevProps.seconds === nextProps.seconds){
    return true
  }else {
    return false
  }

}

export default React.memo(Child, areEqual);