import React, { Component, Fragment } from 'react';
import './taskItem.css';

class TaskItem extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			task: ''
		}
	}

	componentWillReceiveProps(){
		console.log('child - componentWillReceiveProps')
	}

	render() { 
		return (
			<Fragment>
				<input placeholder="输入任务内容" value={this.state.task} onChange={this.handleChange.bind(this)}/>
				<div>
					<button onClick={this.genTask.bind(this)}>确认</button>
					<button onClick={this.clearTask.bind(this)}>取消</button>
				</div>
			</Fragment>
		);
	}

	genTask() {
		this.props.confirm(this.state.task)
	}

	clearTask() {
		this.setState({
			task: ""
		})
		this.props.cancel(false)
	}

	handleChange(e) {
		this.setState({
			task: e.target.value
		})
	}
}
 
export default TaskItem;