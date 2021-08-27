这是一个从头搭建一个react简单应用的教程，最开始学redux时候从别人那copy后用到的，现在回过头看还是可以算作最好的一个demo了，重新更新了代码和一些配置，在github找到了初始版本，在此感谢[作者](https://github.com/goopscoop/ga-react-tutorial)

# 从头开始建立一个React App - 项目基本配置

1. `npm init` 生成 `package.json` 文件.
2. 安装各种需要的依赖:
  - `npm install --save react` - 安装React.
  - `npm install --save react-dom` 安装React Dom,这个包是用来处理virtual DOM。这里提一下用React Native的话，这里就是安装react-native。
  - `npm install --save-dev webpack` - 安装Webpack, 现在最流行的模块打包工具.
  - `npm install --save-dev webpack-dev-server` - webpack官网出的一个小型express服务器，主要特性是支持热加载.
  - `npm install --save-dev babel-core` - 安装Babel, 可以把ES6转换为ES5，注意Babel最新的V6版本分为babel-cli和babel-core两个模块，这里只需要用babel-cor即可。
    - 安装其他的babel依赖（babel真心是一个全家桶，具体的介绍去官网看吧..我后面再总结，这里反正全装上就是了）:
    - `npm install --save babel-polyfill` - Babel includes a polyfill that includes a custom regenerator runtime and core.js. This will emulate a full ES6 environment
    - `npm install --save-dev babel-loader` - webpack中需要用到的loader.
    - `npm install --save babel-runtime` - Babel transform runtime 插件的依赖.
    - `npm install --save-dev babel-plugin-transform-runtime` - Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals.
    - `npm install --save-dev babel-preset-es2015` - Babel preset for all es2015 plugins.
    - `npm install --save-dev babel-preset-react` - Strip flow types and transform JSX into createElement calls.
    - `npm install --save-dev babel-preset-stage-2` - All you need to use stage 2 (and greater) plugins (experimental javascript).
3. 打开 `package.json` 然后添加下面的scripts:
  ```
  "scripts": {
    "start": "webpack-dev-server --hot --inline --colors --content-base ./build",
    "build": "webpack --progress --colors"
  }
  ```

  命令行输入 `npm start` 将要启动webpack dev server.
  
  命令行输入 `npm build` 将会进行生产环境打包.
4. 根目录下新建webpack.config.js

5. 配置webpack.config.js

  Webpack是我们的打包工具，在我们的开发环境中具体很重要的作用，具有很多非常便捷的特性，尤其是热加载hot reloading. `webpack.config.js` 是如下所示的webpack的配置文件. 随着app的不断变化，配置文件也会不断的更新，这里我们就用默认的`webpack.config.js`来命名这个配置文件，假如你用别的名字比如`webpack.config.prod.js`那么上面的脚本build就需要相应的改变指定相应的配置文件名字：`"build": "webpack webpack.config.prod.js --progress --colors"`

  ```javascript
var webpack = require('webpack');
module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
};

  ```
5. OK,我们项目的基本配置终于完成了，是时候开始写Reac代码了.

# React 基础 - 建立你的第一个Component

在上面的项目的基本配置基础上，我们开始书写React的第一个组件来熟悉React的写法与组件思想。

1. 首先我们在项目根目录中新建一个 `index.html` 文件。 在这个基础工程中, 我们使用bootstrap的样式，直接引入一个cdn即可. 然后添加一个html标签 `<div id="app"></div>`，我们的app就会注入到这个div中。 最后再引入 `<script src="bundle.js"></script>`，这是最后打包生成的js代码。
	
	以下是完整的代码:
	
	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <title>Document</title>
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	</head>
	<body>
	  <div id="app"></div>
	  <script src="bundle.js"></script>
	</body>
	</html>
	```
2. 建立一个新的文件夹 `src`. 我们app的大部分代码都将放在这个文件夹里面。在 `src` 中建立 `app.js`，作为React App的根组件， 其他所有的组件都会注入到这个跟组件中。
3. 首先我们需要导入react，现在都已经用ES6的语法， `import React from 'react';` ， 然后我们要引入react-dom. 这里面有react中最重要的一个虚拟dom的概念.引入代码：`import ReactDOM from 'react-dom';`

4. 现在需要引入的依赖都已经完毕我们可以写第一个组件了：

	```javascript
	class App extends React.Component {
	  render(){ // Every react component has a render method.
	    return( // Every render method returns jsx. Jsx looks like HTML, but it's actually javascript and functions a lot like xml, with self closing tags requiring the `/` within the tag in order to work propperly
	      <div>
	        Hello World
	      </div>
	    );
	  }
	}
	```

	注意这里"Hello World"写在 `div`中. 所有的jsx代码都需要写在一个父div中.

5. 最后我们需要把我们写好的组件render给Dom，这里就需要用到 `ReactDOM.render` 方法.

	在 `App.js` 的下面添加: `ReactDOM.render(<App />, document.getElementById('app'));`

	第一个参数就是我们App的根组件, 写作`<App />`的形式. 第二个参数就是我们的APP将要主要的DOM元素. 在这个项目中，就是我们在index中写的id为`app`的 `div`标签。


	Ok，我们的APP结构已经出来了，经典的hello world已经实现。马上我们就在这个基础上再实现经典的todo app。大致的原型就有一个输入框用来输入代办事项然后添加到事件列表中。事件列表中每一个代办事项被点击就会标注一条删除线表示完成，点击后面的删除按钮则会将其从列表中删除。通过完成这个APP的过程你将学会一个完整的react app的所有的基本构建块。
	
# 生命周期方法和两种形式的组件构建

我们从一些小的模块开始起步.一个组件component就是一个react app的构件块. 有两种形式的组件： 类组件（Class）和函数型组件（Functional）. 在这个项目中,这两种形式的组件我们都会使用, 并且使用生命周期的钩子，同时也会使用state和props两个react中重要的属性。

1. 首先在  `src`文件夹中新建`components` 文件夹，你的文件结构就是这样 `~/src/components`。

2. 然后在`components`中新建文件 `ToDoApp.js`。 对于所有的react组件我们都需要在头部引入react`import React from 'react';`。

3. 下面我们写一个类组件. 所有的class 组件有一个render方法用来返回jsx。 

	ToDoApp的class就如下所示:

	```javascript
	class ToDoApp extends React.Component {
	  render() {
	    return (
	      <div>To Do App</div>
	    );
	  }
	}
	```

4. 为了将这个组件注入到我们的APP中, 首先我们需要输出它。 在这个组件代码底部添加 `export default ToDoApp;`。

5. 然后在`app.js`顶部我们添加 `import ToDoApp from '.components/ToDoApp';` 导入组件用来代替 `Hello World` 。 render中替换为新的jsx代码 `<ToDoApp />`半闭合类型的标签即可。 

6. 然后在浏览器中你就可以看到"To Do App" 代替了原来的 "Hello World"!这样我们就完成了将第一个子组件嵌入到根组件之中了，这就是构建react app的常规模式。下面继续完善我们的组件。
7. 返回到`ToDoApp` 中来构建我们的第一个代办事项列表。首先我们使用bootstrap来构建比较方便且美观。 用下面的jsx替换当前`render`方法中 `return` 中的jsx：
```html
<div className="row">
  <div className="col-md-10 col-md-offset-1">
    <div className="panel panel-default">
      <div className="panel-body">
        <h1>My To Do App</h1>
        <hr/>
        List goes here.
      </div>
    </div>
  </div>
</div>
```

8. 现在打开浏览器, 你将会看到一个标题 "My To Do App" 下面跟随一个bootstrap的panel组件里面写有 "List Goes Here"，我们将在这个地方构建列表。 那么我们如何将数据存储在我们的列表中呢？ 答案就是使用 `state`. 每一个类组件都有 `state` 属性，可以通过 `this.state`在组件任何位置获取并且用 `this.setState({ key: "value" })`这种方法来更新状态。但是除非必要我们比较少使用`state`，这里暂时先使用作为了解，后期会使用redux来管理状态。

	在`ToDoApp`中我们可以使用许多生命周期方法的钩子, 其中一个就是`componentWillMount`。 这个方法的执行是在页面加载并且render方法之前。可以在其中获取列表数据，在我们的APP中直接用一个虚拟的数组提供。（值得注意的是componentWillMount会引起很多小问题，因此真实项目中尽量不要使用，而是应该用componentDidMount）。
	在 `ToDoApp`中 `render` 方法之前添加:
	
	```javascript
	  componentWillMount(){ // run before the render method
	    this.setState({ // add an array of strings to state.
	      list: ['thing1', 'thing2', 'thing3']
	    })
	  };
	```

	现在我们获取了一个虚拟列表，需要重点注意的就是react依赖于state和props，只有当state和props改变的时候react组件才会刷新。

9. 现在我们添加列表到这个view里，这里不是直接简单的在里面修改jsx，而是再创建一个新的组件来构建列表，这次我们学习使用函数型组件，需要注意的是函数型组件没有生命周期方法和state属性，它仅仅是一个返回jsx的函数，并且参数是props。

	那么props到底是什么呢？props是从父组件传递进子组件的数据的名字，这是一个很重要的概念，也是react app数据传递的最典型与最推荐的方法。通常我们将数据保持在app的顶端组件，通过组件让数据流下来保证APP的精确运行。这些数据和props的一些处理可能会影响APP的运行，但是假如你按照这个课程的实践流程来做，这些影响都会很小。
	
	再新建一个`components`文件夹并在其中新建一个`List.js`作为我们要创建的函数型组件。用const来新建一个函数，参数名字写作props。
	函数形式如下所示:

	```javascript
	const List = (props) => { // we're using an arrow function and const variable type, a ES6 features
	
	  return (
	    <div>
	      I'm a list!!!
	    </div>
	  )
	};
	
	export default List;
	```

10. 在 `ToDoApp.js`引入 List用`List` 组件替换 `List goes here.`，写法为 `<List />`.现在在浏览器中就可以看到"I'm a list!!!"

	现在我们来把这个变成真实的列表，首先就需要通过props传递数据，我们把这个从state中获取的数据list通过命名为listItems的props传递，写作: `<List listItems={this.state.list} />` ，现在 `List` 已经通过props获取了 `ToDoApp`中的数据。

	然后在 `List` 组件中我们需要render一个列表，先用下面的jsx代码代替:

	```javascript
	<div>
	  <ul>
	    {
	      list // this is a variable we'll define next
	    }
	  </ul>
	</div>
	```

	注意这个大括号，js可以在这里面执行并将返回添加到view里。首先我们定义一个列表变量：	

	```javascript
	const list = props.listItems.map((el, i)=>(
	  // All where doing here is getting the items listItems prop
	  // (which is stored in the state of the parent component)
	  // which is an array, and we're running the .map method
	  // which returns a new array of list items. The key attribute is
	  // required, and must be unique.
	  <li key={i}><h2>el</h2></li>
	));
	```

	完整的组件如下:

	```javascript
	import React from 'react';
	
	const List = (props) => {
	
	  const list = props.listItems.map((el, i)=>(
	    <li key={i}><h2>el</h2></li>
	  ));
	
	  return (
	    <div>
	      <ul>
	        {
	          list
	        }
	      </ul>
	    </div>
	  )
	};
	
	export default List;
	```

11. 现在打开浏览器就可以看到一列列表了。接下来就是给我们的项目加入功能了，包括添加新的事项，标注事项完成和删除列表中事项。

# 给APP添加功能

## 1.函数型组件

首先我们需要添加一个input元素以便可以输入代办事项。因此我们在`components`文件夹中新建一个`Input.js`，然后在其中创建并输出一个名叫Input的函数型组件。
把下面的jsx代码粘贴到你的函数型组件return之中:

```html
<form>
  <div
    className="form-group">
    <label
      htmlFor="listInput">
      Email address
    </label>
    <input
      type="text"
      className="form-control"
      id="listItemInput"
      placeholder="Add new todo"
    />
    <button
      className="btn btn-primary">
      Add Item
    </button>
  </div>
</form>
```

## 2. Input

现在我们的jsx没有做任何特殊的事情，仅仅是一个基本的html视图，不过我们先测试一下把其导入到`ToDoApp.js`，形式就是`<Input/>`。

这时候会发现一个输入框和按钮的视图，这个组件的静态视图已经写好了，下面就需要添加功能了。

## 3. Props

首先我们需要做的是如何获取输入框的值，因为这个输入框的值需要在其他组件中获取，所以我们并不想要在`Input`组件中来处理这个数据存储。事实上，在子组件中存储数据在任何时候都是不推荐的，我们应该将数据存储在app的顶端组件并且通过props传递下来。

另一个需要记住的是即使我们目前把数据存储在了上层的 `ToDoApp` 组件，后期还是会用redux来代替来处理整个app的数据。这里先仅仅使用react的state来实现。

ok，我们在`ToDoApp`的 `componentWillMount`的`setState`中新增一个`newToDo`属性用来存储输入框的值。

```javascript
  componentWillMount(){
    this.setState({
      list: ['thing1', 'thing2', 'thing3'],
      newToDo: 'test'
    })
  };
```

同样的就可以通过在`<Input />`上通过props传递下去。

## 4. 解构（Destructuring）

在`Input.js`中我们通过参数props可以获得上级组件传递下来的值, 但是还可以用ES6的新特性解构来作为参数，这样看起来更加酷！

把`Input`组件的`props`参数修改为`({ value })`这样的参数形式，这样可以把`props`这个对象参数解构为一个个键值对。直接看个小例子来就很明白了：

```
var props = {
  name: 'hector',
  age: 21
}


function log(props){
  console.log(props.name);
  console.log(props.age);
}

log(props);
```

is the same as this:

```
let props = {
  name: 'hector',
  age: 21
}

log = ({name, age}) => {
  console.log(name);
  console.log(age);
}

log(props);
```


## 5. setState

上面的`newToDo`仅仅是添加了一个state用来存储输入框的值，给定一个值，输入框就会显示，明显还不是我们要的效果，我们需要做的是基于输入框的值的改变来动态改变这个state。

为了实现这个功能，我们需要再添加一个`onChange`方法同样利用props传进`Input`组件： `onChange={onChange}`, 然后解构参数就是`({ onChange, value })`。

然后在 `ToDoApp.js`的`componentWillMount` 添加一个新的方法 `onInputChange`。这个方法有一个参数`event`, 它将要捕获用户在输入框输入的值。

```javascript
onInputChange = (event) => {
  this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
};
```

## 6. 性能优化：PureComponent、shouldComponentUpdate、React.memo

在components下新建Timing.js组件，实现计时器，但Timing组件里的Child子组件不需要每次都一起重新渲染。

利用React.PureComponent或React.memo创建子组件，让子组件仅在 props 改变时才进行重新渲染。

在components下新建Child.js：

```javascript
class Child extends React.PureComponent {
  render() {
    console.log('I am rendering');  // 判断Child是否重新渲染
    return (
      <div>
        I am updating the time every {this.props.seconds} seconds
      </div>
    )
  }
}

export default Child;
```
```javascript
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
```

## 7. React Hooks

React v16.8.0 新增了React Hooks，它可以让我们在函数组件中使用 state 、生命周期以及其他 react 特性，而不仅限于 class 组件。

react hooks 的出现，标示着 react 中不会在存在无状态组件了，只有类组件和函数组件。

在 components 下新建 ReachHooks.js 组件，在里面测试 react hooks 用法与特性。

## 8. 添加新列表事项

现在需要向列表中添加新的事项，也就是在提交后能把输入框的值存储并显示到列表中。我们需要再新建一个`onInputSubmit`的方法，参数同样是`event`，函数体内首先需要写  `event.preventDefault()`。

注意：写在form表单里的`<button>`或者`<input type=”submit” />`提交按钮上绑定的事件，或者form表单上绑定的事件，必须在事件函数里加上event.preventDefault()，阻止html的默认提交行为（阻止跳转，如果没有设置action属性，则是跳转回原页面，即重新刷新页面），否则会重新刷新页面（如果事件函数里进行了setState则无效，因为重新刷新了页面）。

可以将button写在form标签外，这样不写preventDefault也不会触发html的默认提交行为。React的form表单里面的button和input点击都会提交表单，如果没有绑定事件，则会执行form标签上绑定的事件。想要form标签上的事件也能不被表单默认html行为所影响，要加上`event.preventDefault()`。

然后用 `setState` 方法把新事项添加到列表数组中，但是，一定要注意我们的state应该是immutable的，这是react中必须遵循的一个准则，这样才能保证对比性与可靠性。

为了实现这个功能, 需要用到`this.setState` 回调函数，参数为`previousState`：

```javascript
this.setState((previousState)=>({
  list: previousState.list.push(previousState.newToDo)
}))
```

正如我上面的描述，最开始写state的时候很多人都会犯这样的错误，直接用push这样的方法，修改了state，这样就不算immutable的，我们一定要保证绝不直接修改原state。

这里又可以用到ES6中的新特性了，扩展操作符，它通过遍历旧数组返回一个新数组，使旧的数组保持原样，这样我们就把事项添加到列表数组末尾：

```javascript
this.setState((previousState)=>({
  list: [...previousState.list, previousState.newToDo ], // the spread opperator is called by using the ... preceding the array
}));
```

在提交添加新事项的同时，需要将`newToDo`重置为`''`：

```javascript
this.setState((previousState)=>({
  list: [...previousState.list, previousState.newToDo ],
  newToDo: ''
}));
```

## 9. 划掉事项

是时候添加划掉事项的功能了。为了实现这个功能需要添加一个新的属性用来标注是否需要划掉，因此需要改变原来的数组为一个对象数组，每一个事项都是一个对象，一个key为`item`表示原来的事项内容，一个key为`done`用布尔值来表示是否划掉。 然后先把原来的`onInputSubmit `方法修改，同样要注意immutable，使用扩展操作符如下：

```javascript
onInputSubmit = (event) => {
  event.preventDefault();
  this.setState((previousState)=>({
    list: [...previousState.list, {item: previousState.newToDo, done: false }], // notice the change here
    newToDo: ''
  }));
};
```

属性`done`添加完成后就需要新增一个方法当点击事项时候来改变这个值：

```javascript
onListItemClick = (i) => { // takes the index of the element to be updated
  this.setState((previousState)=>({
    list: [
      ...previousState.list.slice(0, i), // slice returns a new array without modifying the existing array. Takes everything up to, but not including, the index passed in.
      Object.assign({}, previousState.list[i], {done: !previousState.list[i].done}), // Object.assign is a new ES6 feature that creates a new object based on the first param (in this case an empty object). Other objects can be passed in and will be added to the first object without being modified.
      ...previousState.list.slice(i+1) // takes everything after the index passed in and adds it to the array.
    ]
  }))
};
```
然后把这个方法通过props传递给`List` 组件，这里就没有使用解构参数传递，用来和`Input`的做对比。因为这个函数需要一个参数就是当前列表的序列号，但是肯定不能直接call这个函数否则会报错，因此使用bind方法，传入`i`参数：

```javascript
onClick={props.onClick.bind(null, i)}  // 传入null，this都可以，都是去根组件拿到这个函数，this的话通过作用域链往上找，null指向根组件直接就可以拿到。
// onClick={props.onClick.bind(this, i)} 
```

当然还有另一种方法：

```javascript
onClick={() => props.onClick(i)}
```

然后在事项内容的`span`标签上添加 `onClick` 方法，改变当前事项的`done`值后，在通过判断此布尔值来进行样式的修改添加或者划掉删除线。

```javascript
<span
  style={
    el.done
    ? {textDecoration: 'line-through', fontSize: '20px'}
    : {textDecoration: 'none', fontSize: '20px'}
  }
  onClick={props.onClick.bind(null, i)}
>
```

## 10. 删除事项

最后我们在添加删除事项的功能，这个和划掉事项非常相似，我们只需要新增一个删除按钮，然后再新增一个方法修改列表，具体代码如下：

```javascript
<button
  className="btn btn-danger pull-right"
  >
  x
</button>
```

```javascript
deleteListItem = (i) => {
  this.setState((previousState)=>({ // using previous state again
    list: [
      ...previousState.list.slice(0, i), // again with the slice method
      ...previousState.list.slice(i+1) // the only diffence here is we're leaving out the clicked element
    ]
  }))
};
```

把`deleteListItem` 方法传递到列表组件中然后在删除按钮上绑定即可，仿照上一个自己写一下就好。

现在我们有一个完整功能的APP了，是不是感觉很cool，这个就是不用redux时候的形态了，但是你会发现当状态越来越复杂时候很繁琐，因此我们下面就要介绍redux来管理状态了。

# 迁移到redux的准备工作

截至目前我们已经学会如何用webpack和babel搭建react应用，构建类组件和函数型组件并处理state，添加功能。然而这只是基本满足一个小型应用的需求，随着app的增长，处理数据和行为会越来越吃力，这就是要引入redux的必要性。

那么redux如何处理数据？首先，redux给你的app一个单一的state对象，与flux等根据view来划分为多个state对象正好相反。你可能会有疑问，一个单一的对象来处理一个复杂的app岂不是非常复杂？redux采用的方法是把数据处理分为`reducer functions`、`action creators`和`actions`然后组合在一起工作流线型的处理数据。

## 1. 首先安装必须的依赖

首先安装 `redux` and `react-redux`

```
npm install --save redux
npm install --save react-redux
```

然后安装 redux middleware，这里就先安装 `redux-logger`，它的功能是帮助我们开发。

```
npm install --save redux-logger
```
还有一些常用的中间件，比如 `redux-thunk` and `redux-promise`, 但是在我们的这个项目中暂时先不需要，可以自行去github了解。

## 2. 构建
使用redux构建react应用一般都有一个标准的模板，可能不同模板形式上有区别，但是思想都是一样的，下面就先按照一种文件结构来构建。

首先我们在`src`中新建一个文件夹`redux`，然后在其中新建一个文件`configureStore.js`，添加以下代码：

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
```

`createStore` 是由redux提供的用来初始化store的函数， `applyMiddleware`是用来添加我们需要的中间件的。

`combineReducers` 用来把多个`reducers`合并为一个单一实体。

`createLogger` 就是我们这里唯一使用的一个中间件，可以`console`出每一个`action`后数据的详细处理过程，给调试带来了很大方便。

然后添加下面代码：

```javascript
const loggerMiddleware = createLogger(); // initialize logger

// const createStoreWithMiddleware = applyMiddleware( loggerMiddleware)(createStore); // apply logger to redux  // 柯里化函数的写法

// 一般写法：
export default store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)
```

这里暂时没有完成，需要后面的模块写完了再导入到这里继续来完成。

## 3. 模块Modules

在 `src/redux/` 新建一个文件夹 `modules`。在这个文件夹中我们将存放所有的`reducers`，`action creators`和`constants`。这里我们使用的redux组织结构叫做`ducks`，思想就是把相关的`reducers`，`action creators`和`constants`都放在一个单独的文件中，而不是分开放在多个文件中，这样修改一个功能时候直接在一个文件中修改就可以。 

在 `modules` 文件中新建 'toDoApp.js'，注意这里的命名是依据容器组件的名字来命名，这个也是规范，容易管理代码。

现在我们可以开始创建`initial state `和 `reducer function`，这其实非常简单，`state`就是一个js对象，`reducer`就是js的switch语句：
```javascript
const initialState = {}; //The initial state of this reducer (will be combined with the states of other reducers as your app grows)

export default function reducer(state = initialState, action){ // a function that has two parameters, state (which is initialized as our initialState obj), and action, which we'll cover soon.
  switch (action.type){
  default:
    return state;
  }
}
```

## 4. 完善Store

现在我们已经完成了第一个`reducer`，可以将其添加到 `configureStore.js` 中去了， 导入： `import toDoApp from './modules/toDoApp';`

然后用`combineReducers ` 来组合当前的`reducer`，因为未来会有更多的模块加入。

```javascript
const reducer = combineReducers({
  toDoApp
});
```

最后在底部加入下面完整的代码：

```javascript
//const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
//export default configureStore;

// 正常一般写法：
export default store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)
```

Cool. We're done here.

## 5. Connect

现在我们已经有了一个`reducer`，那么怎么和app建立联系呢？这需要两步工作。

前面已经讲过类组件和函数型组件，有时候也可以称为`smart components`和` dumb components`，这里我们新增一种容器组件，顾名思义，这种组件就是作为一个容器用来给组件提供`actions`和`state`。

下面来创建第一个容器组件，首先在 `/src/` 下新增一个文件夹`containers`，然后再其下面新建一个文件 `toDoAppContainer.js`。
在文件顶部首先导入 `connect` 用来将容器和组件联系在一起，

```javascript
import { connect } from 'react-redux';
import ToDoApp from '../../components/ToDoApp.js'
```

`connect` 这个函数被调用两次, 第一次是两个回调函数: `mapStateToProps` and `mapDispatchToProps`。 第二次是把`state`和`dispatch`传入组件的时候。这里的`dispatch`又是什么呢？

当我们需要在redux中发生某些行为时候，就需要调用`dispatch`函数传递一个`action`然后调用`reducer`这一套流程。因为我们还没有编写具体的行为，这里就暂时空白，后面再补，代码形式如下：

```javascript
function mapStateToProps(state) {
  return {
    toDoApp: state.toDoApp // keys就是传给对应容器组件的变量名
  }
}

function mapDispatchToProps(dispatch) {
  return {}; // return一个对象，对象里的键值对就是对应容器组件所使用的函数
}
```

然后在底部添加：

```javascript
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);
```

6. Provider

redux的基本工作已经完成，最后一步就是返回到`app.js` 文件， 首先我们不再需要导入 `ToDoApp` 组件，而是用容器组件`ToDoAppContainer`来替代，然后需要导入 `configureStore` 函数和 `Provider`，在头部添加代码：

```javascript
import { Provider } from 'react-redux';
import ToDoAppContainer from './redux/containers/ToDoAppContainer';
import store from './redux/configureStore';
```

然后return的jsx中同样需要把`ToDoApp` 改为 `ToDoAppContainer`，然后需要用`Provider` 组件将其包裹，它的作用就是将整个app的state传递给它所包裹的容器，从而使容器组件可以获取这些state。

```javascript
<Provider store={store}> // we pass the store through to Provider with props
  <ToDoAppContainer />
</Provider>
```

现在整个redux的基本结构已经搭建起来，下一步就可以把整个行为逻辑代码补充进去就可以了。











