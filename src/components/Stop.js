import React, { Component } from 'react';

export default class Stop extends Component {
  componentDidMount() {
    let parent = document.getElementById('parent');
    let child = document.getElementById('child');
    parent.addEventListener('click', this.parentClick1);
    child.addEventListener('click', this.childClick1);
    child.addEventListener('click', this.childClick2);
    document.addEventListener('click', this.documentClick);
  }
  childClick1 = (e)=> {
    console.log('child1');
    // e.stopPropagation();
    // e.stopImmediatePropagation();
  }
  childClick2 = (e)=> {
    console.log('child2');
  }
  childClick3 = (e)=> {
    console.log('child3');
    // e.stopPropagation();  //可以阻止合成事件的冒泡，但无法阻止最外层document上绑定的事件（属于原生事件，且最后执行）
    e.nativeEvent.stopImmediatePropagation();  //无法阻止合成事件的冒泡,但可以阻止最外层document上绑定的事件
  }
  parentClick1 = ()=> {
    console.log('parent1');
  }
  parentClick2 = ()=> {
    console.log('parent2');
  }
  documentClick = () => {
    console.log('document')
  }

  render() {
    return (
      <div id='parent' onClick={this.parentClick2}>
        {/* 在原生事件上，如果只使用stopPropagation只能阻止事件冒泡至其父节点，而stopImmediatePropagation既能阻止事件冒泡至父节点，也能阻止当前节点上其他同类型事件的触发。 */}
        {/* 在原生事件上使用 stopPropagation 和 stopImmediatePropagation 都能阻止所有的冒泡，包括最外层document上绑定的事件。 */}
        {/* 在原生事件上使用 stopPropagation 和 stopImmediatePropagation 都能阻止所有的合成事件，只执行原生事件。 */}
        {/* 先执行原生事件，再执行合成事件,最后执行document事件 */}
        {/* 若在原生事件上使用 stopPropagation 和 stopImmediatePropagation， 都能阻止冒泡到合成事件，只执行原生事件。 */}
        {/* 若在合成事件上使用 stopPropagation 和 e.nativeEvent.stopImmediatePropagation，都无法阻止原生事件，先执行全部的原生事件（包括原生事件的冒泡，除了ducoment上绑定的事件（stopImmediatePropagation能阻止）），再执行合成事件(stopPropagation能阻止合成事件的冒泡，但stopImmediatePropagation无法阻止)。 */}
        {/* 在合成事件上使用 stopPropagation，原生事件执行并冒泡，合成事件执行但不冒泡，最后执行ducument上绑定的原生事件； */}
        {/* 在合成事件上使用 e.nativeEvent.stopImmediatePropagation，原生事件执行并冒泡，合成事件执行且冒泡，但document绑定的原生事件不执行； */}
        {/* 在React体系中，一个组件只能绑定一个同类型的事件监听器（重复定义时，后面的监听器会覆盖之前的），所以合成事件甚至都不去封装stopImmediatePropagation。事实上nativeEvent的stopImmediatePropagation只能阻止绑定在document上的事件监听器。此外，由于事件绑定的顺序问题，需要注意，如果是在react-dom.js加载前绑定的document事件，e.nativeElement.stopImmediatePropagation也是无法阻止的。 */}
        {/* e.stopPropagation 和 e.nativeElement.stopImmediatePropagation可以同时使用。 */}
        React合成事件机制：stopPropagation 和 stopImmediatePropagation
        <br/>
        <button id='child' onClick={this.childClick3}>click me!</button>
      </div>
    );
  }
}