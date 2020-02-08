import React, { Component, Fragment} from 'react';
import TaskItem from './components/taskItem';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: 'to do list',
      tasksList: [],
      enterMsg: false
    }
  }

  componentWillMount() {
    console.log(`这是组件的willMount.....`)
  }

  componentDidMount() {
    console.log(`这是组件的didMount.....`)
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate---组件发生改变前执行')
    return true
  }

  //shouldComponentUpdate返回true才会被执行。
  componentWillUpdate(){
    console.log('componentWillUpdate---组件更新前，shouldComponentUpdate函数之后执行')
  }

  render() { 
    console.log(`render.....`)
    return ( 
        <TaskItem confirm={this.callback.bind(this)} cancel={this.receiveCancel.bind(this)} />
    );
  }

}
 
export default App;

