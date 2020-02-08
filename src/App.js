import React, { Component, Fragment} from 'react';
import TaskItem from './components/taskItem';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: 'to do list',
      tasksList: [],
      enterMsg: false,
      test: false
    }
  }

  UNSAFE_componentWillReceiveProps

  UNSAFE_componentWillMount() {
    console.log(`这是组件的willMount.....`)
  }

  componentDidMount() {
    console.log(`这是组件的didMount.....`)
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate---组件发生改变前执行')
    return true
  }

  componentWillUnmount(){
    console.log('child - componentWillUnmount')
  }

  componentDidUpdate(){
    console.log('componentDidUpdate----组件更新之后执行')
  }

  render() { 
    console.log(`render.....`)
    let enterMsg;
    if(this.state.enterMsg) {
      enterMsg = <TaskItem confirm={this.callback.bind(this)} cancel={this.receiveCancel.bind(this)} />
    } else {
      enterMsg = <p/>
    }
    return ( 
      <Fragment>
        <ul>
          {
            this.state.tasksList.map((item, index) => {
              return <li key={index}>{`第${index +1}个任务：${item}`} 
                <span>
                  <button onClick={this.completeTask.bind(this, index)}>完成了</button>
                </span>
              </li>
            }) 
          }
        </ul>
        <button onClick={this.addTask.bind(this)}>新建任务</button>
        { this.state.test && 
          <h1>这是测试条件渲染的！</h1> 
        }
        <button onClick={this.testYU.bind(this)}>点我测试与的条件渲染</button>
        <div className="taskDetail">
          {enterMsg}
        </div>
      </Fragment>
    );
  }

  addTask() {
    this.setState({
      enterMsg: true
    })
  }

  receiveCancel(flag) {
    if (!flag) {
      this.setState({
        enterMsg: false
      })
    }
  }

  callback(msg) {
    const tempList = [...this.state.tasksList, msg]
    this.setState({
      tasksList: tempList
    })
  }

  completeTask(index) {
    const tempList = this.state.tasksList;
    tempList.splice(index,1);
    this.setState({
      tasksList: tempList
    })
  }
  
  testYU() {
    this.setState({
      test: !this.state.test
    })
  }
}
 
export default App;

